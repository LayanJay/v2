import { build } from './adapters/build';
import { eslint } from './adapters/eslint';
import { prettier } from './adapters/prettier';
import { typecheck } from './adapters/typecheck';
import { checkEvidence, writeEvidence } from './evidence';
import { Blocked, logPath } from './exec';
import { resolveScope, root, treeHash, UsageError } from './git';
import { printCheck, printHeader, printSummary } from './print';
import type { Adapter, CheckResult, Evidence, Scope } from './types';

const ADAPTERS: Adapter[] = [eslint, typecheck, prettier, build];

type Args = {
  full: boolean;
  checkEvidence: boolean;
  base: string;
  only: string[] | null;
  targets: string[];
};

function parseArgs(argv: string[]): Args {
  const args: Args = { full: false, checkEvidence: false, base: 'main', only: null, targets: [] };
  const value = (flag: string, next: string | undefined) => {
    if (!next || next.startsWith('--')) throw new UsageError(`${flag} needs a value`);
    return next;
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--full') args.full = true;
    else if (arg === '--check-evidence') args.checkEvidence = true;
    else if (arg === '--base') args.base = value(arg, argv[++i]);
    else if (arg === '--only') args.only = value(arg, argv[++i]).split(',');
    else if (arg.startsWith('--')) throw new UsageError(`unknown flag ${arg}`);
    else args.targets.push(arg);
  }

  const names = ADAPTERS.map((adapter) => adapter.name);
  const unknown = args.only?.find((name) => !names.includes(name));
  if (unknown) throw new UsageError(`unknown check "${unknown}"; checks: ${names.join(', ')}`);
  if (args.targets.length && !args.only) throw new UsageError('targets need --only <check>');

  return args;
}

/** The targets a check runs on (empty means every target), or the reason it is skipped. */
function plan(adapter: Adapter, args: Args, scope: Scope): string[] | { skip: string } {
  if (args.only && args.targets.length && !adapter.wholeProject) {
    return adapter.targets({ files: args.targets, deleted: [] }) ?? { skip: 'no matching targets' };
  }
  if (args.full || (args.only && adapter.wholeProject)) return [];
  if (adapter.fullOnly) return { skip: 'full only' };
  return adapter.targets(scope) ?? { skip: 'scope' };
}

function execute(adapter: Adapter, targets: string[]): CheckResult {
  const started = Date.now();
  const base = { name: adapter.name, targets, log: logPath(adapter.name) };
  try {
    return { ...base, ...adapter.run(targets), ms: Date.now() - started };
  } catch (error) {
    if (!(error instanceof Blocked)) throw error;
    return {
      ...base,
      status: 'blocked',
      failures: [],
      message: error.message,
      ms: Date.now() - started,
    };
  }
}

function main(): number {
  const args = parseArgs(process.argv.slice(2));
  process.chdir(root);

  if (args.checkEvidence) {
    const problem = checkEvidence();
    if (problem) process.stderr.write(`verify evidence ${problem} — run yarn verify\n`);
    return problem ? 1 : 0;
  }

  const startedAt = new Date().toISOString();
  const tree = treeHash();
  const scope = resolveScope(args.base);
  const changed = [...scope.files, ...scope.deleted].sort();

  const selected = ADAPTERS.filter((adapter) => !args.only || args.only.includes(adapter.name));
  const diffLabel = `diff vs ${args.base} (${changed.length} file${changed.length === 1 ? '' : 's'})`;
  printHeader(
    (args.only ? `only ${args.only.join(',')} · ` : '') + (args.full ? 'full' : diffLabel),
    tree,
  );

  const checks = selected.map((adapter) => {
    const planned = plan(adapter, args, scope);
    const check: CheckResult = Array.isArray(planned)
      ? execute(adapter, planned)
      : {
          name: adapter.name,
          status: 'skip',
          ms: 0,
          targets: [],
          failures: [],
          message: planned.skip,
        };
    printCheck(check);
    return check;
  });

  const treeChanged = treeHash() !== tree;
  const evidence: Evidence = {
    version: 1,
    tree,
    base: args.base,
    mode: args.full ? 'full' : 'diff',
    partial: args.only !== null,
    startedAt,
    scope: changed,
    checks,
    flaky: [],
    guards: [],
    unmapped: [],
    artifacts: [],
    ok: !treeChanged && checks.every((check) => check.status === 'pass' || check.status === 'skip'),
  };
  writeEvidence(evidence);
  printSummary(evidence, treeChanged);

  return evidence.ok ? 0 : 1;
}

try {
  process.exitCode = main();
} catch (error) {
  if (!(error instanceof UsageError)) throw error;
  process.stderr.write(`verify: ${error.message}\n`);
  process.exitCode = 2;
}
