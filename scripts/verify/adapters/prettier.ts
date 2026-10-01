import { tool } from '../exec';
import type { Adapter, Failure } from '../types';

const FORMATTED = /\.(ts|tsx|js|jsx|mjs|css)$/;
const ERROR = /^\[error\] (.+?): (.+)$/;

export const prettier: Adapter = {
  name: 'prettier',
  wholeProject: false,

  targets(scope) {
    const files = scope.files.filter((file) => FORMATTED.test(file));
    return files.length ? files : null;
  },

  run(targets) {
    const patterns = targets.length ? targets : ['**/*.{ts,tsx,js,jsx,mjs,css}'];
    const { code, stdout, stderr } = tool('prettier', 'prettier', [
      '--list-different',
      '--no-error-on-unmatched-pattern',
      ...patterns,
    ]);

    const failures: Failure[] = [];
    for (const file of stdout.split('\n').filter(Boolean)) {
      failures.push({ at: file, title: 'unformatted', message: `yarn prettier --write ${file}` });
    }
    for (const line of stderr.split('\n')) {
      const match = ERROR.exec(line);
      if (match) failures.push({ at: match[1], title: 'syntax error', message: match[2] });
    }
    if (code !== 0 && !failures.length) {
      const message = stderr.trim().split('\n')[0] || `prettier exited ${code}`;
      failures.push({ at: '.prettierrc', title: 'prettier', message });
    }

    return { status: failures.length ? 'fail' : 'pass', failures };
  },
};
