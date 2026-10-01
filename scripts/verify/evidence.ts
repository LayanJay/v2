import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { VERIFY_DIR } from './exec';
import { treeHash } from './git';
import type { Evidence } from './types';

export const EVIDENCE_PATH = join(VERIFY_DIR, 'last.json');

export function writeEvidence(evidence: Evidence) {
  mkdirSync(VERIFY_DIR, { recursive: true });
  writeFileSync(EVIDENCE_PATH, `${JSON.stringify(evidence, null, 2)}\n`);
}

/** Why the evidence cannot back a commit, or null when it can. Runs no checks. */
export function checkEvidence(): 'missing' | 'partial' | 'failing' | 'stale' | null {
  if (!existsSync(EVIDENCE_PATH)) return 'missing';

  let evidence: Evidence;
  try {
    evidence = JSON.parse(readFileSync(EVIDENCE_PATH, 'utf8'));
  } catch {
    return 'missing';
  }

  if (evidence.partial) return 'partial';
  if (!evidence.ok) return 'failing';
  if (evidence.tree !== treeHash()) return 'stale';
  return null;
}
