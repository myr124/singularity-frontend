import type { ActionCandidate, EnvState } from "~/lib/tasks/arc/contracts";
import { runDatasetSchema } from "~/lib/tasks/arc/contracts";

const SIZE = 64;

function buildFrame(seed: number) {
  return Array.from({ length: SIZE }, (_, y) =>
    Array.from({ length: SIZE }, (_, x) => {
      const ridge = Math.sin((x + seed) / 5) + Math.cos((y - seed) / 7);
      if ((x + y + seed) % 13 === 0) return 7;
      if (ridge > 1.35) return 5;
      if (ridge > 0.6) return 3;
      if ((x * y + seed) % 19 === 0) return 2;
      return 0;
    }),
  );
}

function cloneState(input: EnvState, overrides: Partial<EnvState>): EnvState {
  return {
    ...input,
    ...overrides,
  };
}

const rootState: EnvState = {
  frame: buildFrame(3),
  state: "RUNNING",
  score: 0.47,
  availableActions: [1, 2, 3, 4, 5, 6, 7],
  stepIndex: 14,
};

const actions: ActionCandidate[] = [
  { action: "ACTION2", x: null, y: null, rationale: "Preserves the bright central motif while opening a cleaner branch." },
  { action: "ACTION6", x: 19, y: 22, rationale: "Targeted intervention near the highest-value subgrid." },
  { action: "ACTION4", x: null, y: null, rationale: "Favors symmetry restoration and lowers rollout volatility." },
  { action: "ACTION1", x: null, y: null, rationale: "Shallow but stable fallback to increase immediate score." },
];

const childStates = [
  cloneState(rootState, { score: 0.62, frame: buildFrame(8), stepIndex: 15 }),
  cloneState(rootState, { score: 0.71, frame: buildFrame(11), stepIndex: 15 }),
  cloneState(rootState, { score: 0.58, frame: buildFrame(14), stepIndex: 15 }),
  cloneState(rootState, { score: 0.53, frame: buildFrame(18), stepIndex: 15 }),
];

const deepBranchStates = {
  root0a: cloneState(childStates[0]!, { score: 0.69, frame: buildFrame(21), stepIndex: 16 }),
  root0b: cloneState(childStates[0]!, { score: 0.64, frame: buildFrame(23), stepIndex: 16 }),
  root1a: cloneState(childStates[1]!, { score: 0.84, frame: buildFrame(20), stepIndex: 16 }),
  root1b: cloneState(childStates[1]!, { score: 0.68, frame: buildFrame(24), stepIndex: 16 }),
  root1c: cloneState(childStates[1]!, { score: 0.73, frame: buildFrame(27), stepIndex: 16 }),
  root2a: cloneState(childStates[2]!, { score: 0.65, frame: buildFrame(28), stepIndex: 16 }),
  root2b: cloneState(childStates[2]!, { score: 0.61, frame: buildFrame(30), stepIndex: 16 }),
  root3a: cloneState(childStates[3]!, { score: 0.57, frame: buildFrame(33), stepIndex: 16 }),
  root1a1: cloneState(childStates[1]!, { score: 0.89, frame: buildFrame(36), stepIndex: 17 }),
  root1a2: cloneState(childStates[1]!, { score: 0.82, frame: buildFrame(38), stepIndex: 17 }),
  root1b1: cloneState(childStates[1]!, { score: 0.71, frame: buildFrame(40), stepIndex: 17 }),
  root2a1: cloneState(childStates[2]!, { score: 0.69, frame: buildFrame(42), stepIndex: 17 }),
  root2a2: cloneState(childStates[2]!, { score: 0.67, frame: buildFrame(44), stepIndex: 17 }),
  root0a1: cloneState(childStates[0]!, { score: 0.74, frame: buildFrame(46), stepIndex: 17 }),
};

const nodes = [
  {
    nodeId: "root",
    parentId: null,
    action: null,
    visits: 41,
    totalValue: 26.1,
    meanValue: 0.64,
    isTerminal: false,
    state: rootState,
  },
  ...actions.map((action, index) => ({
    nodeId: `root-${index}`,
    parentId: "root",
    action,
    visits: [11, 16, 8, 6][index]!,
    totalValue: [6.3, 12.1, 4.8, 2.9][index]!,
    meanValue: [0.57, 0.76, 0.6, 0.49][index]!,
    isTerminal: false,
    state: childStates[index]!,
  })),
  {
    nodeId: "root-1-a",
    parentId: "root-1",
    action: { action: "ACTION3", x: null, y: null, rationale: "Expands the strongest branch with low entropy." },
    visits: 9,
    totalValue: 7.6,
    meanValue: 0.84,
    isTerminal: false,
    state: deepBranchStates.root1a,
  },
  {
    nodeId: "root-1-b",
    parentId: "root-1",
    action: { action: "ACTION5", x: null, y: null, rationale: "Alternative high-upside rollout branch." },
    visits: 5,
    totalValue: 3.4,
    meanValue: 0.68,
    isTerminal: false,
    state: deepBranchStates.root1b,
  },
  {
    nodeId: "root-2-a",
    parentId: "root-2",
    action: { action: "ACTION6", x: 26, y: 18, rationale: "Spatial edit that sharpens the right-hand contour." },
    visits: 4,
    totalValue: 2.6,
    meanValue: 0.65,
    isTerminal: false,
    state: deepBranchStates.root2a,
  },
  {
    nodeId: "root-0-a",
    parentId: "root-0",
    action: { action: "ACTION7", x: null, y: null, rationale: "Explores a high-contrast branch near the left edge." },
    visits: 7,
    totalValue: 4.8,
    meanValue: 0.69,
    isTerminal: false,
    state: deepBranchStates.root0a,
  },
  {
    nodeId: "root-0-b",
    parentId: "root-0",
    action: { action: "ACTION3", x: null, y: null, rationale: "Stabilizes the branch without sacrificing pattern coherence." },
    visits: 5,
    totalValue: 3.2,
    meanValue: 0.64,
    isTerminal: false,
    state: deepBranchStates.root0b,
  },
  {
    nodeId: "root-1-c",
    parentId: "root-1",
    action: { action: "ACTION2", x: null, y: null, rationale: "Keeps the strongest branch broad with a safer mid-value continuation." },
    visits: 6,
    totalValue: 4.4,
    meanValue: 0.73,
    isTerminal: false,
    state: deepBranchStates.root1c,
  },
  {
    nodeId: "root-2-b",
    parentId: "root-2",
    action: { action: "ACTION4", x: null, y: null, rationale: "Secondary refinement path with lower variance." },
    visits: 4,
    totalValue: 2.4,
    meanValue: 0.61,
    isTerminal: false,
    state: deepBranchStates.root2b,
  },
  {
    nodeId: "root-3-a",
    parentId: "root-3",
    action: { action: "ACTION6", x: 12, y: 33, rationale: "Localized probe to rescue a low-confidence branch." },
    visits: 3,
    totalValue: 1.7,
    meanValue: 0.57,
    isTerminal: false,
    state: deepBranchStates.root3a,
  },
  {
    nodeId: "root-1-a-1",
    parentId: "root-1-a",
    action: { action: "ACTION2", x: null, y: null, rationale: "Best follow-up after the strongest branch expansion." },
    visits: 5,
    totalValue: 4.45,
    meanValue: 0.89,
    isTerminal: false,
    state: deepBranchStates.root1a1,
  },
  {
    nodeId: "root-1-a-2",
    parentId: "root-1-a",
    action: { action: "ACTION6", x: 31, y: 20, rationale: "Spatial edit to consolidate the top-value region." },
    visits: 4,
    totalValue: 3.28,
    meanValue: 0.82,
    isTerminal: false,
    state: deepBranchStates.root1a2,
  },
  {
    nodeId: "root-1-b-1",
    parentId: "root-1-b",
    action: { action: "ACTION1", x: null, y: null, rationale: "Fallback continuation when the aggressive branch underperforms." },
    visits: 3,
    totalValue: 2.13,
    meanValue: 0.71,
    isTerminal: false,
    state: deepBranchStates.root1b1,
  },
  {
    nodeId: "root-2-a-1",
    parentId: "root-2-a",
    action: { action: "ACTION3", x: null, y: null, rationale: "Improves symmetry on the right-hand branch." },
    visits: 3,
    totalValue: 2.07,
    meanValue: 0.69,
    isTerminal: false,
    state: deepBranchStates.root2a1,
  },
  {
    nodeId: "root-2-a-2",
    parentId: "root-2-a",
    action: { action: "ACTION7", x: null, y: null, rationale: "Alternative branch with slightly lower confidence but broader search coverage." },
    visits: 3,
    totalValue: 2.01,
    meanValue: 0.67,
    isTerminal: false,
    state: deepBranchStates.root2a2,
  },
  {
    nodeId: "root-0-a-1",
    parentId: "root-0-a",
    action: { action: "ACTION5", x: null, y: null, rationale: "High-upside continuation for the left-side exploratory path." },
    visits: 4,
    totalValue: 2.96,
    meanValue: 0.74,
    isTerminal: false,
    state: deepBranchStates.root0a1,
  },
];

const iterations = [
  {
    iterationIndex: 1,
    selectedPath: ["root", "root-1"],
    expandedNodeId: "root-1",
    candidateActions: actions,
    simulationResultValue: 0.71,
    backpropUpdates: [
      { nodeId: "root-1", visits: 1, meanValue: 0.71 },
      { nodeId: "root", visits: 1, meanValue: 0.71 },
    ],
  },
  {
    iterationIndex: 2,
    selectedPath: ["root", "root-1", "root-1-a"],
    expandedNodeId: "root-1-a",
    candidateActions: [
      { action: "ACTION3", x: null, y: null, rationale: "Best local continuation." },
      { action: "ACTION5", x: null, y: null, rationale: "Higher risk but strong upside." },
    ],
    simulationResultValue: 0.84,
    backpropUpdates: [
      { nodeId: "root-1-a", visits: 4, meanValue: 0.84 },
      { nodeId: "root-1", visits: 8, meanValue: 0.79 },
      { nodeId: "root", visits: 16, meanValue: 0.68 },
    ],
  },
  {
    iterationIndex: 3,
    selectedPath: ["root", "root-2", "root-2-a"],
    expandedNodeId: "root-2-a",
    candidateActions: [
      { action: "ACTION6", x: 26, y: 18, rationale: "Right-side contour refinement." },
    ],
    simulationResultValue: 0.65,
    backpropUpdates: [
      { nodeId: "root-2-a", visits: 4, meanValue: 0.65 },
      { nodeId: "root-2", visits: 8, meanValue: 0.6 },
      { nodeId: "root", visits: 24, meanValue: 0.66 },
    ],
  },
  {
    iterationIndex: 4,
    selectedPath: ["root", "root-1"],
    expandedNodeId: "root-1-b",
    candidateActions: [
      { action: "ACTION5", x: null, y: null, rationale: "Alternate high-value branch." },
    ],
    simulationResultValue: 0.68,
    backpropUpdates: [
      { nodeId: "root-1-b", visits: 5, meanValue: 0.68 },
      { nodeId: "root-1", visits: 16, meanValue: 0.76 },
      { nodeId: "root", visits: 41, meanValue: 0.64 },
    ],
  },
  {
    iterationIndex: 5,
    selectedPath: ["root", "root-0", "root-0-a"],
    expandedNodeId: "root-0-a",
    candidateActions: [
      { action: "ACTION7", x: null, y: null, rationale: "Promising left-side exploration branch." },
      { action: "ACTION5", x: null, y: null, rationale: "Potential high-value follow-up." },
    ],
    simulationResultValue: 0.69,
    backpropUpdates: [
      { nodeId: "root-0-a", visits: 7, meanValue: 0.69 },
      { nodeId: "root-0", visits: 11, meanValue: 0.61 },
      { nodeId: "root", visits: 48, meanValue: 0.65 },
    ],
  },
  {
    iterationIndex: 6,
    selectedPath: ["root", "root-1", "root-1-a", "root-1-a-1"],
    expandedNodeId: "root-1-a-1",
    candidateActions: [
      { action: "ACTION2", x: null, y: null, rationale: "Highest-confidence continuation." },
      { action: "ACTION6", x: 31, y: 20, rationale: "Surgical alternative if the branch plateaus." },
    ],
    simulationResultValue: 0.89,
    backpropUpdates: [
      { nodeId: "root-1-a-1", visits: 5, meanValue: 0.89 },
      { nodeId: "root-1-a", visits: 14, meanValue: 0.86 },
      { nodeId: "root-1", visits: 22, meanValue: 0.79 },
      { nodeId: "root", visits: 53, meanValue: 0.67 },
    ],
  },
  {
    iterationIndex: 7,
    selectedPath: ["root", "root-2", "root-2-a", "root-2-a-1"],
    expandedNodeId: "root-2-a-1",
    candidateActions: [
      { action: "ACTION3", x: null, y: null, rationale: "Best symmetry-preserving continuation." },
      { action: "ACTION7", x: null, y: null, rationale: "Wider search alternative." },
    ],
    simulationResultValue: 0.69,
    backpropUpdates: [
      { nodeId: "root-2-a-1", visits: 3, meanValue: 0.69 },
      { nodeId: "root-2-a", visits: 7, meanValue: 0.67 },
      { nodeId: "root-2", visits: 11, meanValue: 0.62 },
      { nodeId: "root", visits: 57, meanValue: 0.67 },
    ],
  },
  {
    iterationIndex: 8,
    selectedPath: ["root", "root-3", "root-3-a"],
    expandedNodeId: "root-3-a",
    candidateActions: [
      { action: "ACTION6", x: 12, y: 33, rationale: "Localized rescue edit." },
    ],
    simulationResultValue: 0.57,
    backpropUpdates: [
      { nodeId: "root-3-a", visits: 3, meanValue: 0.57 },
      { nodeId: "root-3", visits: 9, meanValue: 0.52 },
      { nodeId: "root", visits: 60, meanValue: 0.66 },
    ],
  },
];

export function getMockRun() {
  const nextState = cloneState(rootState, {
    score: 0.74,
    frame: buildFrame(32),
    stepIndex: 15,
  });

  return runDatasetSchema.parse({
    sessionId: "demo-run-01",
    title: "Singularity MCTS Visualizer",
    subtitle: "Neural-tree replay for ARC action selection",
    currentState: rootState,
    nodes,
    iterations,
    decision: {
      rootState,
      candidates: actions,
      childrenStats: actions.map((action, index) => ({
        action,
        visits: [11, 16, 8, 6][index]!,
        value: [0.57, 0.76, 0.6, 0.49][index]!,
      })),
      bestAction: actions[1]!,
    },
    transition: {
      actionTaken: actions[1]!,
      prevState: rootState,
      nextState,
      reward: 0.27,
    },
  });
}