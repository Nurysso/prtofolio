// Runs at build time (frontmatter) and in the browser (live refresh), so keep it dependency-free.
const CLONES_URL = 'https://raw.githubusercontent.com/Nurysso/github-stats/master/data/clones_summary.json';

export async function getTotalDownloads() {
  try {
    const res = await fetch(CLONES_URL, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const data = await res.json();
    const total = data?.cumulative_stats?.total_clones;
    return typeof total === 'number' ? total : null;
  } catch {
    return null;
  }
}
