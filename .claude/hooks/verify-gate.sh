#!/usr/bin/env bash
# PreToolUse gate on Bash: an agent's `git commit` needs fresh, passing verify evidence.
# Runs no checks; it only compares the evidence against the current working tree.

command=$(node -e '
  let input = "";
  process.stdin.on("data", (chunk) => (input += chunk));
  process.stdin.on("end", () => {
    try {
      process.stdout.write(JSON.parse(input).tool_input?.command ?? "");
    } catch {}
  });
')

commit='(^|[^[:alnum:]_-])git[[:space:]]+((-[Cc]|--git-dir|--work-tree)[[:space:]]+[^[:space:]]+[[:space:]]+|-[^[:space:]]+[[:space:]]+)*commit([^[:alnum:]_-]|$)'
[[ $command =~ $commit ]] || exit 0

cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0
reason=$(node_modules/.bin/tsx scripts/verify/cli.ts --check-evidence 2>&1) && exit 0

echo "${reason:-verify evidence missing — run yarn verify}" | head -1 >&2
exit 2
