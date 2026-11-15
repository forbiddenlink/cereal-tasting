import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';

// Test the actual page formatter without starting the app, analytics, or canvas export.
const source = readFileSync(new URL('./Certificate.tsx', import.meta.url), 'utf8');
const parsed = ts.createSourceFile('Certificate.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const formatter = parsed.statements.find(
  (node): node is ts.FunctionDeclaration => ts.isFunctionDeclaration(node) && node.name?.text === 'formatDate',
);
if (!formatter) throw new Error('Certificate date formatter not found');
const code = ts.transpileModule(formatter.getText(parsed), {
  compilerOptions: { target: ts.ScriptTarget.ES2022 },
}).outputText;

const cases: [number, number, number, string][] = [
  [2026, 10, 15, 'November the 15th, Two Thousand and Twenty-Six'],
  [1999, 2, 23, 'March the 23rd, One Thousand Nine Hundred and Ninety-Nine'],
  [2000, 0, 1, 'January the 1st, Two Thousand'],
  [2001, 0, 2, 'January the 2nd, Two Thousand and One'],
  [2011, 0, 11, 'January the 11th, Two Thousand and Eleven'],
  [2012, 0, 12, 'January the 12th, Two Thousand and Twelve'],
  [2013, 0, 13, 'January the 13th, Two Thousand and Thirteen'],
  [2031, 0, 21, 'January the 21st, Two Thousand and Thirty-One'],
  [2100, 11, 31, 'December the 31st, Two Thousand One Hundred'],
  [2101, 1, 22, 'February the 22nd, Two Thousand One Hundred and One'],
];

describe('certificate date wording', () => {
  it.each(cases)('formats year %i month %i day %i accurately', (year, month, day, expected) => {
    class Clock extends Date {
      constructor() { super(year, month, day, 12); }
    }
    expect(vm.runInNewContext(`${code}\nformatDate()`, { Date: Clock })).toBe(expected);
  });
});
