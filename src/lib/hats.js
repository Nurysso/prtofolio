// Aperiodic "hat" tilings: one shape, the "einstein", that covers the plane without ever repeating.
//
// The hat is a 13-sided polygon found in 2023 by David Smith, then proved by Smith, Myers, Kaplan and
// Goodman-Strauss ("An aperiodic monotile", arXiv:2303.10798). Every tiling of the plane by hats is
// non-periodic, so a window cut from a big enough patch never contains the same arrangement twice.
//
// A patch is built by substitution. The hats group into four clusters ("metatiles") called H, T, P and F.
// Each round fits copies of those clusters into a larger H, T, P and F, so a patch grows without any
// search or backtracking, and it is valid by construction.
//
// The substitution rules and metatile outlines below are the ones in Craig S. Kaplan's `hatviz`
// (https://github.com/isohedral/hatviz), restructured and cut down to what this site needs. They are
// covered by this licence:
//
//   BSD 3-Clause License
//
//   Copyright (c) 2023, Craig S. Kaplan
//
//   Redistribution and use in source and binary forms, with or without modification, are permitted
//   provided that the following conditions are met:
//
//   1. Redistributions of source code must retain the above copyright notice, this list of conditions
//      and the following disclaimer.
//   2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions
//      and the following disclaimer in the documentation and/or other materials provided with the
//      distribution.
//   3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse
//      or promote products derived from this software without specific prior written permission.
//
//   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
//   IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
//   FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
//   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
//   DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
//   DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//   CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE
//   USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

const HR3 = Math.sqrt(3) / 2;

// ─── Geometry ───────────────────────────────────────────────────────────────
// A transform is [a, b, c, d, e, f]:  x' = a·x + b·y + c,  y' = d·x + e·y + f

const IDENT = [1, 0, 0, 0, 1, 0];

const pt = (x, y) => ({ x, y });
// A point on the triangular lattice the hat is drawn on: (x, y) steps along two lattice directions
const hexPt = (x, y) => pt(x + 0.5 * y, HR3 * y);

const mul = (A, B) => [
  A[0] * B[0] + A[1] * B[3],
  A[0] * B[1] + A[1] * B[4],
  A[0] * B[2] + A[1] * B[5] + A[2],
  A[3] * B[0] + A[4] * B[3],
  A[3] * B[1] + A[4] * B[4],
  A[3] * B[2] + A[4] * B[5] + A[5],
];

function inv(T) {
  const det = T[0] * T[4] - T[1] * T[3];
  return [
    T[4] / det,
    -T[1] / det,
    (T[1] * T[5] - T[2] * T[4]) / det,
    -T[3] / det,
    T[0] / det,
    (T[2] * T[3] - T[0] * T[5]) / det,
  ];
}

const apply = (M, P) => pt(M[0] * P.x + M[1] * P.y + M[2], M[3] * P.x + M[4] * P.y + M[5]);
const add = (p, q) => pt(p.x + q.x, p.y + q.y);
const sub = (p, q) => pt(p.x - q.x, p.y - q.y);

const rot = (a) => [Math.cos(a), -Math.sin(a), 0, Math.sin(a), Math.cos(a), 0];
const shift = (x, y) => [1, 0, x, 0, 1, y];
const rotAbout = (p, a) => mul(shift(p.x, p.y), mul(rot(a), shift(-p.x, -p.y)));

// The similarity that takes segment p1→q1 onto p2→q2
const segFrame = (p, q) => [q.x - p.x, p.y - q.y, p.x, q.y - p.y, q.x - p.x, p.y];
const matchSegments = (p1, q1, p2, q2) => mul(segFrame(p2, q2), inv(segFrame(p1, q1)));

// Where the infinite lines through p1→q1 and p2→q2 cross
function intersect(p1, q1, p2, q2) {
  const d = (q2.y - p2.y) * (q1.x - p1.x) - (q2.x - p2.x) * (q1.y - p1.y);
  const u = ((q2.x - p2.x) * (p1.y - p2.y) - (q2.y - p2.y) * (p1.x - p2.x)) / d;
  return pt(p1.x + u * (q1.x - p1.x), p1.y + u * (q1.y - p1.y));
}

// ─── The hat ────────────────────────────────────────────────────────────────

const OUTLINE = [
  hexPt(0, 0), hexPt(-1, -1), hexPt(0, -2), hexPt(2, -2), hexPt(2, -1), hexPt(4, -2), hexPt(5, -1),
  hexPt(4, 0), hexPt(3, 0), hexPt(2, 2), hexPt(0, 3), hexPt(0, 2), hexPt(-1, 2),
];

// The outline as [x, y] pairs, for drawing. Apply a hat's matrix to place it.
export const HAT_OUTLINE = OUTLINE.map(({ x, y }) => [x, y]);

// ─── Metatiles ──────────────────────────────────────────────────────────────

// A leaf of the tree: one hat. The label says which cluster it belongs to; "H1" is the one mirrored hat
// in each H cluster, which is how a tiling is allowed to use the hat's mirror image at all.
const hat = (label) => ({ hat: true, label });
const HATS = { H1: hat('H1'), H: hat('H'), T: hat('T'), P: hat('P'), F: hat('F') };

class Metatile {
  constructor(shape) {
    this.shape = shape; // outline polygon
    this.children = []; // { T, geom } where geom is a Metatile or a hat leaf
  }

  add(T, geom) {
    this.children.push({ T, geom });
  }

  vertex(child, i) {
    return apply(this.children[child].T, this.children[child].geom.shape[i]);
  }

  // Move the origin to the middle of the outline, so successive rounds stay centred
  recentre() {
    const n = this.shape.length;
    const cx = this.shape.reduce((s, p) => s + p.x, 0) / n;
    const cy = this.shape.reduce((s, p) => s + p.y, 0) / n;
    this.shape = this.shape.map((p) => pt(p.x - cx, p.y - cy));
    const M = shift(-cx, -cy);
    for (const child of this.children) child.T = mul(M, child.T);
  }
}

// The four starting clusters, each a few hats fitted inside an outline
const H0 = (() => {
  const o = [pt(0, 0), pt(4, 0), pt(4.5, HR3), pt(2.5, 5 * HR3), pt(1.5, 5 * HR3), pt(-0.5, HR3)];
  const m = new Metatile(o);
  m.add(matchSegments(OUTLINE[5], OUTLINE[7], o[5], o[0]), HATS.H);
  m.add(matchSegments(OUTLINE[9], OUTLINE[11], o[1], o[2]), HATS.H);
  m.add(matchSegments(OUTLINE[5], OUTLINE[7], o[3], o[4]), HATS.H);
  m.add(mul(shift(2.5, HR3), mul([-0.5, -HR3, 0, HR3, -0.5, 0], [0.5, 0, 0, 0, -0.5, 0])), HATS.H1);
  return m;
})();

const T0 = (() => {
  const m = new Metatile([pt(0, 0), pt(3, 0), pt(1.5, 3 * HR3)]);
  m.add([0.5, 0, 0.5, 0, 0.5, HR3], HATS.T);
  return m;
})();

const P0 = (() => {
  const m = new Metatile([pt(0, 0), pt(4, 0), pt(3, 2 * HR3), pt(-1, 2 * HR3)]);
  m.add([0.5, 0, 1.5, 0, 0.5, HR3], HATS.P);
  m.add(mul(shift(0, 2 * HR3), mul([0.5, HR3, 0, -HR3, 0.5, 0], [0.5, 0, 0, 0, 0.5, 0])), HATS.P);
  return m;
})();

const F0 = (() => {
  const m = new Metatile([pt(0, 0), pt(3, 0), pt(3.5, HR3), pt(3, 2 * HR3), pt(-1, 2 * HR3)]);
  m.add([0.5, 0, 1.5, 0, 0.5, HR3], HATS.F);
  m.add(mul(shift(0, 2 * HR3), mul([0.5, HR3, 0, -HR3, 0.5, 0], [0.5, 0, 0, 0, 0.5, 0])), HATS.F);
  return m;
})();

// ─── Substitution ───────────────────────────────────────────────────────────

// How a supertile is assembled from 29 clusters. Entry 0 is placed as is. Every other entry glues a new
// cluster onto edges of ones already placed:
//   [parent, edge, type, newEdge]                    glue newEdge of the new cluster to one parent edge
//   [parent, edge, parent2, vertex, type, newEdge]   glue it between a parent edge and another's vertex
const PATCH_RULES = [
  ['H'],
  [0, 0, 'P', 2],
  [1, 0, 'H', 2],
  [2, 0, 'P', 2],
  [3, 0, 'H', 2],
  [4, 4, 'P', 2],
  [0, 4, 'F', 3],
  [2, 4, 'F', 3],
  [4, 1, 3, 2, 'F', 0],
  [8, 3, 'H', 0],
  [9, 2, 'P', 0],
  [10, 2, 'H', 0],
  [11, 4, 'P', 2],
  [12, 0, 'H', 2],
  [13, 0, 'F', 3],
  [14, 2, 'F', 1],
  [15, 3, 'H', 4],
  [8, 2, 'F', 1],
  [17, 3, 'H', 0],
  [18, 2, 'P', 0],
  [19, 2, 'H', 2],
  [20, 4, 'F', 3],
  [20, 0, 'P', 2],
  [22, 0, 'H', 2],
  [23, 4, 'F', 3],
  [23, 0, 'F', 3],
  [16, 0, 'P', 2],
  [9, 4, 0, 2, 'T', 2],
  [4, 0, 'F', 3],
];

function buildPatch({ H, T, P, F }) {
  const kinds = { H, T, P, F };
  const patch = new Metatile([]);

  for (const rule of PATCH_RULES) {
    if (rule.length === 1) {
      patch.add(IDENT, kinds[rule[0]]);
      continue;
    }

    let onto; // the segment of the existing patch the new cluster is glued along, as [from, to]
    let type;
    let edge;
    if (rule.length === 4) {
      const [parent, e, t, ne] = rule;
      const { T: pT, geom } = patch.children[parent];
      onto = [apply(pT, geom.shape[(e + 1) % geom.shape.length]), apply(pT, geom.shape[e])];
      type = t;
      edge = ne;
    } else {
      const [parent, e, parent2, v, t, ne] = rule;
      onto = [patch.vertex(parent2, v), patch.vertex(parent, e)];
      type = t;
      edge = ne;
    }

    const next = kinds[type];
    const shape = next.shape;
    patch.add(matchSegments(shape[edge], shape[(edge + 1) % shape.length], onto[0], onto[1]), next);
  }
  return patch;
}

// Pull the next generation of H, T, P and F out of a freshly built patch
function liftMetatiles(patch) {
  const bps1 = patch.vertex(8, 2);
  const bps2 = patch.vertex(21, 2);
  const rbps = apply(rotAbout(bps1, (-2 * Math.PI) / 3), bps2);

  const p72 = patch.vertex(7, 2);
  const p252 = patch.vertex(25, 2);

  const llc = intersect(bps1, rbps, patch.vertex(6, 2), p72);
  let w = sub(patch.vertex(6, 2), llc);

  const hOutline = [llc, bps1];
  w = apply(rot(-Math.PI / 3), w);
  hOutline.push(add(hOutline[1], w));
  hOutline.push(patch.vertex(14, 2));
  w = apply(rot(-Math.PI / 3), w);
  hOutline.push(sub(hOutline[3], w));
  hOutline.push(patch.vertex(6, 2));

  const take = (outline, indices) => {
    const m = new Metatile(outline);
    for (const i of indices) m.add(patch.children[i].T, patch.children[i].geom);
    return m;
  };

  const H = take(hOutline, [0, 9, 16, 27, 26, 6, 1, 8, 10, 15]);
  const P = take([p72, add(p72, sub(bps1, llc)), bps1, llc], [7, 2, 3, 4, 28]);
  const F = take(
    [bps2, patch.vertex(24, 2), patch.vertex(25, 0), p252, add(p252, sub(llc, bps1))],
    [21, 20, 22, 23, 24, 25]
  );

  const a = hOutline[2];
  const b = add(hOutline[1], sub(hOutline[4], hOutline[5]));
  const c = apply(rotAbout(b, -Math.PI / 3), a);
  const T = take([b, c, a], [11]);

  for (const m of [H, T, P, F]) m.recentre();
  return { H, T, P, F };
}

// ─── Public API ─────────────────────────────────────────────────────────────

const roundsCache = [{ H: H0, T: T0, P: P0, F: F0 }];

// `rounds` = how many times the substitution has been applied. 0 is a single cluster of 1 to 4 hats;
// each round makes the supertile about 3.7 times wider.
function metatiles(rounds) {
  while (roundsCache.length <= rounds) roundsCache.push(liftMetatiles(buildPatch(roundsCache.at(-1))));
  return roundsCache[rounds];
}

function collect(meta, M, out) {
  for (const { T, geom } of meta.children) {
    const m = mul(M, T);
    if (geom.hat) out.push({ kind: geom.label, m });
    else collect(geom, m, out);
  }
}

/**
 * Hats of a supertile, as { kind, m } where `m` is the 2×3 matrix that places HAT_OUTLINE.
 * kind: "H1" (the mirrored hat), "H", "T", "P" or "F" (the cluster the hat belongs to).
 *
 * @param {'H'|'T'|'P'|'F'} type  which supertile to grow
 * @param {number} rounds         substitution rounds; the supertile is centred on the origin
 */
export function hatPatch(type = 'H', rounds = 3) {
  const supertile = metatiles(rounds)[type];
  const hats = [];
  collect(supertile, IDENT, hats);
  return { hats, outline: supertile.shape.map(({ x, y }) => [x, y]) };
}

/** A hat's outline in patch coordinates. */
export const hatPoints = (m) => HAT_OUTLINE.map(([x, y]) => [m[0] * x + m[1] * y + m[2], m[3] * x + m[4] * y + m[5]]);

function inPolygon(poly, { x, y }) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/**
 * The hats that fall inside a window cut from a patch, ready to draw.
 *
 * The window is `width` × `height` and centred on the origin of the result. `offset` picks which part of the
 * patch it looks at (patch units) and `rotate` turns the tiling (degrees). Each hat comes back as
 * { kind, m, x, y }: `m` places HAT_OUTLINE inside the window and (x, y) is its rough centre.
 *
 * Throws if a corner of the window would leave the supertile, because the hats there would stop short and
 * leave a gap. Pick a smaller window, a different offset or more rounds.
 */
export function hatWindow({ rounds = 4, width, height, offset = [0, 0], rotate = 0 }) {
  const { hats, outline } = hatPatch('H', rounds);
  const view = mul(rot((rotate * Math.PI) / 180), shift(-offset[0], -offset[1])); // patch → window
  const back = inv(view);

  for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
    if (!inPolygon(outline, apply(back, pt((sx * width) / 2, (sy * height) / 2)))) {
      throw new Error(
        `hatWindow: a ${width}×${height} window at offset [${offset}] (rotate ${rotate}°) leaves the supertile; ` +
          `use a smaller window, a different offset or more rounds`
      );
    }
  }

  const out = [];
  for (const { kind, m } of hats) {
    const placed = mul(view, m);
    const pts = hatPoints(placed);
    const xs = pts.map((p) => p[0]);
    const ys = pts.map((p) => p[1]);
    const near = Math.max(...xs) > -width / 2 && Math.min(...xs) < width / 2 && Math.max(...ys) > -height / 2 && Math.min(...ys) < height / 2;
    if (near) out.push({ kind, m: placed, x: xs.reduce((a, b) => a + b) / xs.length, y: ys.reduce((a, b) => a + b) / ys.length });
  }
  return out;
}
