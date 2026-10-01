import { EVIDENCE_PATH } from './evidence';
import type { CheckResult, Evidence } from './types';

const MAX_FAILURES = 5;
const MAX_WARNINGS = 3;
const SYMBOL = { pass: '✓', fail: '✗', skip: '-', blocked: '?' } as const;

const out = (line: string) => process.stdout.write(`${line}\n`);

export function printHeader(scope: string, tree: string) {
  out(`verify  scope: ${scope}  tree: ${tree.slice(0, 7)}`);
}

export function printCheck(check: CheckResult) {
  const name = check.name.padEnd(12);

  if (check.status === 'skip') {
    out(`- ${name} skipped (${check.message})`);
    return;
  }
  if (check.status === 'blocked') {
    out(`? ${name} blocked  ${check.message}`);
    return;
  }

  out(`${SYMBOL[check.status]} ${name} ${(check.ms / 1000).toFixed(1)}s`);
  for (const { title, at, message } of check.failures.slice(0, MAX_FAILURES)) {
    out(`    ✗ ${title}  ${at}`);
    out(`      ${message}`);
  }
  if (check.failures.length > MAX_FAILURES) {
    out(`    … ${check.failures.length - MAX_FAILURES} more (log: ${check.log})`);
  } else if (check.failures.length) {
    out(`    log: ${check.log}`);
  }
  for (const { title, at } of (check.warnings ?? []).slice(0, MAX_WARNINGS)) {
    out(`    ! ${title}  ${at}`);
  }
}

export function printSummary(evidence: Evidence, treeChanged: boolean) {
  if (treeChanged) out('! tree         files changed during the run → rerun verify');

  const ran = evidence.checks.filter((check) => check.status !== 'skip');
  const failed = ran.filter((check) => check.status !== 'pass').length;
  const plural = (count: number) => `${count} check${count === 1 ? '' : 's'}`;
  const count = failed ? `${plural(failed)} failed` : `${plural(ran.length)} passed`;
  const partial = evidence.partial ? ' · partial' : '';
  out(`${evidence.ok ? 'PASS' : 'FAIL'}  ${count}${partial} · evidence: ${EVIDENCE_PATH}`);
}
