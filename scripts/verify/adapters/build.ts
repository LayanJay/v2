import { rmSync } from 'node:fs';
import { join } from 'node:path';

import { Blocked, tool, VERIFY_DIR } from '../exec';
import type { Adapter, Failure } from '../types';

// Kept apart from `.next` so a verify build never disturbs a running `next dev`.
const DIST_DIR = join(VERIFY_DIR, 'next');

const OFFLINE = /Failed to fetch .* from Google Fonts|ENOTFOUND|EAI_AGAIN/;
const LOCATION = /^\.\/(\S+?)(?::(\d+):\d+)?$/;

export const build: Adapter = {
  name: 'build',
  wholeProject: true,
  fullOnly: true,

  targets() {
    return [];
  },

  run() {
    const { code, stdout, stderr } = tool('build', 'next', ['build', '--no-lint'], {
      NEXT_DIST_DIR: DIST_DIR,
      NEXT_TELEMETRY_DISABLED: '1',
    });
    // tsconfig includes these generated route types; left behind they go stale and
    // fail the next typecheck once a route moves.
    rmSync(join(DIST_DIR, 'types'), { recursive: true, force: true });

    if (code === 0) return { status: 'pass', failures: [] };

    const output = `${stdout}\n${stderr}`;
    if (OFFLINE.test(output)) {
      throw new Blocked('network needed to fetch the Inter font from Google Fonts');
    }

    const lines = output.split('\n');
    const failures: Failure[] = [];
    lines.forEach((line, i) => {
      const match = LOCATION.exec(line.trim());
      if (!match) return;
      const message = lines.slice(i + 1).find((next) => next.trim()) ?? '';
      failures.push({
        at: match[2] ? `${match[1]}:${match[2]}` : match[1],
        title: 'build error',
        message: message.trim(),
      });
    });
    if (!failures.length) {
      const message = lines.find((line) => /error/i.test(line)) ?? `next build exited ${code}`;
      failures.push({ at: 'next.config.mjs', title: 'build error', message: message.trim() });
    }

    return { status: 'fail', failures };
  },
};
