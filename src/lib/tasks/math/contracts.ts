import { z } from "zod";

export const envStateSchema = z.object({
  expression: z.string(),
  target: z.number(),
  current: z.number(),
  tokensUsed: z.array(z.string()),
  state: z.enum(["RUNNING", "WIN", "GAME_OVER"]),
  score: z.number(),
  stepIndex: z.number().int(),
});

export const actionCandidateSchema = z.object({
  action: z.string(),
  operation: z.enum(["add", "subtract", "multiply", "divide", "concat"]),
  operand: z.number(),
  rationale: z.string().nullable(),
});

export const mctsNodeSchema = z.object({
  nodeId: z.string(),
  parentId: z.string().nullable(),
  action: actionCandidateSchema.nullable(),
  visits: z.number().int(),
  totalValue: z.number(),
  meanValue: z.number(),
  isTerminal: z.boolean(),
  state: envStateSchema,
});

export const mctsIterationSchema = z.object({
  iterationIndex: z.number().int(),
  selectedPath: z.array(z.string()),
  expandedNodeId: z.string(),
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