import { execFileSync } from 'node:child_process';

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Date (YYYY-MM-DD, UTC) used for sitemap lastmod and structured data.
 * Order: SOURCE_DATE_EPOCH (reproducible builds), the latest git commit date,
 * then the build-time clock. Never a hard-coded date.
 */
export function resolveBuildDate({
  env = process.env,
  gitCommitDate = () => execFileSync('git', ['log', '-1', '--format=%cI'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }),
  now = () => new Date(),
} = {}) {
  const epoch = Number(env.SOURCE_DATE_EPOCH);
  if (env.SOURCE_DATE_EPOCH && Number.isFinite(epoch)) {
    return new Date(epoch * 1000).toISOString().slice(0, 10);
  }
  try {
    const parsed = new Date(gitCommitDate().trim());
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10);
  } catch {
    // No git history available (for example a source tarball build): fall through.
  }
  const day = now().toISOString().slice(0, 10);
  if (!ISO_DAY.test(day)) throw new Error('Could not determine a build date');
  return day;
}

/** Replace every <lastmod> in sitemap XML with the given YYYY-MM-DD date. */
export function stampSitemapLastmod(xml, date) {
  return xml.replace(/<lastmod>[^<]*<\/lastmod>/g, `<lastmod>${date}</lastmod>`);
}
