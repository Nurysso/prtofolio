import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(
      'https://raw.githubusercontent.com/Nurysso/github-stats/master/data/clones_summary.json',
      {
        // Add caching so you aren't hitting GitHub every single time
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) throw new Error('Failed to fetch');

    const data = await res.json();
    return NextResponse.json({ total: data?.cumulative_stats?.total_clones ?? 0 });
  } catch (error) {
    return NextResponse.json({ total: 0 }, { status: 500 });
  }
}
