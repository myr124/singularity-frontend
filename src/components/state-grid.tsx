import type { EnvState } from "~/lib/contracts";

const palette = ["#071321", "#184b63", "#1c91a7", "#36d4ff", "#6df0ff", "#2677ff", "#cfe8ff", "#f4ff7a"];

type StateGridProps = {
  state: EnvState;
  label: string;
  compact?: boolean;
};

export function StateGrid({ state, label, compact = false }: StateGridProps) {
  const frame = state.frame;
  const size = frame.length;

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
        className="grid aspect-square overflow-hidden rounded-[22px] border border-cyan-300/14 bg-[#030b13]"
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
      >
        {frame.flatMap((row, rowIndex) =>
          row.map((cell, columnIndex) => (
            <div
              key={`${rowIndex}-${columnIndex}`}
              style={{
                backgroundColor: palette[cell] ?? palette[0],
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
