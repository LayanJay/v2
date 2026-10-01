import { tool } from '../exec';
import type { Adapter, Failure } from '../types';

const TRIGGERS = /(\.tsx?$|^src\/.*\.json$|^tsconfig\.json$|^package\.json$|^yarn\.lock$)/;
const ERROR = /^(.+)\((\d+),(\d+)\): error (TS\d+): (.+)$/;

export const typecheck: Adapter = {
  name: 'typecheck',
  wholeProject: true,

  // tsc cannot scope to files under a tsconfig, so any trigger runs the whole project.
  targets(scope) {
    return [...scope.files, ...scope.deleted].some((file) => TRIGGERS.test(file)) ? [] : null;
  },

  run() {
    const { code, stdout } = tool('typecheck', 'tsc', ['--noEmit', '--pretty', 'false']);

    const failures: Failure[] = [];
    for (const line of stdout.split('\n')) {
      const match = ERROR.exec(line);
      if (match)
        failures.push({ at: `${match[1]}:${match[2]}`, title: match[4], message: match[5] });
    }
    if (code !== 0 && !failures.length) {
      const message = stdout.trim().split('\n')[0] || `tsc exited ${code}`;
      failures.push({ at: 'tsconfig.json', title: 'tsc', message });
    }

    return { status: failures.length ? 'fail' : 'pass', failures };
  },
};
