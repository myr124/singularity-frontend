import { runDatasetSchema } from "./contracts";
import type { ActionCandidate, EnvState } from "./contracts";

function makeState(overrides: Partial<EnvState> & { expression: string; target: number; current: number }): EnvState {
  return {
    state: "RUNNING",
    score: 0,
    stepIndex: 0,
    tokensUsed: [],
    ...overrides,
  };
}

const TARGET = 752;
const rootState: EnvState = makeState({
  expression: "100",
  target: TARGET,
  current: 100,
  score: 1 - Math.abs(100 - TARGET) / TARGET,
  stepIndex: 0,
  tokensUsed: ["100"],
});

const actions: ActionCandidate[] = [
  { action: "ADD_8", operation: "add", operand: 8, rationale: "Push toward 752 — incremental gain." },
  { action: "MUL_7", operation: "multiply", operand: 7, rationale: "Multiply to jump into the 700+ range." },
  { action: "ADD_600", operation: "add", operand: 600, rationale: "Direct addition — lands at 700." },
  { action: "SUB_3", operation: "subtract", operand: 3, rationale: "Minor correction — low-impact exploration branch." },
];

const childStates: EnvState[] = [
  makeState({
    expression: "100 + 8",
    target: TARGET,
    current: 108,
    score: 1 - Math.abs(108 - TARGET) / TARGET,
    stepIndex: 1,
    tokensUsed: ["100", "+", "8"],
  }),
  makeState({
    expression: "100 × 7",
    target: TARGET,
    current: 700,
    score: 1 - Math.abs(700 - TARGET) / TARGET,
    stepIndex: 1,
    tokensUsed: ["100", "×", "7"],
  }),
  makeState({
    expression: "100 + 600",
    target: TARGET,
    current: 700,
    score: 1 - Math.abs(700 - TARGET) / TARGET,
    stepIndex: 1,
    tokensUsed: ["100", "+", "600"],
  }),
  makeState({
    expression: "100 − 3",
    target: TARGET,
    current: 97,
    score: 1 - Math.abs(97 - TARGET) / TARGET,
    stepIndex: 1,
    tokensUsed: ["100", "−", "3"],
  }),
];

const deepStates: Record<string, EnvState> = {
  "root-0-a": makeState({
    expression: "100 + 8 + 44", target: TARGET, current: 152,
    score: 1 - Math.abs(152 - TARGET) / TARGET, stepIndex: 2, tokensUsed: ["100", "+", "8", "+", "44"],
  }),
  "root-1-a": makeState({
    expression: "100 × 7 + 52", target: TARGET, current: 752,
    score: 1 - Math.abs(752 - TARGET) / TARGET, stepIndex: 2, tokensUsed: ["100", "×", "7", "+", "52"],
  }),
  "root-1-b": makeState({
    expression: "100 × 7 + 40", target: TARGET, current: 740,
    score: 1 - Math.abs(740 - TARGET) / TARGET, stepIndex: 2, tokensUsed: ["100", "×", "7", "+", "40"],
  }),
  "root-1-c": makeState({
    expression: "100 × 7 − 8", target: TARGET, current: 692,
    score: 1 - Math.abs(692 - TARGET) / TARGET, stepIndex: 2, tokensUsed: ["100", "×", "7", "−", "8"],
  }),
  "root-2-a": makeState({
    expression: "100 + 600 + 52", target: TARGET, current: 752,
    score: 1 - Math.abs(752 - TARGET) / TARGET, stepIndex: 2, tokensUsed: ["100", "+", "600", "+", "52"],
  }),
  "root-3-a": makeState({
    expression: "100 − 3 + 655", target: TARGET, current: 752,
    score: 1 - Math.abs(752 - TARGET) / TARGET, stepIndex: 2, tokensUsed: ["100", "−", "3", "+", "655"],
  }),
  "root-1-a-1": makeState({
    expression: "100 × 7 + 52", target: TARGET, current: 752,
    score: 1.0, stepIndex: 3, tokensUsed: ["100", "×", "7", "+", "52"],
    state: "WIN",
  }),
  "root-1-a-2": makeState({
    expression: "100 × 7 + 50", target: TARGET, current: 750,
    score: 1 - Math.abs(750 - TARGET) / TARGET, stepIndex: 3, tokensUsed: ["100", "×", "7", "+", "50"],
  }),
  "root-2-a-1": makeState({
    expression: "100 + 600 + 52 − 0", target: TARGET, current: 752,
    score: 1.0, stepIndex: 3, tokensUsed: ["100", "+", "600", "+", "52", "−", "0"],
    state: "WIN",
  }),
};

const nodes = [
  {
    nodeId: "root",
    parentId: null,
    action: null,
    visits: 42,
    totalValue: 16.8,
    meanValue: 0.40,
    isTerminal: false,
    state: rootState,
  },
  ...actions.map((action, index) => ({
    nodeId: `root-${index}`,
    parentId: "root",
    action,
    visits: [10, 15, 12, 5][index]!,
    totalValue: [2.8, 8.25, 7.44, 1.35][index]!,
    meanValue: [0.28, 0.55, 0.62, 0.27][index]!,
    isTerminal: false,
    state: childStates[index]!,
  })),
  {
    nodeId: "root-0-a",
    parentId: "root-0",
    action: { action: "ADD_44", operation: "add" as const, operand: 44, rationale: "Slowly approach target with small increments." },
    visits: 5,
    totalValue: 1.3,
    meanValue: 0.26,
    isTerminal: false,
    state: deepStates["root-0-a"]!,
  },
  {
    nodeId: "root-1-a",
    parentId: "root-1",
    action: { action: "ADD_52", operation: "add" as const, operand: 52, rationale: "Exact hit — 700 + 52 = 752!" },
    visits: 8,
    totalValue: 6.96,
    meanValue: 0.87,
    isTerminal: false,
    state: deepStates["root-1-a"]!,
  },
  {
    nodeId: "root-1-b",
    parentId: "root-1",
    action: { action: "ADD_40", operation: "add" as const, operand: 40, rationale: "Close but not exact — 700 + 40 = 740." },
    visits: 4,
    totalValue: 2.52,
    meanValue: 0.63,
    isTerminal: false,
    state: deepStates["root-1-b"]!,
  },
  {
    nodeId: "root-1-c",
    parentId: "root-1",
    action: { action: "SUB_8", operation: "subtract" as const, operand: 8, rationale: "Reduces value — moving away from target." },
    visits: 3,
    totalValue: 0.99,
    meanValue: 0.33,
    isTerminal: false,
    state: deepStates["root-1-c"]!,
  },
  {
    nodeId: "root-2-a",
    parentId: "root-2",
    action: { action: "ADD_52", operation: "add" as const, operand: 52, rationale: "Direct hit from 700 — 700 + 52 = 752." },
    visits: 7,
    totalValue: 6.16,
    meanValue: 0.88,
    isTerminal: false,
    state: deepStates["root-2-a"]!,
  },
  {
    nodeId: "root-3-a",
    parentId: "root-3",
    action: { action: "ADD_655", operation: "add" as const, operand: 655, rationale: "Recovery — brute-force approach." },
    visits: 3,
    totalValue: 2.61,
    meanValue: 0.87,
    isTerminal: false,
    state: deepStates["root-3-a"]!,
  },
  {
    nodeId: "root-1-a-1",
    parentId: "root-1-a",
    action: { action: "CONFIRM", operation: "add" as const, operand: 0, rationale: "Target reached — 752 = 100 × 7 + 52!" },
    visits: 5,
    totalValue: 5.0,
    meanValue: 1.0,
    isTerminal: true,
    state: deepStates["root-1-a-1"]!,
  },
  {
    nodeId: "root-1-a-2",
    parentId: "root-1-a",
    action: { action: "ADD_50", operation: "add" as const, operand: 50, rationale: "Near miss — 700 + 50 = 750, off by 2." },
    visits: 3,
    totalValue: 2.25,
    meanValue: 0.75,
    isTerminal: false,
    state: deepStates["root-1-a-2"]!,
  },
  {
    nodeId: "root-2-a-1",
    parentId: "root-2-a",
    action: { action: "CONFIRM", operation: "add" as const, operand: 0, rationale: "Target reached — 752 = 100 + 600 + 52." },
    visits: 4,
    totalValue: 4.0,
    meanValue: 1.0,
    isTerminal: true,
    state: deepStates["root-2-a-1"]!,
  },
];

const iterations = [
  {
    iterationIndex: 1,
    selectedPath: ["root", "root-1"],
    expandedNodeId: "root-1",
    candidateActions: actions,
    simulationResultValue: 0.55,
    backpropUpdates: [
      { nodeId: "root-1", visits: 1, meanValue: 0.55 },
      { nodeId: "root", visits: 1, meanValue: 0.55 },
    ],
  },
  {
    iterationIndex: 2,
    selectedPath: ["root", "root-2"],
    expandedNodeId: "root-2",
    candidateActions: [
      { action: "ADD_52", operation: "add" as const, operand: 52, rationale: "Adds 52 to 700." },
      { action: "ADD_40", operation: "add" as const, operand: 40, rationale: "Adds 40 to 700." },
    ],
    simulationResultValue: 0.62,
    backpropUpdates: [
      { nodeId: "root-2", visits: 5, meanValue: 0.62 },
      { nodeId: "root", visits: 8, meanValue: 0.48 },
    ],
  },
  {
    iterationIndex: 3,
    selectedPath: ["root", "root-1", "root-1-a"],
    expandedNodeId: "root-1-a",
    candidateActions: [
      { action: "ADD_52", operation: "add" as const, operand: 52, rationale: "Exact solution — 100×7+52=752." },
    ],
    simulationResultValue: 0.87,
    backpropUpdates: [
      { nodeId: "root-1-a", visits: 4, meanValue: 0.87 },
      { nodeId: "root-1", visits: 8, meanValue: 0.61 },
      { nodeId: "root", visits: 16, meanValue: 0.52 },
    ],
  },
  {
    iterationIndex: 4,
    selectedPath: ["root", "root-2", "root-2-a"],
    expandedNodeId: "root-2-a",
    candidateActions: [
      { action: "ADD_52", operation: "add" as const, operand: 52, rationale: "Direct solution from 700." },
    ],
    simulationResultValue: 0.88,
    backpropUpdates: [
      { nodeId: "root-2-a", visits: 4, meanValue: 0.88 },
      { nodeId: "root-2", visits: 8, meanValue: 0.72 },
      { nodeId: "root", visits: 26, meanValue: 0.55 },
    ],
  },
  {
    iterationIndex: 5,
    selectedPath: ["root", "root-1", "root-1-a", "root-1-a-1"],
    expandedNodeId: "root-1-a-1",
    candidateActions: [
      { action: "CONFIRM", operation: "add" as const, operand: 0, rationale: "Solution confirmed: 100×7+52=752." },
    ],
    simulationResultValue: 1.0,
    backpropUpdates: [
      { nodeId: "root-1-a-1", visits: 3, meanValue: 1.0 },
      { nodeId: "root-1-a", visits: 7, meanValue: 0.91 },
      { nodeId: "root-1", visits: 13, meanValue: 0.63 },
      { nodeId: "root", visits: 42, meanValue: 0.58 },
    ],
  },
];

export function getMockRun() {
  const nextState = makeState({
    expression: "100 × 7 + 52",
    target: TARGET,
    current: 752,
    score: 1.0,
    stepIndex: 2,
    tokensUsed: ["100", "×", "7", "+", "52"],
    state: "WIN",
  });

  return runDatasetSchema.parse({
    sessionId: "math-run-01",
    title: "Arithmetic Solver",
    subtitle: "MCTS search for numeric expressions matching a target value",
    currentState: rootState,
    nodes,
    iterations,
    decision: {
      rootState,
      candidates: actions,
      childrenStats: actions.map((action, index) => ({
        action,
        visits: nodes[index + 1]?.visits ?? 1,
        value: nodes[index + 1]?.meanValue ?? 0,
      })),
      bestAction: actions[2]!,
    },
    transition: {
      actionTaken: actions[2]!,
      prevState: rootState,
      nextState,
      reward: 0.22,
    },
  });
}