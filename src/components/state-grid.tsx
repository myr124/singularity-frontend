import type { EnvState } from "~/lib/contracts";

export const ARC_PALETTE = [
  "#ffffff", // 0 — player cross (white)
  "#e6e6e6", // 1 — player cross accent
  "#f93c31", // 2 — red (generic)
  "#878787", // 3 — floor (medium gray)
  "#0a0a0a", // 4 — background (near black)
  "#2b2b2b", // 5 — wall / indicator interior (dark gray)
  "#4fcc30", // 6 — green (generic)
  "#ff851b", // 7 — orange (generic)
  "#f93c31", // 8 — goal squares (red)
  "#1e93ff", // 9 — blocks / indicator shape (blue)
  "#870c25", // 10 — maroon (generic)
  "#ffdc00", // 11 — progress bar (yellow)
  "#f2841f", // 12 — block (orange)
  "#e53aa3", // 13 — pink (generic)
  "#a356dc", // 14 — purple (generic)
  "#7fdbff", // 15 — cyan (generic)
];

type StateGridProps = {
  state: EnvState;
  label?: string;
  compact?: boolean;
};

export function StateGrid({ state, label = "State", compact = false }: StateGridProps) {
  const frame = state.frame;
  const rows = frame.length;
  const cols = frame[0]?.length ?? rows;

  return (
    <div className="rounded-[28px] border border-cyan-300/14 bg-white/[0.03] p-3 min-w-0">
      <div className="mb-3 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-100/60">{label}</p>
          <div className="shrink-0 rounded-full border border-cyan-300/20 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.14em] text-cyan-100/70">
            {state.state}
          </div>
        </div>
        <h3 className="mt-1 truncate text-xs font-medium text-white/90">Step {state.stepIndex}</h3>
      </div>
      <div
        className="overflow-hidden rounded-[22px] border border-cyan-300/14 bg-[#0a0a0a]"
        style={{ aspectRatio: `${cols}/${rows}`, display: "grid", gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {frame.flatMap((row, rowIndex) =>
          row.map((cell, columnIndex) => (
            <div
              key={`${rowIndex}-${columnIndex}`}
              style={{
                backgroundColor: ARC_PALETTE[cell] ?? ARC_PALETTE[0],
                opacity: compact ? 0.88 : 1,
              }}
            />
          )),
        )}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-cyan-100/60">
        <span>Score {state.score.toFixed(2)}</span>
        <span>{state.availableActions.length} actions</span>
      </div>
    </div>
  );
}
