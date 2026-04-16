import { ARC_PALETTE, StateGrid } from "~/components/state-grid";
import { TransitionDiff } from "~/components/transition-diff";
import type { TaskConfig } from "~/lib/tasks/types";

import type { ActionCandidate, EnvState } from "./contracts";
import { getMockRun } from "./mock-data";

function ArcNodeStatePreview({
  state,
  size,
  circular = false,
}: {
  state: EnvState;
  size: number;
  circular?: boolean;
}) {
  const frame = state.frame;

  return (
    <div
      className={circular ? "overflow-hidden rounded-full" : "overflow-hidden rounded-[18px]"}
      style={{
        width: size,
        height: size,
        boxShadow:
          "inset 0 0 0 1px rgba(115,240,255,0.18), 0 0 18px rgba(115,240,255,0.12)",
      }}
    >
      <div
        className="grid h-full w-full"
        style={{
          gridTemplateColumns: `repeat(${frame.length}, minmax(0, 1fr))`,
        }}
      >
        {frame.flatMap((row, rowIndex) =>
          row.map((cell, columnIndex) => (
            <div
              key={`${rowIndex}-${columnIndex}`}
              style={{
                backgroundColor: ARC_PALETTE[cell] ?? ARC_PALETTE[0],
              }}
            />
          )),
        )}
      </div>
    </div>
  );
}

function ArcIterationPreview({ state }: { state: EnvState }) {
  const frame = state.frame;
  const cols = frame[0]?.length ?? frame.length;
  const rows = frame.length;
  const cells = frame.flatMap((row, rowIndex) =>
    row.map((cell, columnIndex) => {
      const color = ARC_PALETTE[cell] ?? ARC_PALETTE[0];
      return `<rect x="${columnIndex}" y="${rowIndex}" width="1" height="1" fill="${color}" />`;
    }),
  );
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cols} ${rows}" shape-rendering="crispEdges">${cells.join("")}</svg>`;
  const src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

  return (
    <div className="overflow-hidden rounded-[16px] border border-cyan-300/14 bg-[#0a0a0a]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`Iteration state preview`}
        className="h-full w-full object-contain"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}

const ACTION_LABELS: Record<string, string> = {
  ACTION1: "UP",
  ACTION2: "DOWN",
  ACTION3: "LEFT",
  ACTION4: "RIGHT",
  ACTION5: "INTERACT",
  ACTION6: "POINT",
  ACTION7: "UNDO",
};

function ArcActionMeta({ action }: { action: ActionCandidate }) {
  const label = ACTION_LABELS[action.action] ?? action.action;
  return (
    <span className="font-mono text-xs text-cyan-100/55">
      {action.x !== null && action.y !== null ? `${label} @ (${action.x},${action.y})` : label}
    </span>
  );
}

export const arcTask: TaskConfig<EnvState, ActionCandidate> = {
  id: "arc",
  name: "ARC-AGI 3",
  description: "ARC-AGI 3 — ls20 agent reasoning via MCTS",
  getData: getMockRun,
  StateView: StateGrid,
  TransitionView: TransitionDiff,
  NodeStatePreview: ArcNodeStatePreview,
  IterationPreview: ArcIterationPreview,
  ActionMeta: ArcActionMeta,
  formatActionKey: (action) => `${action.action}-${action.x ?? "n"}-${action.y ?? "n"}`,
};