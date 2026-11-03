// A small "star map" graph for the hero and contact artwork: nodes, the links between neighbours,
// a few hub nodes, and the links that carry a travelling pulse. It is a stylised call graph.
//
// The same seed always gives the same graph, so builds stay stable and the HTML diff stays quiet.

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (n) => Math.round(n * 10) / 10;

export function constellation({ seed = 7, count = 34, width = 640, height = 560, gap = 62, pad = 34, hubs = 5, signals = 7 } = {}) {
  const rand = mulberry32(seed);

  // Scatter nodes, rejecting any that crowd an existing one
  const nodes = [];
  for (let tries = 0; nodes.length < count && tries < count * 80; tries++) {
    const x = pad + rand() * (width - pad * 2);
    const y = pad + rand() * (height - pad * 2);
    if (nodes.every((n) => Math.hypot(n.x - x, n.y - y) >= gap)) nodes.push({ x: round(x), y: round(y), degree: 0, hub: false });
  }

  // Link every node to its two nearest neighbours, skipping duplicates
  const seen = new Set();
  const edges = [];
  nodes.forEach((a, i) => {
    nodes
      .map((b, j) => ({ j, d: Math.hypot(a.x - b.x, a.y - b.y) }))
      .filter(({ j }) => j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, 2)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key)) return;
        seen.add(key);
        edges.push([i, j]);
        nodes[i].degree++;
        nodes[j].degree++;
      });
  });

  // The best-connected nodes become the hubs
  [...nodes]
    .sort((a, b) => b.degree - a.degree)
    .slice(0, hubs)
    .forEach((n) => (n.hub = true));

  // Pulses travel along the longer links, which read best at a distance
  const length = ([a, b]) => Math.hypot(nodes[a].x - nodes[b].x, nodes[a].y - nodes[b].y);
  const longest = [...edges].sort((p, q) => length(q) - length(p)).slice(0, signals * 2);
  const pulses = [];
  while (pulses.length < signals && longest.length) pulses.push(longest.splice(Math.floor(rand() * longest.length), 1)[0]);

  return { nodes, edges, pulses, width, height };
}
