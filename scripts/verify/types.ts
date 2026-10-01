/* eslint-disable no-unused-vars -- the base rule misreads parameter names in type signatures */

export type Failure = { at: string; title: string; message: string };

export type Status = 'pass' | 'fail' | 'skip' | 'blocked';

export type Outcome = {
  status: Status;
  failures: Failure[];
  warnings?: Failure[];
  /** Why the check was skipped or blocked. */
  message?: string;
};

export type CheckResult = Outcome & {
  name: string;
  ms: number;
  targets: string[];
  log?: string;
};

export type Scope = {
  /** Changed files that still exist: modified, added, and untracked. */
  files: string[];
  deleted: string[];
};

export type Adapter = {
  name: string;
  /** The tool cannot scope to files, so explicit targets are ignored. */
  wholeProject: boolean;
  fullOnly?: boolean;
  /** Targets the scope needs this check for, or null when it needs none. */
  targets(scope: Scope): string[] | null;
  /** Empty targets means every target. */
  run(targets: string[]): Outcome;
};

export type Evidence = {
  version: 1;
  tree: string;
  base: string;
  mode: 'diff' | 'full';
  partial: boolean;
  startedAt: string;
  scope: string[];
  checks: CheckResult[];
  flaky: Failure[];
  guards: { kind: string; at: string }[];
  unmapped: string[];
  artifacts: string[];
  ok: boolean;
};
