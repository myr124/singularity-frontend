import type { MCTSNode, MCTSIteration, RunDataset } from "~/lib/mcts/types";

import type { ActionCandidate, EnvState } from "./contracts";

// Step 4: Build mock data for your task.
// This is where you create the MCTS tree data that the visualizer will render.
// Replace the placeholder data with your task's realistic data.

const rootState: EnvState = {
  score: 0.0,
  stepIndex: 0,
  state: "RUNNING",
  description: "Initial state",
};

const actions: ActionCandidate[] = [
  { action: "SEARCH_LEFT", rationale: "Explore the left branch." },
  { action: "SEARCH_RIGHT", rationale: "Explore the right branch." },
  { action: "EVALUATE", rationale: "Score the current position." },
];

const childStates: EnvState[] = [
  { ...rootState, score: 0.35, stepIndex: 1, description: "After SEARCH_LEFT" },
  { ...rootState, score: 0.52, stepIndex: 1, description: "After SEARCH_RIGHT" },
  { ...rootState, score: 0.28, stepIndex: 1, description: "After EVALUATE" },
];

const nodes: MCTSNode<EnvState, ActionCandidate>[] = [
  {
    nodeId: "root",
    parentId: null,
    action: null,
    visits: 10,
    totalValue: 4.5,
    meanValue: 0.45,
    isTerminal: false,
    state: rootState,
  },
  {
    nodeId: "root-0",
    parentId: "root",
    action: actions[0]!,
    visits: 4,
    totalValue: 1.4,
    meanValue: 0.35,
    isTerminal: false,
    state: childStates[0]!,
  },
  {
    nodeId: "root-1",
    parentId: "root",
    action: actions[1]!,
    visits: 4,
    totalValue: 2.08,
    meanValue: 0.52,
    isTerminal: false,
    state: childStates[1]!,
  },
  {
    nodeId: "root-2",
    parentId: "root",
    action: actions[2]!,
    visits: 2,
    totalValue: 0.56,
    meanValue: 0.28,
    isTerminal: false,
    state: childStates[2]!,
  },
];

const iterations: MCTSIteration<ActionCandidate>[] = [
  {
    iterationIndex: 1,
    selectedPath: ["root", "root-1"],
    expandedNodeId: "root-1",
    candidateActions: actions,
    simulationResultValue: 0.52,
    backpropUpdates: [
      { nodeId: "root-1", visits: 1, meanValue: 0.52 },
      { nodeId: "root", visits: 1, meanValue: 0.52 },
    ],
  },
  {
    iterationIndex: 2,
    selectedPath: ["root", "root-0"],
    expandedNodeId: "root-0",
    candidateActions: actions.slice(0, 2),
    simulationResultValue: 0.35,
    backpropUpdates: [
      { nodeId: "root-0", visits: 2, meanValue: 0.35 },
      { nodeId: "root", visits: 2, meanValue: 0.44 },
    ],
  },
  {
    iterationIndex: 3,
    selectedPath: ["root", "root-1"],
    expandedNodeId: "root-1",
    candidateActions: actions.slice(0, 2),
    simulationResultValue: 0.52,
    backpropUpdates: [
      { nodeId: "root-1", visits: 2, meanValue: 0.52 },
      { nodeId: "root", visits: 3, meanValue: 0.46 },
    ],
  },
];

export function getMockRun(): RunDataset<EnvState, ActionCandidate> {
  return {
    sessionId: "template-run-01",
    title: "Template Task",
    subtitle: "Starter MCTS visualization for a new task",
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
      bestAction: actions[1]!,
    },
    transition: {
      actionTaken: actions[1]!,
      prevState: rootState,
      nextState: childStates[1]!,
      reward: 0.52,
    },
  };
}