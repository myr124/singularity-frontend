import { runDatasetSchema } from "./contracts";
import type { ActionCandidate, EnvState } from "./contracts";

type Board = string[][];

const ANSWER: Board = [
  ["S", "T", "O", "R", "M"],
  ["T", "", "", "", "A"],
  ["A", "", "C", "", "I"],
  ["R", "", "L", "", "L"],
  ["S", "E", "E", "D", "S"],
];

function makeBoard(template: Board, filledRatio: number): Board {
  return template.map((row) =>
    row.map((cell) => {
      if (cell === "") return "";
      return Math.random() < filledRatio ? cell : "";
    }),
  );
}

function makeState(overrides: Partial<EnvState> & { board: Board }): EnvState {
  return {
    state: "RUNNING",
    score: 0,
    stepIndex: 0,
    cursor: [0, 0],
    clue: "Find the hidden words in the grid",
    ...overrides,
  };
}

function fillCell(board: Board, letter: string, row: number, col: number): Board {
  return board.map((r, ri) =>
    r.map((c, ci) => {
      if (ri === row && ci === col) return letter;
      return c;
    }),
  );
}

const rootBoard: Board = makeBoard(ANSWER, 0.2);
const rootState: EnvState = makeState({
  board: rootBoard,
  score: 0.12,
  stepIndex: 0,
  clue: "Find the hidden words in the grid",
});

const actions: ActionCandidate[] = [
  { action: "PLACE_S", letter: "S", position: [0, 0], rationale: "Top-left corner — likely starts a vertical or horizontal word." },
  { action: "PLACE_O", letter: "O", position: [0, 2], rationale: "Center column — common vowel linking across and down." },
  { action: "PLACE_R", letter: "R", position: [0, 3], rationale: "Near the end of the top row — high constraint value." },
  { action: "PLACE_M", letter: "M", position: [0, 4], rationale: "Terminal letter — completes the top-row word if confirmed." },
];

const child0Board = fillCell(fillCell(rootBoard, "S", 0, 0), "T", 0, 1);
const child1Board = fillCell(fillCell(rootBoard, "O", 0, 2), "A", 1, 4);
const child2Board = fillCell(fillCell(rootBoard, "R", 0, 3), "L", 2, 2);
const child3Board = fillCell(fillCell(rootBoard, "M", 0, 4), "S", 4, 4);

const childStates: EnvState[] = [
  makeState({ board: child0Board, score: 0.32, stepIndex: 1, cursor: [0, 2] }),
  makeState({ board: child1Board, score: 0.45, stepIndex: 1, cursor: [2, 2] }),
  makeState({ board: child2Board, score: 0.28, stepIndex: 1, cursor: [2, 2] }),
  makeState({ board: child3Board, score: 0.21, stepIndex: 1, cursor: [4, 2] }),
];

const deep1aBoard = fillCell(fillCell(fillCell(child1Board, "R", 0, 3), "M", 0, 4), "I", 2, 4);
const deep1bBoard = fillCell(fillCell(child1Board, "C", 2, 2), "L", 2, 3);
const deep1cBoard = fillCell(fillCell(child1Board, "S", 4, 0), "E", 4, 1);
const deep0aBoard = fillCell(fillCell(child0Board, "O", 0, 2), "R", 0, 3);
const deep2aBoard = fillCell(fillCell(child2Board, "C", 2, 2), "L", 2, 3);
const deep3aBoard = fillCell(fillCell(child3Board, "E", 4, 1), "E", 4, 2);
const deep1a1Board = fillCell(fillCell(deep1aBoard, "C", 2, 2), "L", 2, 3);
const deep1a2Board = fillCell(deep1a1Board, "S", 4, 0);

const deepStates: Record<string, EnvState> = {
  "root-1-a": makeState({ board: deep1aBoard, score: 0.60, stepIndex: 2, cursor: [0, 4] }),
  "root-1-b": makeState({ board: deep1bBoard, score: 0.46, stepIndex: 2, cursor: [2, 3] }),
  "root-1-c": makeState({ board: deep1cBoard, score: 0.40, stepIndex: 2, cursor: [4, 1] }),
  "root-0-a": makeState({ board: deep0aBoard, score: 0.41, stepIndex: 2, cursor: [0, 3] }),
  "root-2-a": makeState({ board: deep2aBoard, score: 0.30, stepIndex: 2, cursor: [2, 3] }),
  "root-3-a": makeState({ board: deep3aBoard, score: 0.24, stepIndex: 2, cursor: [4, 2] }),
  "root-1-a-1": makeState({ board: deep1a1Board, score: 0.68, stepIndex: 3, cursor: [2, 3] }),
  "root-1-a-2": makeState({ board: fillCell(deep1aBoard, "L", 2, 3), score: 0.53, stepIndex: 3, cursor: [3, 3] }),
  "root-1-a-1-1": makeState({ board: deep1a2Board, score: 0.78, stepIndex: 4, cursor: [4, 3] }),
};

type NodeData = {
  nodeId: string;
  parentId: string | null;
  action: ActionCandidate | null;
  actionSequence: ActionCandidate[];
  visits: number;
  totalValue: number;
  meanValue: number;
  isTerminal: boolean;
  depth: number;
  state: EnvState;
  childrenIds: string[];
  candidateActions: ActionCandidate[];
  candidateScores: number[];
  expandedActionKeys: string[];
};

const nodes: NodeData[] = [
  {
    nodeId: "root",
    parentId: null,
    action: null,
    actionSequence: [],
    visits: 38,
    totalValue: 13.0,
    meanValue: 0.34,
    isTerminal: false,
    depth: 0,
    state: rootState,
    childrenIds: actions.map((_, i) => `root-${i}`),
    candidateActions: actions,
    candidateScores: [0.28, 0.50, 0.27, 0.20],
    expandedActionKeys: actions.map((a, i) => `${a.action}-${i}`),
  },
  ...actions.map((action, index) => ({
    nodeId: `root-${index}`,
    parentId: "root",
    action,
    actionSequence: [action],
    visits: [9, 14, 8, 7][index]!,
    totalValue: [2.52, 7.0, 2.16, 1.4][index]!,
    meanValue: [0.28, 0.50, 0.27, 0.20][index]!,
    isTerminal: false,
    depth: 1,
    state: childStates[index]!,
    childrenIds: [] as string[],
    candidateActions: [] as ActionCandidate[],
    candidateScores: [] as number[],
    expandedActionKeys: [] as string[],
  })),
  {
    nodeId: "root-1-a",
    parentId: "root-1",
    action: { action: "PLACE_R", letter: "R", position: [0, 3] as [number, number], rationale: "Extending the top row — completes S-T-O-R corridor." },
    actionSequence: [actions[1]!, { action: "PLACE_R", letter: "R", position: [0, 3] as [number, number], rationale: "Extending top row." }],
    visits: 7,
    totalValue: 4.2,
    meanValue: 0.60,
    isTerminal: false,
    depth: 2,
    state: deepStates["root-1-a"]!,
    childrenIds: ["root-1-a-1", "root-1-a-2"],
    candidateActions: [
      { action: "PLACE_C", letter: "C", position: [2, 2] as [number, number], rationale: "Intersection point." },
      { action: "PLACE_L", letter: "L", position: [2, 3] as [number, number], rationale: "Extends second-row word." },
    ],
    candidateScores: [0.68, 0.53],
    expandedActionKeys: ["PLACE_C-0", "PLACE_L-1"],
  },
  {
    nodeId: "root-1-b",
    parentId: "root-1",
    action: { action: "PLACE_C", letter: "C", position: [2, 2] as [number, number], rationale: "Building the center column — opens multiple cross-checks." },
    actionSequence: [actions[1]!, { action: "PLACE_C", letter: "C", position: [2, 2] as [number, number], rationale: "Center column." }],
    visits: 4,
    totalValue: 1.84,
    meanValue: 0.46,
    isTerminal: false,
    depth: 2,
    state: deepStates["root-1-b"]!,
    childrenIds: ["root-1-b-1"],
    candidateActions: [
      { action: "PLACE_S", letter: "S", position: [4, 0] as [number, number], rationale: "Bottom-left anchor." },
    ],
    candidateScores: [0.71],
    expandedActionKeys: ["PLACE_S-0"],
  },
  {
    nodeId: "root-1-c",
    parentId: "root-1",
    action: { action: "PLACE_S", letter: "S", position: [4, 0] as [number, number], rationale: "Left column anchor — starts a bottom-row word." },
    actionSequence: [actions[1]!, { action: "PLACE_S", letter: "S", position: [4, 0] as [number, number], rationale: "Left anchor." }],
    visits: 3,
    totalValue: 1.2,
    meanValue: 0.40,
    isTerminal: false,
    depth: 2,
    state: deepStates["root-1-c"]!,
    childrenIds: [],
    candidateActions: [],
    candidateScores: [],
    expandedActionKeys: [],
  },
  {
    nodeId: "root-0-a",
    parentId: "root-0",
    action: { action: "PLACE_O", letter: "O", position: [0, 2] as [number, number], rationale: "Core vowel placement — unlocks both horizontal and vertical words." },
    actionSequence: [actions[0]!, { action: "PLACE_O", letter: "O", position: [0, 2] as [number, number], rationale: "Core vowel." }],
    visits: 6,
    totalValue: 2.46,
    meanValue: 0.41,
    isTerminal: false,
    depth: 2,
    state: deepStates["root-0-a"]!,
    childrenIds: ["root-0-a-1"],
    candidateActions: [
      { action: "PLACE_R", letter: "R", position: [0, 3] as [number, number], rationale: "Extends the top row." },
    ],
    candidateScores: [0.41],
    expandedActionKeys: ["PLACE_R-0"],
  },
  {
    nodeId: "root-2-a",
    parentId: "root-2",
    action: { action: "PLACE_C", letter: "C", position: [2, 2] as [number, number], rationale: "Center column strike — creates intersecting constraints." },
    actionSequence: [actions[2]!, { action: "PLACE_C", letter: "C", position: [2, 2] as [number, number], rationale: "Center column." }],
    visits: 4,
    totalValue: 1.2,
    meanValue: 0.30,
    isTerminal: false,
    depth: 2,
    state: deepStates["root-2-a"]!,
    childrenIds: ["root-2-a-1", "root-2-a-2"],
    candidateActions: [
      { action: "PLACE_R", letter: "R", position: [0, 3] as [number, number], rationale: "Improves symmetry." },
      { action: "PLACE_O", letter: "O", position: [0, 2] as [number, number], rationale: "Alternative path." },
    ],
    candidateScores: [0.69, 0.67],
    expandedActionKeys: ["PLACE_R-0", "PLACE_O-1"],
  },
  {
    nodeId: "root-3-a",
    parentId: "root-3",
    action: { action: "PLACE_E", letter: "E", position: [4, 1] as [number, number], rationale: "Extending the bottom row toward SEEDS." },
    actionSequence: [actions[3]!, { action: "PLACE_E", letter: "E", position: [4, 1] as [number, number], rationale: "Bottom row." }],
    visits: 4,
    totalValue: 0.96,
    meanValue: 0.24,
    isTerminal: false,
    depth: 2,
    state: deepStates["root-3-a"]!,
    childrenIds: [],
    candidateActions: [],
    candidateScores: [],
    expandedActionKeys: [],
  },
  {
    nodeId: "root-1-a-1",
    parentId: "root-1-a",
    action: { action: "PLACE_C", letter: "C", position: [2, 2] as [number, number], rationale: "Completes intersection — high-constraint placement." },
    actionSequence: [actions[1]!, { action: "PLACE_R", letter: "R", position: [0, 3] as [number, number], rationale: "" }, { action: "PLACE_C", letter: "C", position: [2, 2] as [number, number], rationale: "Intersection." }],
    visits: 4,
    totalValue: 2.72,
    meanValue: 0.68,
    isTerminal: false,
    depth: 3,
    state: deepStates["root-1-a-1"]!,
    childrenIds: ["root-1-a-1-1"],
    candidateActions: [
      { action: "PLACE_S", letter: "S", position: [4, 0] as [number, number], rationale: "Bottom-left anchor." },
    ],
    candidateScores: [0.78],
    expandedActionKeys: ["PLACE_S-0"],
  },
  {
    nodeId: "root-1-a-2",
    parentId: "root-1-a",
    action: { action: "PLACE_L", letter: "L", position: [2, 3] as [number, number], rationale: "Extends the second-row word — partial but promising." },
    actionSequence: [actions[1]!, { action: "PLACE_R", letter: "R", position: [0, 3] as [number, number], rationale: "" }, { action: "PLACE_L", letter: "L", position: [2, 3] as [number, number], rationale: "Extension." }],
    visits: 3,
    totalValue: 1.59,
    meanValue: 0.53,
    isTerminal: false,
    depth: 3,
    state: deepStates["root-1-a-2"]!,
    childrenIds: [],
    candidateActions: [],
    candidateScores: [],
    expandedActionKeys: [],
  },
  {
    nodeId: "root-1-a-1-1",
    parentId: "root-1-a-1",
    action: { action: "PLACE_S", letter: "S", position: [4, 0] as [number, number], rationale: "Anchors the bottom-left — sets up SEEDS completion." },
    actionSequence: [actions[1]!, { action: "PLACE_R", letter: "R", position: [0, 3] as [number, number], rationale: "" }, { action: "PLACE_C", letter: "C", position: [2, 2] as [number, number], rationale: "" }, { action: "PLACE_S", letter: "S", position: [4, 0] as [number, number], rationale: "Anchor." }],
    visits: 3,
    totalValue: 2.34,
    meanValue: 0.78,
    isTerminal: false,
    depth: 4,
    state: deepStates["root-1-a-1-1"]!,
    childrenIds: [],
    candidateActions: [],
    candidateScores: [],
    expandedActionKeys: [],
  },
];

const iterations = [
  {
    iterationIndex: 1,
    selectedPath: ["root", "root-1"],
    expandedNodeId: "root-1",
    candidateActions: actions,
    simulationResultValue: 0.50,
    backpropUpdates: [
      { nodeId: "root-1", visits: 1, meanValue: 0.50 },
      { nodeId: "root", visits: 1, meanValue: 0.50 },
    ],
  },
  {
    iterationIndex: 2,
    selectedPath: ["root", "root-1", "root-1-a"],
    expandedNodeId: "root-1-a",
    candidateActions: [
      { action: "PLACE_R", letter: "R", position: [0, 3] as [number, number], rationale: "Extends S-T-O row toward full word." },
      { action: "PLACE_M", letter: "M", position: [0, 4] as [number, number], rationale: "Bold endpoint guess — could complete STORM." },
    ],
    simulationResultValue: 0.60,
    backpropUpdates: [
      { nodeId: "root-1-a", visits: 3, meanValue: 0.60 },
      { nodeId: "root-1", visits: 7, meanValue: 0.52 },
      { nodeId: "root", visits: 14, meanValue: 0.38 },
    ],
  },
  {
    iterationIndex: 3,
    selectedPath: ["root", "root-0", "root-0-a"],
    expandedNodeId: "root-0-a",
    candidateActions: [
      { action: "PLACE_O", letter: "O", position: [0, 2] as [number, number], rationale: "Central vowel — high information gain." },
    ],
    simulationResultValue: 0.41,
    backpropUpdates: [
      { nodeId: "root-0-a", visits: 3, meanValue: 0.41 },
      { nodeId: "root-0", visits: 6, meanValue: 0.35 },
      { nodeId: "root", visits: 21, meanValue: 0.38 },
    ],
  },
  {
    iterationIndex: 4,
    selectedPath: ["root", "root-1", "root-1-a", "root-1-a-1"],
    expandedNodeId: "root-1-a-1",
    candidateActions: [
      { action: "PLACE_C", letter: "C", position: [2, 2] as [number, number], rationale: "Intersection point — constrains multiple words." },
      { action: "PLACE_S", letter: "S", position: [4, 0] as [number, number], rationale: "Bottom-left anchor for down word." },
    ],
    simulationResultValue: 0.68,
    backpropUpdates: [
      { nodeId: "root-1-a-1", visits: 2, meanValue: 0.68 },
      { nodeId: "root-1-a", visits: 5, meanValue: 0.61 },
      { nodeId: "root-1", visits: 11, meanValue: 0.51 },
      { nodeId: "root", visits: 28, meanValue: 0.40 },
    ],
  },
  {
    iterationIndex: 5,
    selectedPath: ["root", "root-1", "root-1-a", "root-1-a-1", "root-1-a-1-1"],
    expandedNodeId: "root-1-a-1-1",
    candidateActions: [
      { action: "PLACE_S", letter: "S", position: [4, 0] as [number, number], rationale: "Confirms bottom-left anchor — sets up SEEDS." },
    ],
    simulationResultValue: 0.78,
    backpropUpdates: [
      { nodeId: "root-1-a-1-1", visits: 3, meanValue: 0.78 },
      { nodeId: "root-1-a-1", visits: 4, meanValue: 0.72 },
      { nodeId: "root-1-a", visits: 7, meanValue: 0.64 },
      { nodeId: "root-1", visits: 14, meanValue: 0.54 },
      { nodeId: "root", visits: 38, meanValue: 0.42 },
    ],
  },
];

const nodeRegistry: Record<string, NodeData> = {};
for (const node of nodes) {
  nodeRegistry[node.nodeId] = node;
}

export function getMockRun() {
  const nextState = makeState({
    board: fillCell(fillCell(fillCell(deep1a2Board, "E", 4, 2), "D", 4, 3), "S", 4, 4),
    score: 0.78,
    stepIndex: 5,
    clue: "Find the hidden words in the grid",
  });

  return runDatasetSchema.parse({
    sessionId: "word-puzzle-run-01",
    title: "Word Puzzle Solver",
    subtitle: "MCTS letter-placement search for crossword grids",
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
      rootNodeId: "root",
      bestChildNodeId: "root-1",
      nodeRegistry,
      iterationLogs: iterations,
    },
    transition: {
      actionTaken: actions[1]!,
      prevState: rootState,
      nextState,
      reward: 0.33,
    },
  });
}