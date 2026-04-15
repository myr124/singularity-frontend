import { z } from "zod";

export const envStateSchema = z.object({
  frame: z.array(z.array(z.number().int())),
  state: z.enum(["RUNNING", "WIN", "GAME_OVER"]),
  score: z.number(),
  availableActions: z.array(z.number().int()),
  stepIndex: z.number().int(),
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
export type MCTSNode = z.infer<typeof mctsNodeSchema>;
export type MCTSIteration = z.infer<typeof mctsIterationSchema>;
export type MCTSDecision = z.infer<typeof mctsDecisionSchema>;
export type StepResult = z.infer<typeof stepResultSchema>;
export type RunDataset = z.infer<typeof runDatasetSchema>;