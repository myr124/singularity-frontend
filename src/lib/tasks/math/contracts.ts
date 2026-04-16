import { z } from "zod";

export const envStateSchema = z.object({
  problem: z.string(),
  working: z.string(),
  finalAnswer: z.string().nullable(),
  state: z.enum(["NOT_FINISHED", "WIN", "GAME_OVER"]),
  score: z.number(),
  stepIndex: z.number().int(),
});

export const actionCandidateSchema = z.object({
  action: z.enum(["TRANSFORM", "UNDERSTAND", "SOLVE_SUBPART", "VERIFY", "FINALIZE"]),
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
export type RunDataset = z.infer<typeof runDatasetSchema>;