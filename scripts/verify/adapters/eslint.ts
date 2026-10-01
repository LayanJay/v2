import { relative } from 'node:path';

import { tool } from '../exec';
import type { Adapter, Failure } from '../types';

const LINTABLE = /\.(ts|tsx|js|jsx|mjs)$/;

type Message = {
  ruleId: string | null;
  severity: 1 | 2;
  message: string;
  line?: number;
  fatal?: boolean;
};
type FileResult = { filePath: string; messages: Message[] };

export const eslint: Adapter = {
  name: 'eslint',
  wholeProject: false,

  targets(scope) {
    const files = scope.files.filter((file) => LINTABLE.test(file));
    return files.length ? files : null;
  },

  run(targets) {
    const args = targets.length
      ? ['-f', 'json', '--no-error-on-unmatched-pattern', ...targets]
      : ['-f', 'json', '--ext', '.ts,.tsx,.js,.jsx,.mjs', '.'];
    const { stdout, stderr } = tool('eslint', 'eslint', args);

    let results: FileResult[];
    try {
      results = JSON.parse(stdout);
    } catch {
      const message = stderr.trim().split('\n')[0] || 'no JSON output';
      return {
        status: 'fail',
        failures: [{ at: '.eslintrc.json', title: 'eslint crashed', message }],
      };
    }

    const failures: Failure[] = [];
    const warnings: Failure[] = [];
    for (const { filePath, messages } of results) {
      const file = relative(process.cwd(), filePath);
      for (const { ruleId, severity, message, line, fatal } of messages) {
        // An ignored file passed explicitly reports itself as a rule-less warning.
        if (severity === 1 && ruleId === null) continue;
        (severity === 2 ? failures : warnings).push({
          at: line ? `${file}:${line}` : file,
          title: ruleId ?? (fatal ? 'parse error' : 'eslint'),
          message: message.split('\n')[0],
        });
      }
    }

    return { status: failures.length ? 'fail' : 'pass', failures, warnings };
  },
};
