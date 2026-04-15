import { StateGrid } from "~/components/state-grid";
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
  const palette = [
    "#071321",
    "#184b63",
    "#1c91a7",
    "#36d4ff",
    "#6df0ff",
    "#2677ff",
    "#cfe8ff",
    "#f4ff7a",
  ];
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
                backgroundColor: palette[cell] ?? palette[0],
              }}
            />
          )),
        )}
      </div>
    </div>
  );
}

function ArcIterationPreview({ state }: { state: EnvState }) {
  const palette = [
    "#071321",
    "#184b63",
    "#1c91a7",
    "#36d4ff",
    "#6df0ff",
    "#2677ff",
    "#cfe8ff",
    "#f4ff7a",
  ];
  const frame = state.frame;
  const cells = frame.flatMap((row, rowIndex) =>
    row.map((cell, columnIndex) => {
      const color = palette[cell] ?? palette[0];
      return `<rect x="${columnIndex}" y="${rowIndex}" width="1" height="1" fill="${color}" />`;
    }),
  );
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${frame.length} ${frame.length}" shape-rendering="crispEdges">${cells.join("")}</svg>`;
  const src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

  return (
    <div className="aspect-video overflow-hidden rounded-[16px] border border-cyan-300/14 bg-[#030b13]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`Iteration state preview`}
        className="h-full w-full object-cover"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}

function ArcActionMeta({ action }: { action: ActionCandidate }) {
  return (
    <span className="font-mono text-xs text-cyan-100/55">
      {action.x !== null && action.y !== null ? `${action.x},${action.y}` : "global"}
    </span>
  );
}

export const arcTask: TaskConfig<EnvState, ActionCandidate> = {
  id: "arc",
  name: "ARC-AGI",
  description: "Abstraction and Reasoning Corpus action selection via MCTS",
  getData: getMockRun,
  StateView: StateGrid,
  TransitionView: TransitionDiff,
  NodeStatePreview: ArcNodeStatePreview,
  IterationPreview: ArcIterationPreview,
  ActionMeta: ArcActionMeta,
  formatActionKey: (action) => `${action.action}-${action.x ?? "n"}-${action.y ?? "n"}`,
};