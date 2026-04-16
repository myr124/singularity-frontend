import type { ReactNode } from "react";

export interface MCTSNode<S, A> {
  nodeId: string;
  parentId: string | null;
  action: A | null;
  actionSequence: A[];
  visits: number;
  totalValue: number;
  meanValue: number;
  isTerminal: boolean;
  depth: number;
  state: S;
  childrenIds: string[];
  candidateActions: A[];
  candidateScores: number[];
  expandedActionKeys: string[];
}

export interface BackpropUpdate {
  nodeId: string;
  visits: number;
  meanValue: number;
}

export interface MCTSIteration<A> {
  iterationIndex: number;
  selectedPath: string[];
  expandedNodeId: string | null;
  candidateActions: A[];
  simulationResultValue: number;
  backpropUpdates: BackpropUpdate[];
}

export interface ChildStats<A> {
  action: A;
  visits: number;
  value: number;
}

export interface MCTSDecision<S, A> {
  rootState: S;
  candidates: A[];
  childrenStats: ChildStats<A>[];
  bestAction: A;
  rootNodeId?: string | null;
  bestChildNodeId?: string | null;
  nodeRegistry?: Record<string, MCTSNode<S, A>>;
  iterationLogs?: MCTSIteration<A>[];
}

export interface StepResult<S, A> {
  actionTaken: A;
  prevState: S;
  nextState: S;
  reward: number;
}

export interface RunDataset<S, A> {
  sessionId: string;
  title: string;
  subtitle: string;
  currentState: S;
  nodes: MCTSNode<S, A>[];
  iterations: MCTSIteration<A>[];
  decision: MCTSDecision<S, A>;
  transition: StepResult<S, A>;
}

export interface IterationFrame<S> {
  iterationIndex: number;
  nodeId: string | null;
  state: S;
}

export type StateRenderer<S> = (props: {
  state: S;
  label?: string;
  compact?: boolean;
}) => ReactNode;

export type TransitionRenderer<S, A> = (props: {
  transition: StepResult<S, A>;
}) => ReactNode;

export type NodePreviewRenderer<S> = (props: {
  state: S;
  size: number;
  circular?: boolean;
}) => ReactNode;

export type FramePreviewRenderer<S> = (props: { state: S }) => ReactNode;

export type ActionMetaRenderer<A> = (props: { action: A }) => ReactNode;