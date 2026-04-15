import type { TaskConfig } from "~/lib/tasks/types";

import type { ActionCandidate, EnvState } from "./contracts";
import { getMockRun } from "./mock-data";

function TemplateStateView({ state, label, compact }: { state: EnvState; label?: string; compact?: boolean }) {
  return (
    <div className={`rounded-[28px] border border-cyan-300/14 bg-white/[0.03] ${compact ? "p-2" : "p-3"} min-w-0`}>
      <div className="mb-2 min-w-0">
        <div className="flex items-center justify-between gap-2">
          {label ? <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-100/60">{label}</p> : null}
          <div className="shrink-0 rounded-full border border-cyan-300/20 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.14em] text-cyan-100/70">
            {state.state}
          </div>
        </div>
        <p className="mt-1 truncate text-xs font-medium text-white/90">Step {state.stepIndex}</p>
      </div>
      <div className="rounded-[16px] border border-cyan-300/10 bg-[#030b13] p-3">
        <p className="text-sm text-cyan-50/80">{state.description}</p>
        <p className="mt-2 text-xs text-cyan-100/50">Score: {state.score.toFixed(2)}</p>
      </div>
    </div>
  );
}

function TemplateTransitionView({ transition }: { transition: { actionTaken: ActionCandidate; prevState: EnvState; nextState: EnvState; reward: number } }) {
  return (
    <section className="subpanel rounded-[28px] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-cyan-100/55">Transition</p>
          <h2 className="mt-1 text-xl font-semibold text-white">{transition.actionTaken.action} committed</h2>
        </div>
        <div className="font-mono text-xs uppercase tracking-[0.26em] text-cyan-100/65">reward +{transition.reward.toFixed(2)}</div>
      </div>
      <div className="mt-4 grid gap-3 grid-cols-2 min-w-0">
        <TemplateStateView state={transition.prevState} label="Before" compact />
        <TemplateStateView state={transition.nextState} label="After" compact />
      </div>
    </section>
  );
}

function TemplateNodePreview({ state, size, circular = false }: { state: EnvState; size: number; circular?: boolean }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: circular ? "50%" : "18px",
        overflow: "hidden",
        boxShadow: "inset 0 0 0 1px rgba(115,240,255,0.18), 0 0 18px rgba(115,240,255,0.12)",
        background: "#071321",
      }}
    >
      <span style={{ fontSize: Math.max(size * 0.15, 8), color: "#73f0ff", textAlign: "center" as const }}>
        {state.score.toFixed(1)}
      </span>
    </div>
  );
}

function TemplateIterationPreview({ state }: { state: EnvState }) {
  return (
    <div className="aspect-video overflow-hidden rounded-[16px] border border-cyan-300/14 bg-[#030b13] flex items-center justify-center p-3">
      <span className="text-sm font-mono text-cyan-200">{state.score.toFixed(2)}</span>
    </div>
  );
}

function TemplateActionMeta({ action }: { action: ActionCandidate }) {
  return (
    <span className="text-xs text-cyan-100/45">{action.action}</span>
  );
}

export const templateTask: TaskConfig<EnvState, ActionCandidate> = {
  id: "template",
  name: "Template",
  description: "Starter task template for building MCTS visualizations",
  getData: getMockRun,
  StateView: TemplateStateView,
  TransitionView: TemplateTransitionView,
  NodeStatePreview: TemplateNodePreview,
  IterationPreview: TemplateIterationPreview,
  ActionMeta: TemplateActionMeta,
  formatActionKey: (action) => action.action,
};