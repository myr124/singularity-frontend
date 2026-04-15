type TreeNode = {
  nodeId: string;
  parentId: string | null;
};

export type PositionedNode<T extends TreeNode = TreeNode> = T & {
  depth: number;
  x: number;
  y: number;
};

export function buildTreeLayout<T extends TreeNode>(
  nodes: T[],
  width: number,
  height: number,
): PositionedNode<T>[] {
  const children = new Map<string, T[]>();

  for (const node of nodes) {
    if (!node.parentId) continue;
    const branch = children.get(node.parentId) ?? [];
    branch.push(node);
    children.set(node.parentId, branch);
  }

  const root = nodes.find((node) => node.parentId === null);
  if (!root) return [];

  const depthMap = new Map<string, number>();
  const leaves: string[] = [];

  function walk(node: T, depth: number) {
    depthMap.set(node.nodeId, depth);
    const branch = children.get(node.nodeId) ?? [];
    if (branch.length === 0) {
      leaves.push(node.nodeId);
      return;
    }
    for (const child of branch) walk(child, depth + 1);
  }

  walk(root, 0);

  const maxDepth = Math.max(...depthMap.values(), 0);
  const leafPositions = new Map(leaves.map((id, index) => [id, index]));

  function computeX(nodeId: string): number {
    const branch = children.get(nodeId) ?? [];
    if (branch.length === 0) return leafPositions.get(nodeId) ?? 0;
    const xs = branch.map((child) => computeX(child.nodeId));
    return xs.reduce((sum, value) => sum + value, 0) / xs.length;
  }

  const maxLeafIndex = Math.max(leaves.length - 1, 1);

  return nodes
    .map((node) => {
      const depth = depthMap.get(node.nodeId) ?? 0;
      const x = 60 + (computeX(node.nodeId) / maxLeafIndex) * (width - 120);
      const y = 72 + (depth / Math.max(maxDepth, 1)) * (height - 144);

      return {
        ...node,
        depth,
        x,
        y,
      };
    })
    .sort((a, b) => a.depth - b.depth);
}

export function countChangedCells(prev: number[][], next: number[][]) {
  let changed = 0;
  for (let y = 0; y < prev.length; y += 1) {
    for (let x = 0; x < prev[y]!.length; x += 1) {
      if (prev[y]![x] !== next[y]![x]) changed += 1;
    }
  }
  return changed;
}