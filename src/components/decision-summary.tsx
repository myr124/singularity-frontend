import type { ReactNode } from "react";

import type { ChildStats } from "~/lib/mcts/types";

type DecisionSummaryProps<A> = {
  decision: {
    rootState: unknown;
    candidates: A[];
    childrenStats: ChildStats<A>[];
    bestAction: A;
  };
  renderActionMeta?: (action: A) => ReactNode;
};

export function DecisionSummary<A extends { action: string; rationale: string | null }>({
  decision,
  renderActionMeta,
}: DecisionSummaryProps<A>) {
  return (
    <section className="subpanel rounded-[28px] p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-cyan-100/55">Decision Surface</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Best root action</h2>
        </div>
        <div className="rounded-full border border-cyan-300/25 bg-cyan-300/8 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-cyan-100/75">
          {decision.bestAction.action}
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-cyan-50/78">{decision.bestAction.rationale}</p>
      <div className="mt-5 space-y-3">
        {decision.childrenStats.map((candidate) => (
          <div
            key={candidate.action.action}
            className="rounded-[22px] border border-cyan-300/14 bg-white/[0.03] p-3"
          >
            <div className="flex items-center justify-between text-sm text-white">
              <span>{candidate.action.action}</span>
              <span className="font-mono text-cyan-100/70">{candidate.value.toFixed(2)}</span>
            </div>
            {renderActionMeta ? (
              <p className="mt-1 text-xs text-cyan-100/50">{renderActionMeta(candidate.action)}</p>
            ) : null}
            <div className="mt-2 h-2 rounded-full bg-cyan-100/8">
              <div
                className="h-2 rounded-full bg-[linear-gradient(90deg,#4be1ff,#2b7fff)]"
                style={{ width: `${Math.max(candidate.value * 100, 12)}%` }}
              />
            </div>
            <p className="mt-2 text-xs uppercase tracking-[0.22em] text-cyan-100/45">{candidate.visits} visits</p>
          </div>
        ))}
      </div>
    </section>
  );
}