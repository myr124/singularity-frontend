export interface Point {
  x: number;
  y: number;
}

interface BrainRegion {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  weight: number;
}

function createSideBrainRegions(): BrainRegion[] {
  // Left-facing profile view of a brain
  return [
    // Frontal lobe (front bulge, left side)
    { cx: 0.22, cy: 0.38, rx: 0.10, ry: 0.12, weight: 1.0 },
    // Upper cerebrum arc - front
    { cx: 0.35, cy: 0.28, rx: 0.10, ry: 0.10, weight: 0.95 },
    // Upper cerebrum arc - middle
    { cx: 0.50, cy: 0.25, rx: 0.12, ry: 0.09, weight: 1.0 },
    // Upper cerebrum arc - back
    { cx: 0.65, cy: 0.30, rx: 0.10, ry: 0.10, weight: 0.95 },
    // Parietal lobe (top-back)
    { cx: 0.62, cy: 0.40, rx: 0.10, ry: 0.10, weight: 0.9 },
    // Occipital lobe (back bulge, right side)
    { cx: 0.78, cy: 0.45, rx: 0.08, ry: 0.10, weight: 0.9 },
    // Temporal lobe (bottom-middle)
    { cx: 0.42, cy: 0.52, rx: 0.12, ry: 0.08, weight: 0.85 },
    // Deep center mass
    { cx: 0.50, cy: 0.42, rx: 0.14, ry: 0.10, weight: 0.8 },
    // Cerebellum (back-lower, layered)
    { cx: 0.73, cy: 0.62, rx: 0.08, ry: 0.08, weight: 0.85 },
    // Brain stem
    { cx: 0.60, cy: 0.75, rx: 0.04, ry: 0.08, weight: 0.6 },
    // Lower frontal hook
    { cx: 0.28, cy: 0.50, rx: 0.07, ry: 0.07, weight: 0.7 },
  ];
}

function createBrainRegions(): BrainRegion[] {
  // More detailed brain shape with multiple overlapping regions
  return [
    // Left hemisphere - upper
    { cx: 0.32, cy: 0.35, rx: 0.16, ry: 0.18, weight: 1.0 },
    // Left hemisphere - lower
    { cx: 0.30, cy: 0.52, rx: 0.14, ry: 0.16, weight: 0.9 },
    // Right hemisphere - upper
    { cx: 0.68, cy: 0.35, rx: 0.16, ry: 0.18, weight: 1.0 },
    // Right hemisphere - lower
    { cx: 0.70, cy: 0.52, rx: 0.14, ry: 0.16, weight: 0.9 },
    // Center bridge (corpus callosum area)
    { cx: 0.50, cy: 0.38, rx: 0.08, ry: 0.12, weight: 0.7 },
    // Cerebellum - left lobe
    { cx: 0.42, cy: 0.75, rx: 0.10, ry: 0.10, weight: 0.8 },
    // Cerebellum - right lobe
    { cx: 0.58, cy: 0.75, rx: 0.10, ry: 0.10, weight: 0.8 },
    // Brain stem
    { cx: 0.50, cy: 0.88, rx: 0.06, ry: 0.08, weight: 0.6 },
    // Temporal lobe - left
    { cx: 0.25, cy: 0.60, rx: 0.10, ry: 0.12, weight: 0.7 },
    // Temporal lobe - right
    { cx: 0.75, cy: 0.60, rx: 0.10, ry: 0.12, weight: 0.7 },
    // Frontal lobe bulge - left
    { cx: 0.35, cy: 0.22, rx: 0.10, ry: 0.10, weight: 0.8 },
    // Frontal lobe bulge - right
    { cx: 0.65, cy: 0.22, rx: 0.10, ry: 0.10, weight: 0.8 },
  ];
}

function isInsideRegion(px: number, py: number, region: BrainRegion): boolean {
  const dx = (px - region.cx) / region.rx;
  const dy = (py - region.cy) / region.ry;
  return dx * dx + dy * dy <= 1.0;
}

function samplePointInBrain(regions: BrainRegion[]): Point | null {
  // Weighted sampling
  const totalWeight = regions.reduce((sum, r) => sum + r.weight, 0);
  const rand = Math.random() * totalWeight;
  let cumulative = 0;
  
  for (const region of regions) {
    cumulative += region.weight;
    if (rand <= cumulative) {
      // Sample within this region using rejection sampling for uniform distribution
      let attempts = 0;
      while (attempts < 20) {
        const x = region.cx + (Math.random() * 2 - 1) * region.rx;
        const y = region.cy + (Math.random() * 2 - 1) * region.ry;
        if (isInsideRegion(x, y, region)) {
          return { x, y };
        }
        attempts++;
      }
      // Fallback to center if rejection sampling fails
      return { x: region.cx, y: region.cy };
    }
  }
  
  return null;
}

export interface BrainNode extends Point {
  id: number;
  neighbors: number[]; // IDs (indices) of connected nodes
}

export function generateSideBrainTargets(count: number): Point[] {
  const regions = createSideBrainRegions();
  const points: Point[] = [];
  for (let i = 0; i < count; i++) {
    const p = samplePointInBrain(regions) ?? {
      x: 0.2 + Math.random() * 0.6,
      y: 0.2 + Math.random() * 0.6,
    };
    points.push(p);
  }
  return points;
}

export function generateBrainPoints(count: number): BrainNode[] {
  const regions = createBrainRegions();
  const points: BrainNode[] = [];
  
  // Generate points with shuffled region order for variety
  const shuffledRegions = [...regions].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < count; i++) {
    let point: Point | null = null;
    
    // Try weighted sampling first
    point = samplePointInBrain(shuffledRegions);
    
    if (!point) {
      // Fallback: random position
      point = {
        x: 0.2 + Math.random() * 0.6,
        y: 0.15 + Math.random() * 0.75,
      };
    }
    
    points.push({
      x: point.x,
      y: point.y,
      id: i,
      neighbors: [],
    });
  }
  
  // Connect to nearest neighbors (2-3 connections each)
  const maxNeighbors = 3;
  const connectionRadius = 0.10; // Max distance for connection (normalized coords)
  
  for (let i = 0; i < points.length; i++) {
    const p1 = points[i]!;
    const distances: { id: number; dist: number }[] = [];
    
    for (let j = i + 1; j < points.length; j++) {
      const p2 = points[j]!;
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < connectionRadius) {
        distances.push({ id: j, dist });
      }
    }
    
    // Sort by distance and pick closest
    distances.sort((a, b) => a.dist - b.dist);
    const neighborCount = Math.min(maxNeighbors, distances.length);
    
    for (let k = 0; k < neighborCount; k++) {
      const neighborId = distances[k]!.id;
      p1.neighbors.push(neighborId);
      points[neighborId]!.neighbors.push(i);
    }
  }
  
  return points;
}