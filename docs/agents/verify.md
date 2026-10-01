# Verification

Agent-facing verify CLI, contract per the `build-verify-cli` skill. Skills (`implement`, `sdd`, `code-review`) read this file.

- **Command**: `yarn verify`: scoped to the diff vs `main`. Run before every commit; the commit gate rejects missing, stale, or failing evidence.
- **Inner loop**: `yarn verify --only <check> [file…]`: fast reruns while working. Partial evidence; does not satisfy the gate.
- **Full**: `yarn verify --full`: adds `next build`. Run it for refactors, dependency or config changes, and anything touching `src/app/`.
- **Evidence**: `.verify/last.json`. `Prove:` lines cite its summary line and path.
- **Gate**: `.claude/hooks/verify-gate.sh` on `git commit`.
- **Feature map**: none. The repo has no integration, e2e, or smoke checks to route to; add the map with the first one.
- **Checks**: eslint, typecheck, prettier, build (full only)

The build writes to `.verify/next`, so it is safe to run while `next dev` is serving from `.next`.
