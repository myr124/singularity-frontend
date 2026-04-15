import { cn } from "~/lib/utils";
import type { TaskConfig } from "~/lib/tasks/types";

import type { ActionCandidate, EnvState } from "./contracts";
import { getMockRun } from "./mock-data";

const LETTER_COLORS: Record<string, string> = {
  S: "#36d4ff",
  T: "#4be1ff",
  O: "#6df0ff",
  R: "#2b7fff",
  M: "#1c91a7",
  A: "#2677ff",
  C: "#cfe8ff",
  I: "#184b63",
  L: "#f4ff7a",
  E: "#73f0ff",
  D: "#f4ff7a",
};

function WordPuzzleStateView({ state, label, compact }: { state: EnvState; label?: string; compact?: boolean }) {
  const board = state.board;
  const cols = board[0]?.length ?? 0;

  return (
    <div className={cn("rounded-[28px] border border-cyan-300/14 bg-white/[0.03] p-3 min-w-0", compact && "p-2")}>
      {label ? (
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-100/60">{label}</p>
          <div className="shrink-0 rounded-full border border-cyan-300/20 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.14em] text-cyan-100/70">
            {state.state}
          </div>
        </div>
      ) : null}
      <div
        className="grid gap-[2px] rounded-[16px] border border-cyan-300/14 bg-[#030b13] p-2"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {board.flatMap((row, ri) =>
          row.map((cell, ci) => (
            <div
              key={`${ri}-${ci}`}
              className={cn(
                "flex items-center justify-center rounded-sm text-xs font-bold",
                cell ? "bg-cyan-300/15 text-white" : "bg-cyan-100/5 text-cyan-100/20",
              )}
              style={cell ? { backgroundColor: `${LETTER_COLORS[cell] ?? "#36d4ff"}22`, color: LETTER_COLORS[cell] ?? "#36d4ff" } : undefined}
            >
              {cell || "·"}
            </div>
          )),
        )}
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-cyan-100/60">
        <span>Score {state.score.toFixed(2)}</span>
        <span>Step {state.stepIndex}</span>
      </div>
    </div>
  );
}

function WordPuzzleTransition({ transition }: { transition: { prevState: EnvState; nextState: EnvState; reward: number; actionTaken: ActionCandidate } }) {
  const prevBoard = transition.prevState.board;
  const nextBoard = transition.nextState.board;
  let changed = 0;
  for (let r = 0; r < prevBoard.length; r++) {
    for (let c = 0; c < prevBoard[r]!.length; c++) {
      if (prevBoard[r]![c] !== nextBoard[r]![c]) changed++;
    }
  }

  return (
    <section className="subpanel rounded-[28px] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-cyan-100/55">Transition</p>
          <h2 className="mt-1 text-xl font-semibold text-white">
            Placed <span className="font-mono text-cyan-200">{transition.actionTaken.letter}</span> at ({transition.actionTaken.position[0]},{transition.actionTaken.position[1]})
          </h2>
        </div>
        <div className="font-mono text-xs uppercase tracking-[0.26em] text-cyan-100/65">reward +{transition.reward.toFixed(2)}</div>
      </div>
      <div className="mt-4 grid gap-3 grid-cols-2 min-w-0">
        <WordPuzzleStateView state={transition.prevState} label="Before" compact />
        <WordPuzzleStateView state={transition.nextState} label="After" compact />
      </div>
      <p className="mt-3 text-sm text-cyan-50/76">{changed} cell{changed !== 1 ? "s" : ""} changed in this step.</p>
    </section>
  );
}

function WordPuzzleNodePreview({ state, size, circular = false }: { state: EnvState; size: number; circular?: boolean }) {
  const board = state.board;
  const rows = board.length;
  const cols = board[0]?.length ?? rows;
  const cellSize = size / Math.max(rows, cols);

  return (
    <div
      className={circular ? "overflow-hidden rounded-full" : "overflow-hidden rounded-[12px]"}
      style={{
        width: size,
        height: size,
        boxShadow: "inset 0 0 0 1px rgba(115,240,255,0.18), 0 0 18px rgba(115,240,255,0.12)",
        background: "#030b13",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`, gap: "1px", padding: "2px" }}>
        {board.flatMap((row, ri) =>
          row.map((cell, ci) => (
            <div
              key={`${ri}-${ci}`}
              style={{
                width: cellSize - 2,
                height: cellSize - 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: Math.max(cellSize * 0.5, 5),
                fontWeight: 700,
                fontFamily: "monospace",
                color: cell ? (LETTER_COLORS[cell] ?? "#36d4ff") : "rgba(115,240,255,0.15)",
                backgroundColor: cell ? `${LETTER_COLORS[cell] ?? "#36d4ff"}18` : "transparent",
                borderRadius: "2px",
              }}
            >
              {cell || ""}
            </div>
          )),
        )}
      </div>
    </div>
  );
}

function WordPuzzleIterationPreview({ state }: { state: EnvState }) {
  const board = state.board;
  const cols = board[0]?.length ?? 5;

  return (
    <div className="aspect-video overflow-hidden rounded-[16px] border border-cyan-300/14 bg-[#030b13] p-2">
      <div className="grid gap-[1px]" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {board.flatMap((row, ri) =>
          row.map((cell, ci) => (
            <div
              key={`${ri}-${ci}`}
              className="flex items-center justify-center rounded-sm py-0.5 text-[8px] font-bold"
              style={cell ? { backgroundColor: `${LETTER_COLORS[cell] ?? "#36d4ff"}22`, color: LETTER_COLORS[cell] ?? "#36d4ff" } : undefined}
            >
              {cell || ""}
            </div>
          )),
        )}
      </div>
    </div>
  );
}

function WordPuzzleActionMeta({ action }: { action: ActionCandidate }) {
  return (
    <span className="font-mono text-xs text-cyan-100/55">
      {action.letter} at ({action.position[0]},{action.position[1]})
    </span>
  );
}

export const wordPuzzleTask: TaskConfig<EnvState, ActionCandidate> = {
  id: "word-puzzle",
  name: "Word Puzzle",
  description: "Crossword-style letter placement via MCTS search",
  getData: getMockRun,
  StateView: WordPuzzleStateView,
  TransitionView: WordPuzzleTransition,
  NodeStatePreview: WordPuzzleNodePreview,
  IterationPreview: WordPuzzleIterationPreview,
  ActionMeta: WordPuzzleActionMeta,
  formatActionKey: (action) => `${action.action}-${action.letter}-${action.position[0]}-${action.position[1]}`,
};