import { cn } from "~/lib/utils";
import type { TaskConfig } from "~/lib/tasks/types";

import type { ActionCandidate, EnvState } from "./contracts";
import { getMockRun } from "./mock-data";

const ACTION_COLORS: Record<string, string> = {
  TRANSFORM: "#4be1ff",
  UNDERSTAND: "#a78bfa",
  SOLVE_SUBPART: "#34d399",
  VERIFY: "#fbbf24",
  FINALIZE: "#f87171",
};

function MathStateView({ state, label, compact }: { state: EnvState; label?: string; compact?: boolean }) {
  const isWin = state.state === "WIN";
  const progress = Math.max(state.score * 100, 3);

  return (
    <div className={cn("rounded-[28px] border border-cyan-300/14 bg-white/[0.03] p-3 min-w-0", compact && "p-2")}>
      {label ? (
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-100/60">{label}</p>
          <div className={cn(
            "shrink-0 rounded-full border px-1.5 py-0.5 text-[8px] uppercase tracking-[0.14em]",
            isWin ? "border-emerald-400/30 text-emerald-300/80" : "border-cyan-300/20 text-cyan-100/70",
          )}>
            {state.state}
          </div>
        </div>
      ) : null}
      <div className="rounded-[16px] border border-cyan-300/10 bg-[#030b13] p-3">
        <p className={cn("font-mono text-white leading-relaxed", compact ? "text-xs" : "text-sm")}>
          {state.working}
        </p>
        {state.finalAnswer && (
          <p className="mt-2 font-mono text-sm text-emerald-300">
            x = {state.finalAnswer}
          </p>
        )}
        <div className="mt-2 h-1.5 rounded-full bg-cyan-100/8">
          <div
            className={cn(
              "h-1.5 rounded-full transition-all",
              isWin ? "bg-emerald-400" : "bg-[linear-gradient(90deg,#4be1ff,#2b7fff)]",
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-cyan-100/40">
          Score {state.score.toFixed(2)} · Step {state.stepIndex}
        </p>
      </div>
    </div>
  );
}

function MathTransition({ transition }: { transition: { actionTaken: ActionCandidate; prevState: EnvState; nextState: EnvState; reward: number } }) {
  const actionColor = ACTION_COLORS[transition.actionTaken.action] ?? "#4be1ff";

  return (
    <section className="subpanel rounded-[28px] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-cyan-100/55">Transition</p>
          <h2 className="mt-1 text-xl font-semibold text-white">
            <span style={{ color: actionColor }}>{transition.actionTaken.action}</span>
          </h2>
          <p className="mt-1 text-sm text-cyan-50/70">{transition.actionTaken.rationale}</p>
        </div>
        <div className="font-mono text-xs uppercase tracking-[0.26em] text-cyan-100/65">reward +{transition.reward.toFixed(2)}</div>
      </div>
      <div className="mt-4 grid gap-3 grid-cols-2 min-w-0">
        <MathStateView state={transition.prevState} label="Before" compact />
        <MathStateView state={transition.nextState} label="After" compact />
      </div>
    </section>
  );
}

function MathNodePreview({ state, size, circular = false }: { state: EnvState; size: number; circular?: boolean }) {
  const isWin = state.state === "WIN";
  const progress = state.score;

  return (
    <div
      className={circular ? "overflow-hidden rounded-full" : "overflow-hidden rounded-[12px]"}
      style={{
        width: size,
        height: size,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        background: isWin ? "rgba(52,211,153,0.12)" : "#071321",
        boxShadow: "inset 0 0 0 1px rgba(115,240,255,0.18), 0 0 18px rgba(115,240,255,0.12)",
        padding: Math.max(size * 0.1, 4),
      }}
    >
      <span style={{ fontSize: Math.max(size * 0.35, 10), fontFamily: "monospace", color: isWin ? "#34d399" : "#73f0ff", fontWeight: 700 }}>
        {Math.round(progress * 100)}%
      </span>
      <span style={{ fontSize: Math.max(size * 0.1, 6), color: "rgba(115,240,255,0.5)" }}>
        Step {state.stepIndex}
      </span>
    </div>
  );
}

function MathIterationPreview({ state }: { state: EnvState }) {
  const isWin = state.state === "WIN";

  return (
    <div className="aspect-video overflow-hidden rounded-[16px] border border-cyan-300/14 bg-[#030b13] p-2 flex flex-col items-center justify-center gap-1">
      <span className="font-mono text-sm text-white leading-tight text-center">{state.working}</span>
      <div className="flex items-center gap-2 mt-1">
        <span className={cn("text-[10px] uppercase tracking-[0.2em]", isWin ? "text-emerald-300" : "text-cyan-100/50")}>
          {isWin ? "SOLVED" : `Step ${state.stepIndex}`}
        </span>
        <span className="text-[10px] text-cyan-100/30">·</span>
        <span className="text-[10px] font-mono" style={{ color: isWin ? "#34d399" : "#73f0ff" }}>
          {(state.score * 100).toFixed(0)}%
        </span>
      </div>
    </div>
  );
}

function MathActionMeta({ action }: { action: ActionCandidate }) {
  const color = ACTION_COLORS[action.action] ?? "#4be1ff";
  return (
    <span style={{ color }} className="text-xs font-semibold uppercase tracking-wider">
      {action.action}
    </span>
  );
}

export const mathTask: TaskConfig<EnvState, ActionCandidate> = {
  id: "math",
  name: "Arithmetic Solver",
  description: "MCTS search for numeric expressions matching a target value",
  getData: getMockRun,
  StateView: MathStateView,
  TransitionView: MathTransition,
  NodeStatePreview: MathNodePreview,
  IterationPreview: MathIterationPreview,
  ActionMeta: MathActionMeta,
  formatActionKey: (action) => `${action.action}`,
};