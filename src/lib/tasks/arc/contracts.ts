import { z } from "zod";

export const envStateSchema = z.object({
  frame: z.array(z.array(z.number().int())),
  state: z.enum(["RUNNING", "WIN", "GAME_OVER"]),
  score: z.number(),
  availableActions: z.array(z.number().int()),
  stepIndex: z.number().int(),
  guid: z.string().nullable().optional(),
  gameId: z.string().nullable().optional(),
  cardId: z.string().nullable().optional(),
});

export const actionCandidateSchema = z.object({
  action: z.string(),
  x: z.number().int().nullable(),
  y: z.number().int().nullable(),
  rationale: z.string().nullable(),
});

export const mctsNodeSchema = z.object({
  nodeId: z.string(),
  parentId: z.string().nullable(),
  action: actionCandidateSchema.nullable(),
  actionSequence: z.array(actionCandidateSchema),
  visits: z.number().int(),
  totalValue: z.number(),
  meanValue: z.number(),
  isTerminal: z.boolean(),
  depth: z.number().int(),
  state: envStateSchema,
  childrenIds: z.array(z.string()),
  candidateActions: z.array(actionCandidateSchema),
  candidateScores: z.array(z.number()),
  expandedActionKeys: z.array(z.string()),
});

export const mctsIterationSchema = z.object({
  iterationIndex: z.number().int(),
  selectedPath: z.array(z.string()),
  expandedNodeId: z.string().nullable(),
  candidateActions: z.array(actionCandidateSchema),
  simulationResultValue: z.number(),
  backpropUpdates: z.array(
    z.object({
      nodeId: z.string(),
      visits: z.number().int(),
      meanValue: z.number(),
    }),
  ),
});

export const mctsDecisionSchema = z.object({
  rootState: envStateSchema,
  candidates: z.array(actionCandidateSchema),
  childrenStats: z.array(
    z.object({
      action: actionCandidateSchema,
      visits: z.number().int(),
      value: z.number(),
    }),
  ),
  bestAction: actionCandidateSchema,
  rootNodeId: z.string().nullable().optional(),
  bestChildNodeId: z.string().nullable().optional(),
  nodeRegistry: z.record(z.string(), mctsNodeSchema).optional(),
  iterationLogs: z.array(mctsIterationSchema).optional(),
});

export const stepResultSchema = z.object({
  actionTaken: actionCandidateSchema,
  prevState: envStateSchema,
  nextState: envStateSchema,
  reward: z.number(),
});

export const componentInfoSchema = z.object({
  componentId: z.string(),
  value: z.number().int(),
  size: z.number().int(),
  cells: z.array(z.tuple([z.number().int(), z.number().int()])),
  bbox: z.tuple([z.number().int(), z.number().int(), z.number().int(), z.number().int()]),
  centroid: z.tuple([z.number(), z.number()]),
  touchesBorder: z.boolean(),
  width: z.number().int(),
  height: z.number().int(),
});

export const frameAbstractionSchema = z.object({
  height: z.number().int(),
  width: z.number().int(),
  valueCounts: z.record(z.string(), z.number().int()),
  numComponents: z.number().int(),
  components: z.array(componentInfoSchema),
});

export const transitionAbstractionSchema = z.object({
  changedCells: z.number().int(),
  changedRatio: z.number(),
  changedPositions: z.array(z.tuple([z.number().int(), z.number().int()])),
  changedBbox: z.tuple([z.number().int(), z.number().int(), z.number().int(), z.number().int()]).nullable(),
  changedValuePairs: z.record(z.string(), z.number().int()),
  borderChangedCells: z.number().int(),
  borderChangedRatio: z.number(),
  significantChange: z.boolean(),
});

export const runDatasetSchema = z.object({
  sessionId: z.string(),
  title: z.string(),
  subtitle: z.string(),
  currentState: envStateSchema,
  nodes: z.array(mctsNodeSchema),
  iterations: z.array(mctsIterationSchema),
  decision: mctsDecisionSchema,
  transition: stepResultSchema,
});

export type EnvState = z.infer<typeof envStateSchema>;
export type ActionCandidate = z.infer<typeof actionCandidateSchema>;
export type MCTSNode = z.infer<typeof mctsNodeSchema>;
export type MCTSIteration = z.infer<typeof mctsIterationSchema>;
export type MCTSDecision = z.infer<typeof mctsDecisionSchema>;
export type StepResult = z.infer<typeof stepResultSchema>;
export type RunDataset = z.infer<typeof runDatasetSchema>;
export type ComponentInfo = z.infer<typeof componentInfoSchema>;
export type FrameAbstraction = z.infer<typeof frameAbstractionSchema>;
export type TransitionAbstraction = z.infer<typeof transitionAbstractionSchema>;