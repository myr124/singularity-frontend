import { z } from "zod";

// Step 1: Define your task-specific state schema.
// This describes the environment state that MCTS operates on.
// For example: a game board, a text prompt, a robot configuration, etc.
export const envStateSchema = z.object({
  // Replace with your task's state fields.
  // Example for a simple numeric state:
  score: z.number(),
  stepIndex: z.number().int(),
  state: z.enum(["RUNNING", "WIN", "GAME_OVER"]),
  description: z.string(),
});

// Step 2: Define your action schema.
// All actions must have `action: string` and `rationale: string | null`.
// Add any task-specific fields your actions need.
export const actionCandidateSchema = z.object({
  action: z.string(),
  rationale: z.string().nullable(),
  // Add task-specific fields here, e.g.:
  // target: z.string().nullable(),
  // params: z.record(z.unknown()).nullable(),
});

// Step 3: Build MCTS schemas using your state and action schemas.
// The mcts/contracts module provides generic MCTS type definitions.
// Use Zod to create runtime-validated schemas.

export type EnvState = z.infer<typeof envStateSchema>;
export type ActionCandidate = z.infer<typeof actionCandidateSchema>;