import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import type { Scope } from './types';

export class UsageError extends Error {}

function git(args: string[], env: NodeJS.ProcessEnv = process.env): string {
  return execFileSync('git', args, {
    encoding: 'utf8',
    env,
    stdio: ['ignore', 'pipe', 'pipe'],
    maxBuffer: 64 * 1024 * 1024,
  });
}

export const root = git(['rev-parse', '--show-toplevel']).trim();

/**
 * Hash of the working tree: tracked and untracked non-ignored files, staged through a
 * temporary index so the real one is never touched. Any edit changes the hash.
 */
export function treeHash(): string {
  const dir = mkdtempSync(join(tmpdir(), 'verify-'));
  const env = { ...process.env, GIT_INDEX_FILE: join(dir, 'index') };
  try {
    git(['read-tree', 'HEAD'], env);
    git(['add', '-A'], env);
    return git(['write-tree'], env).trim();
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

/** Diff vs the merge-base with `base`, plus uncommitted and untracked files. */
export function resolveScope(base: string): Scope {
  let mergeBase: string;
  try {
    mergeBase = git(['merge-base', 'HEAD', base]).trim();
  } catch {
    throw new UsageError(`base ref "${base}" not found; pass --base <ref>`);
  }

  const files = new Set<string>();
  const deleted: string[] = [];
  const entries = git(['diff', '--name-status', '--no-renames', '-z', mergeBase]).split('\0');
  for (let i = 0; i + 1 < entries.length; i += 2) {
    if (entries[i] === 'D') deleted.push(entries[i + 1]);
    else files.add(entries[i + 1]);
  }
  for (const file of git(['ls-files', '--others', '--exclude-standard', '-z']).split('\0')) {
    if (file) files.add(file);
  }

  return { files: Array.from(files).sort(), deleted: deleted.sort() };
}
