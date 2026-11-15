import { describe, expect, it } from 'vitest';
// @ts-expect-error plain .mjs build script, no type declarations
import { resolveBuildDate, stampSitemapLastmod } from '../scripts/build-date.mjs';

const noGit = () => {
  throw new Error('not a git repo');
};

describe('resolveBuildDate', () => {
  it('uses the latest git commit date, in UTC', () => {
    expect(resolveBuildDate({ env: {}, gitCommitDate: () => '2026-11-15T23:30:00-05:00\n' })).toBe('2026-11-16');
  });

  it('prefers SOURCE_DATE_EPOCH when set', () => {
    // 1893456000 = 2030-01-01T00:00:00Z
    expect(resolveBuildDate({ env: { SOURCE_DATE_EPOCH: '1893456000' }, gitCommitDate: () => '2026-01-01T00:00:00Z' })).toBe('2030-01-01');
  });

  it('falls back to the build clock when git is unavailable', () => {
    expect(resolveBuildDate({ env: {}, gitCommitDate: noGit, now: () => new Date('2031-03-04T10:00:00Z') })).toBe('2031-03-04');
  });

  it('is not the old frozen date', () => {
    expect(resolveBuildDate({ env: {}, gitCommitDate: noGit, now: () => new Date('2027-01-02T00:00:00Z') })).not.toBe('2026-07-28');
  });
});

describe('stampSitemapLastmod', () => {
  it('rewrites every lastmod and leaves the rest alone', () => {
    const xml = '<url><loc>https://x/</loc><lastmod>2026-07-28</lastmod></url><url><loc>https://x/a/</loc><lastmod>2026-07-28</lastmod></url>';
    const out = stampSitemapLastmod(xml, '2027-02-03');
    expect(out.match(/<lastmod>2027-02-03<\/lastmod>/g)).toHaveLength(2);
    expect(out).not.toContain('2026-07-28');
    expect(out).toContain('<loc>https://x/a/</loc>');
  });
});
