export interface Point {
  x: number;
  y: number;
}

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Region3D {
  cx: number;
  cy: number;
  cz: number;
  rx: number;
  ry: number;
  rz: number;
  weight: number;
  // If true, bias samples toward the shell (cortex-like surface)
  shell: boolean;
}

// Coordinates are roughly in [-0.5, 0.5] (y+ = down to match canvas space).
// The envelope below approximates a human brain: two hemispheres, frontal
// and occipital bulges, temporal lobes, cerebellum, and brain stem.
function createBrainRegions(): Region3D[] {
  return [
    // Left & right cerebral hemispheres (the main mass)
    { cx: -0.17, cy: -0.06, cz:  0.02, rx: 0.22, ry: 0.26, rz: 0.32, weight: 1.0, shell: true },
    { cx:  0.17, cy: -0.06, cz:  0.02, rx: 0.22, ry: 0.26, rz: 0.32, weight: 1.0, shell: true },

    // Frontal lobe bulges (front, rounded)
    { cx: -0.13, cy: -0.10, cz:  0.30, rx: 0.14, ry: 0.17, rz: 0.12, weight: 0.55, shell: true },
    { cx:  0.13, cy: -0.10, cz:  0.30, rx: 0.14, ry: 0.17, rz: 0.12, weight: 0.55, shell: true },

    // Occipital lobes (back bulge)
    { cx: -0.11, cy: -0.02, cz: -0.30, rx: 0.13, ry: 0.17, rz: 0.11, weight: 0.45, shell: true },
    { cx:  0.11, cy: -0.02, cz: -0.30, rx: 0.13, ry: 0.17, rz: 0.11, weight: 0.45, shell: true },

    // Temporal lobes (sides, lower)
    { cx: -0.28, cy:  0.10, cz:  0.02, rx: 0.10, ry: 0.12, rz: 0.24, weight: 0.55, shell: true },
    { cx:  0.28, cy:  0.10, cz:  0.02, rx: 0.10, ry: 0.12, rz: 0.24, weight: 0.55, shell: true },

    // Cerebellum (back-lower, two lobes)
    { cx: -0.09, cy:  0.28, cz: -0.20, rx: 0.12, ry: 0.10, rz: 0.13, weight: 0.45, shell: true },
    { cx:  0.09, cy:  0.28, cz: -0.20, rx: 0.12, ry: 0.10, rz: 0.13, weight: 0.45, shell: true },

    // Brain stem (solid, thin column)
    { cx:  0.00, cy:  0.36, cz: -0.06, rx: 0.05, ry: 0.11, rz: 0.05, weight: 0.15, shell: false },
  ];
}

function sampleInRegion(r: Region3D): Point3D {
  // Random direction on unit sphere
  const u = Math.random() * 2 - 1;
  const theta = Math.random() * Math.PI * 2;
  const s = Math.sqrt(1 - u * u);
  const dx = s * Math.cos(theta);
  const dy = u;
  const dz = s * Math.sin(theta);

  // Radius: shell=true biases toward surface (thin cortex);
  // shell=false fills the volume uniformly (cube-root for uniformity).
  let rad: number;
  if (r.shell) {
    // Mostly in outer 30% of radius, with a little interior scatter
    rad = 0.7 + Math.random() * 0.3;
    if (Math.random() < 0.15) rad = 0.3 + Math.random() * 0.4;
  } else {
    rad = Math.cbrt(Math.random());
  }

  return {
    x: r.cx + dx * r.rx * rad,
    y: r.cy + dy * r.ry * rad,
    z: r.cz + dz * r.rz * rad,
  };
}

function samplePoint(regions: Region3D[]): Point3D {
  const totalWeight = regions.reduce((s, r) => s + r.weight, 0);
  let rand = Math.random() * totalWeight;
  for (const r of regions) {
    rand -= r.weight;
    if (rand <= 0) return sampleInRegion(r);
  }
  return sampleInRegion(regions[0]!);
}

export interface BrainNode extends Point3D {
  id: number;
  neighbors: number[];
}

export function generateBrainPoints(count: number): BrainNode[] {
  const regions = createBrainRegions();
  const points: BrainNode[] = [];

  for (let i = 0; i < count; i++) {
    const p = samplePoint(regions);
    points.push({ x: p.x, y: p.y, z: p.z, id: i, neighbors: [] });
  }

  // 3D nearest-neighbor connections. Uniform grid accelerates O(n²) → ~O(n).
  const cell = 0.06;
  const grid = new Map<string, number[]>();
  const key = (ix: number, iy: number, iz: number) => `${ix},${iy},${iz}`;
  const idx = (v: number) => Math.floor(v / cell);

  for (let i = 0; i < points.length; i++) {
    const p = points[i]!;
    const k = key(idx(p.x), idx(p.y), idx(p.z));
    const bucket = grid.get(k);
    if (bucket) bucket.push(i);
    else grid.set(k, [i]);
  }

  const maxNeighbors = 3;
  const radius = 0.07;
  const r2 = radius * radius;

  for (let i = 0; i < points.length; i++) {
    const p1 = points[i]!;
    const ix = idx(p1.x);
    const iy = idx(p1.y);
    const iz = idx(p1.z);
    const candidates: { id: number; d2: number }[] = [];
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          const bucket = grid.get(key(ix + dx, iy + dy, iz + dz));
          if (!bucket) continue;
          for (const j of bucket) {
            if (j <= i) continue;
            const p2 = points[j]!;
            const ex = p1.x - p2.x;
            const ey = p1.y - p2.y;
            const ez = p1.z - p2.z;
            const d2 = ex * ex + ey * ey + ez * ez;
            if (d2 < r2) candidates.push({ id: j, d2 });
          }
        }
      }
    }
    candidates.sort((a, b) => a.d2 - b.d2);
    const n = Math.min(maxNeighbors, candidates.length);
    for (let k = 0; k < n; k++) {
      const j = candidates[k]!.id;
      if (p1.neighbors.length < maxNeighbors) p1.neighbors.push(j);
      const p2 = points[j]!;
      if (p2.neighbors.length < maxNeighbors + 1) p2.neighbors.push(i);
    }
  }

  return points;
}
