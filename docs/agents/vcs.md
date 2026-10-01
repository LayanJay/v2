# Version control

## Branch name

`<type>/<ticket-id>`, lowercase.

- `<type>`: `feat`, `fix`, `refactor`, `chore`, or `docs`.
- `<ticket-id>`: the spec's feature slug, the directory name in `.scratch/<feature-slug>/`. Work without a spec uses a short kebab summary in its place.

## Create a branch

```bash
git checkout -b <name>
```

## Related branch

A branch is related to a spec when its name carries that spec's `<ticket-id>`. `/sdd` stays on a related branch instead of cutting a new one.
