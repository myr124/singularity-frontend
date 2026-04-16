import { runDatasetSchema } from "./contracts";
import type { ActionCandidate, EnvState } from "./contracts";

function s(overrides: Partial<EnvState> & { problem: string; working: string }): EnvState {
  return {
    finalAnswer: null,
    state: "NOT_FINISHED",
    score: 0,
    stepIndex: 0,
    ...overrides,
  };
}

const PROBLEM = "Solve for x: 2x + 5y = 17 − 9. Given y = 5";

const rootState: EnvState = s({
  problem: PROBLEM,
  working: "2x + 5y = 17 − 9",
  score: 0.0,
  stepIndex: 0,
});

const step1State: EnvState = s({
  problem: PROBLEM,
  working: "Simplify: 17 − 9 = 8 → 2x + 5y = 8",
  score: 0.1,
  stepIndex: 1,
});

const step2State: EnvState = s({
  problem: PROBLEM,
  working: "Substitute y = 5: 2x + 5(5) = 8 → 2x + 25 = 8",
  score: 0.2,
  stepIndex: 2,
});

const step3State: EnvState = s({
  problem: PROBLEM,
  working: "Subtract 25: 2x + 25 − 25 = 8 − 25 → 2x = −17",
  score: 0.4,
  stepIndex: 3,
});

const step4State: EnvState = s({
  problem: PROBLEM,
  working: "Divide by 2: x = −17/2",
  finalAnswer: "−17/2",
  state: "WIN",
  score: 1.0,
  stepIndex: 4,
});

const sim1Understand: EnvState = s({
  problem: PROBLEM,
  working: "Reviewing: solve 2x + 5y = 17 − 9 with y = 5",
  score: 0.1,
  stepIndex: 1,
});

const sim2Subpart: EnvState = s({
  problem: PROBLEM,
  working: "Simplify 5y term: 5(5) = 25 → 2x + 25 = 8",
  score: 0.2,
  stepIndex: 2,
});

const sim2TransformSub: EnvState = s({
  problem: PROBLEM,
  working: "Calculate 17 − 9 = 8, then substitute y",
  score: 0.4,
  stepIndex: 2,
});

const sim3Verify: EnvState = s({
  problem: PROBLEM,
  working: "Verifying: did we correctly simplify 17 − 9 = 8?",
  score: 0.0,
  stepIndex: 3,
});

const a1: ActionCandidate = { action: "TRANSFORM", rationale: "Simplify the constant term on the right side of the equation (17 − 9)." };
const a2: ActionCandidate = { action: "TRANSFORM", rationale: "Substitute the given value of y into the equation." };
const a3: ActionCandidate = { action: "TRANSFORM", rationale: "Subtract 25 from both sides of the equation 2x + 25 = 8." };
const a4: ActionCandidate = { action: "TRANSFORM", rationale: "Divide both sides of the equation 2x = −17 by 2 to solve for x." };

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
  {
    nodeId: "root-0",
    parentId: "root",
    action: a1,
    visits: 10,
    totalValue: 2.8,
    meanValue: 0.28,
    isTerminal: false,
    state: step1State,
  },
  {
    nodeId: "root-1",
    parentId: "root",
    action: { action: "UNDERSTAND", rationale: "Review the problem statement to ensure full comprehension of the goal and given information." },
    visits: 8,
    totalValue: 1.6,
    meanValue: 0.20,
    isTerminal: false,
    state: sim1Understand,
  },
  {
    nodeId: "root-0-0",
    parentId: "root-0",
    action: a2,
    visits: 7,
    totalValue: 4.2,
    meanValue: 0.60,
    isTerminal: false,
    state: step2State,
  },
  {
    nodeId: "root-0-0-0",
    parentId: "root-0-0",
    action: a3,
    visits: 6,
    totalValue: 4.56,
    meanValue: 0.76,
    isTerminal: false,
    state: step3State,
  },
  {
    nodeId: "root-0-0-0-0",
    parentId: "root-0-0-0",
    action: a4,
    visits: 5,
    totalValue: 5.0,
    meanValue: 1.0,
    isTerminal: true,
    state: step4State,
  },
  {
    nodeId: "root-0-0-1",
    parentId: "root-0-0",
    action: { action: "SOLVE_SUBPART", rationale: "Simplify the term involving y after substitution." },
    visits: 3,
    totalValue: 1.5,
    meanValue: 0.50,
    isTerminal: false,
    state: sim2Subpart,
  },
  {
    nodeId: "root-0-1",
    parentId: "root-0",
    action: { action: "SOLVE_SUBPART", rationale: "Calculate the numerical value of the expression 17 − 9 on the right side." },
    visits: 3,
    totalValue: 1.2,
    meanValue: 0.40,
    isTerminal: false,
    state: sim2TransformSub,
  },
  {
    nodeId: "root-1-0",
    parentId: "root-1",
    action: a1,
    visits: 4,
    totalValue: 1.2,
    meanValue: 0.30,
    isTerminal: false,
    state: step1State,
  },
  {
    nodeId: "root-0-0-0-1",
    parentId: "root-0-0-0",
    action: { action: "VERIFY", rationale: "Substitute x = −17/2 and y = 5 back into the original equation to confirm." },
    visits: 2,
    totalValue: 1.6,
    meanValue: 0.80,
    isTerminal: false,
    state: step3State,
  },
  {
    nodeId: "root-0-0-0-2",
    parentId: "root-0-0-0",
    action: { action: "VERIFY", rationale: "Check the arithmetic of the previous step, specifically 8 − 25 = −17." },
    visits: 2,
    totalValue: 0.3,
    meanValue: 0.15,
    isTerminal: false,
    state: sim3Verify,
  },
];

const iterations = [
  {
    iterationIndex: 1,
    selectedPath: ["root", "root-0"],
    expandedNodeId: "root-0",
    candidateActions: [a1, { action: "UNDERSTAND", rationale: "Review the problem statement to ensure full comprehension." }],
    simulationResultValue: 0.1,
    backpropUpdates: [
      { nodeId: "root-0", visits: 1, meanValue: 0.1 },
      { nodeId: "root", visits: 1, meanValue: 0.1 },
    ],
  },
  {
    iterationIndex: 2,
    selectedPath: ["root", "root-0", "root-0-0"],
    expandedNodeId: "root-0-0",
    candidateActions: [a2],
    simulationResultValue: 0.3,
    backpropUpdates: [
      { nodeId: "root-0-0", visits: 1, meanValue: 0.3 },
      { nodeId: "root-0", visits: 3, meanValue: 0.23 },
      { nodeId: "root", visits: 3, meanValue: 0.2 },
    ],
  },
  {
    iterationIndex: 3,
    selectedPath: ["root", "root-0", "root-0-0", "root-0-0-0"],
    expandedNodeId: "root-0-0-0",
    candidateActions: [a3],
    simulationResultValue: 0.5,
    backpropUpdates: [
      { nodeId: "root-0-0-0", visits: 1, meanValue: 0.5 },
      { nodeId: "root-0-0", visits: 3, meanValue: 0.37 },
      { nodeId: "root-0", visits: 5, meanValue: 0.3 },
      { nodeId: "root", visits: 8, meanValue: 0.26 },
    ],
  },
  {
    iterationIndex: 4,
    selectedPath: ["root", "root-1"],
    expandedNodeId: "root-1",
    candidateActions: [{ action: "TRANSFORM", rationale: "Simplify the right side of the equation by performing the subtraction (17 − 9)." }],
    simulationResultValue: 0.2,
    backpropUpdates: [
      { nodeId: "root-1", visits: 1, meanValue: 0.2 },
      { nodeId: "root", visits: 12, meanValue: 0.29 },
    ],
  },
  {
    iterationIndex: 5,
    selectedPath: ["root", "root-0", "root-0-0", "root-0-0-0", "root-0-0-0-0"],
    expandedNodeId: "root-0-0-0-0",
    candidateActions: [a4],
    simulationResultValue: 1.0,
    backpropUpdates: [
      { nodeId: "root-0-0-0-0", visits: 1, meanValue: 1.0 },
      { nodeId: "root-0-0-0", visits: 3, meanValue: 0.67 },
      { nodeId: "root-0-0", visits: 5, meanValue: 0.44 },
      { nodeId: "root-0", visits: 8, meanValue: 0.4 },
      { nodeId: "root", visits: 20, meanValue: 0.35 },
    ],
  },
];

export function getMockRun() {
  return runDatasetSchema.parse({
    sessionId: "math-run-01",
    title: "Arithmetic Solver",
    subtitle: "MCTS search for numeric expressions matching a target value",
    currentState: rootState,
    nodes,
    iterations,
    decision: {
      rootState,
      candidates: [a1, a2, a3, a4],
      childrenStats: [
        { action: a1, visits: 10, value: 0.28 },
        { action: a2, visits: 7, value: 0.60 },
        { action: a3, visits: 6, value: 0.76 },
        { action: a4, visits: 5, value: 1.0 },
      ],
      bestAction: a4,
    },
    transition: {
      actionTaken: a1,
      prevState: rootState,
      nextState: step1State,
      reward: 0.1,
    },
  });
}