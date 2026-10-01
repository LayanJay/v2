import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export const VERIFY_DIR = '.verify';
export const LOG_DIR = join(VERIFY_DIR, 'logs');

/** The scope needed a check and the environment could not run it. */
export class Blocked extends Error {}

export const logPath = (check: string) => join(LOG_DIR, `${check}.log`);

/** Runs a local binary with its raw output sent to the check's log, never the terminal. */
export function tool(check: string, bin: string, args: string[], env: Record<string, string> = {}) {
  const result = spawnSync(join('node_modules', '.bin', bin), args, {
    encoding: 'utf8',
    env: { ...process.env, NO_COLOR: '1', FORCE_COLOR: '0', ...env },
    maxBuffer: 64 * 1024 * 1024,
  });
  if (result.error) throw new Blocked(`cannot run ${bin}: run yarn install`);

  mkdirSync(LOG_DIR, { recursive: true });
  writeFileSync(logPath(check), `$ ${bin} ${args.join(' ')}\n${result.stdout}${result.stderr}`);
  return { code: result.status ?? 1, stdout: result.stdout, stderr: result.stderr };
}
