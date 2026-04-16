#!/usr/bin/env node
// Stitch the sequential step artifacts from a real ls20 run into a single
// RunDataset (matching src/lib/tasks/arc/contracts.ts) and emit gzip+base64-
// encoded TS as src/lib/tasks/arc/ls20-run.ts.
//
// Usage: node scripts/build-ls20-run.mjs <run-dir>
//   where <run-dir> contains meta.json and step_000.json, step_001.json, ...
// Defaults to $LS20_RUN_DIR or ~/Downloads.

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

const runDir =
  process.argv[2] ?? process.env.LS20_RUN_DIR ?? resolve(homedir(), "Downloads");
const meta = JSON.parse(readFileSync(resolve(runDir, "meta.json"), "utf8"));
const stepFiles = readdirSync(runDir)
  .filter((f) => /^step_\d+\.json$/.test(f))
  .sort();
if (stepFiles.length === 0) {
  throw new Error(`No step_*.json files found in ${runDir}`);
}
const steps = stepFiles.map((f) =>
  JSON.parse(readFileSync(resolve(runDir, f), "utf8")),
);

const mapEnvState = (s) => (s === "NOT_FINISHED" ? "RUNNING" : s === "WIN" ? "WIN" : s === "GAME_OVER" ? "GAME_OVER" : "RUNNING");

const toEnvState = (raw) => ({
  frame: raw.frame,
  state: mapEnvState(raw.state),
  score: raw.score,
  availableActions: raw.available_actions,
  stepIndex: raw.step_index,
  guid: raw.guid ?? null,
  gameId: raw.game_id ?? null,
  cardId: raw.card_id ?? null,
});

const toAction = (a) =>
  a
    ? {
        action: a.action,
        x: a.x ?? null,
        y: a.y ?? null,
        rationale: a.rationale ?? null,
      }
    : null;

const toNode = (raw, depthOffset) => ({
  nodeId: raw.node_id,
  parentId: raw.parent_id,
  action: toAction(raw.action),
  actionSequence: (raw.action_sequence ?? []).map(toAction),
  visits: raw.visits,
  totalValue: raw.total_value,
  meanValue: raw.mean_value,
  isTerminal: raw.is_terminal ?? false,
  depth: raw.depth + depthOffset,
  state: toEnvState(raw.state),
  childrenIds: [...(raw.children_ids ?? [])],
  candidateActions: (raw.candidate_actions ?? []).map(toAction),
  candidateScores: [...(raw.candidate_scores ?? [])],
  expandedActionKeys: [...(raw.expanded_action_keys ?? [])],
});

const toIteration = (raw, offset, pathPrefix, rootRewrite) => ({
  iterationIndex: raw.iteration_index + offset,
  selectedPath: [
    ...pathPrefix,
    ...raw.selected_path.map((id) => rootRewrite[id] ?? id),
  ],
  expandedNodeId: rootRewrite[raw.expanded_node_id] ?? raw.expanded_node_id,
  candidateActions: raw.candidate_actions.map(toAction),
  simulationResultValue: raw.simulation_result_value,
  backpropUpdates: raw.backprop_updates.map((u) => ({
    nodeId: rootRewrite[u.node_id] ?? u.node_id,
    visits: u.visits,
    meanValue: u.mean_value,
  })),
});

// Build unified node list. Strategy:
//  - step_0 contributes all 4 nodes (root + 3 children).
//  - For step_N>0: step_N's root is the same conceptual state as step_{N-1}'s
//    best_child, so we drop step_N's root and reparent its children to
//    step_{N-1}'s best_child. We also copy step_N root's candidate_actions /
//    scores onto the merged parent so expansion shown at that node matches.

const nodes = [];
const nodeById = new Map();
const cumulativeRewrite = {}; // rewrites accumulated across all prior steps
let iterations = [];

for (let i = 0; i < steps.length; i++) {
  const step = steps[i];
  const rawNodes = step.nodes;
  const rawRootId = step.decision.root_node_id;
  const rawRoot = rawNodes.find((n) => n.node_id === rawRootId);

  if (i === 0) {
    for (const rn of rawNodes) {
      const node = toNode(rn, 0);
      nodes.push(node);
      nodeById.set(node.nodeId, node);
    }
  } else {
    const prevBestId = steps[i - 1].decision.best_child_node_id;
    const prevBest = nodeById.get(prevBestId);
    cumulativeRewrite[rawRootId] = prevBestId;

    // Promote step_N root's candidates onto the merged parent.
    prevBest.candidateActions = (rawRoot.candidate_actions ?? []).map(toAction);
    prevBest.candidateScores = [...(rawRoot.candidate_scores ?? [])];
    prevBest.expandedActionKeys = [...(rawRoot.expanded_action_keys ?? [])];

    for (const rn of rawNodes) {
      if (rn.node_id === rawRootId) continue;
      const node = toNode(rn, i);
      if (node.parentId === rawRootId) node.parentId = prevBestId;
      // Rewrite any children pointing back at the ex-root as well.
      node.childrenIds = node.childrenIds.map((id) =>
        id === rawRootId ? prevBestId : id,
      );
      nodes.push(node);
      nodeById.set(node.nodeId, node);
      prevBest.childrenIds.push(node.nodeId);
    }
  }

  // Iterations: renumber globally, rewrite root refs, prepend path from the
  // real root of the unified tree down to this step's entry point. The entry
  // point itself comes from the rewritten selected_path, so only ancestors
  // above it go in the prefix.
  const offset = iterations.length;
  const pathPrefix = [];
  if (i > 0) pathPrefix.push(steps[0].decision.root_node_id);
  for (let k = 1; k < i; k++) {
    pathPrefix.push(steps[k - 1].decision.best_child_node_id);
  }
  for (const raw of step.decision.iteration_logs) {
    iterations.push(toIteration(raw, offset, pathPrefix, cumulativeRewrite));
  }
}

// Decision: primary is the initial step. Normalize to contract schema.
const step0 = steps[0];
const decision = {
  rootState: toEnvState(step0.decision.root_state),
  candidates: step0.decision.candidates.map(toAction),
  childrenStats: step0.decision.children_stats.map((c) => ({
    action: toAction(c.action),
    visits: c.visits,
    value: c.mean_value,
  })),
  bestAction: toAction(step0.decision.best_action),
  rootNodeId: step0.decision.root_node_id,
  bestChildNodeId: step0.decision.best_child_node_id,
  nodeRegistry: Object.fromEntries(nodes.map((n) => [n.nodeId, n])),
  iterationLogs: iterations,
};

// The default "transition" shown on load is the actual first committed move.
const transition = {
  actionTaken: toAction(step0.decision.best_action),
  prevState: toEnvState(step0.root_state),
  nextState: toEnvState(step0.next_state),
  reward:
    (step0.decision.node_registry[step0.decision.best_child_node_id]
      ?.mean_value ?? 0) - (step0.decision.node_registry[step0.decision.root_node_id]?.mean_value ?? 0),
};

const runDataset = {
  sessionId: meta.run_stamp,
  title: "ARC-AGI 3",
  subtitle: `${meta.game_id} — agent reasoning via MCTS action search`,
  currentState: toEnvState(step0.root_state),
  nodes,
  iterations,
  decision,
  transition,
};

const compressed = gzipSync(Buffer.from(JSON.stringify(runDataset)));
const base64 = compressed.toString("base64");
console.error(
  `nodes=${nodes.length} iterations=${iterations.length} raw=${Buffer.byteLength(JSON.stringify(runDataset))} gz=${compressed.length}`,
);

const out = `// Auto-generated from a real ls20 MCTS run (scripts/build-ls20-run.mjs).
// Do not edit by hand — re-run the build script to refresh.

import { gunzipSync } from "zlib";
import type { RunDataset } from "./contracts";

const COMPRESSED = "${base64}";

export function getLs20Run(): RunDataset {
  const raw = gunzipSync(Buffer.from(COMPRESSED, "base64")).toString("utf-8");
  return JSON.parse(raw) as RunDataset;
}
`;

writeFileSync(resolve(repoRoot, "src/lib/tasks/arc/ls20-run.ts"), out);
console.error("Wrote src/lib/tasks/arc/ls20-run.ts");
