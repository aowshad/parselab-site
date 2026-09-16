#!/usr/bin/env node
/**
 * Lists everything in /content that still needs you.
 *
 *   BLANK  — a hard gap. Renders a dashed marker on the site. Nothing was
 *            invented here: customer names, quotes, addresses, real dates.
 *   DRAFT  — copy written in ParseLab's voice for you to edit. It renders
 *            normally, so the site looks finished, but it is not yours yet.
 *
 * Run: npm run content:audit
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'content';
const files = readdirSync(DIR).filter((f) => f.endsWith('.ts')).sort();

let blanks = 0;
let drafts = 0;
const rows = [];

for (const file of files) {
  const lines = readFileSync(join(DIR, file), 'utf8').split('\n');
  lines.forEach((line, i) => {
    const t = line.trim();
    if (t.startsWith('*') || t.startsWith('//') || t.startsWith('/*')) return; // comments explain the system, they aren't gaps
    const bracket = line.match(/\[(ADD [^\]]+|[A-Z][a-z]+ YYYY|YEAR|Date|Role|Name|Company|Team|City[^\]]*|number|—)\]/);
    const isBlank = /needsContent:\s*true/.test(line) || bracket;
    const isDraft = /draft:\s*true/.test(line);
    if (isBlank) {
      blanks++;
      rows.push(['BLANK', `${file}:${i + 1}`, bracket ? bracket[0] : line.trim().slice(0, 48)]);
    } else if (isDraft) {
      drafts++;
      rows.push(['DRAFT', `${file}:${i + 1}`, 'edit the copy above this line']);
    }
  });
}

const pad = (s, n) => String(s).padEnd(n);
console.log('');
for (const [kind, where, what] of rows) {
  const tag = kind === 'BLANK' ? '\x1b[31mBLANK\x1b[0m' : '\x1b[33mDRAFT\x1b[0m';
  console.log(`  ${tag}  ${pad(where, 30)} ${what}`);
}
console.log('');
console.log(`  ${blanks} blanks · ${drafts} drafts · across ${files.length} content files`);
console.log('  Ship target: 0 blanks. Drafts are optional but they are not your words yet.\n');
