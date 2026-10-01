## Agent skills

### Issue tracker

Issues and specs are local markdown files under `.scratch/<feature-slug>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles under their default names, recorded as a `Status:` line in each issue file. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

### Models

Pinned for `qa.explore`, `qa.browser`, `sdd.implementor`, `sdd.fixer.trivial`, and `sdd.fixer.non-trivial`. See `docs/agents/models.md`.

### Version control

Plain git, branches named `<type>/<feature-slug>`. See `docs/agents/vcs.md`.

### Verification

Run `yarn verify` before every commit; the commit gate rejects missing, stale, or failing evidence. See `docs/agents/verify.md`.
