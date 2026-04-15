import type { ReactNode } from "react";

type CandidateActionsProps<A> = {
  candidates: A[];
  renderActionMeta?: (action: A) => ReactNode;
  formatActionKey: (action: A) => string;
};

export function CandidateActions<A extends { action: string; rationale: string | null }>({
  candidates,
  renderActionMeta,
  formatActionKey,
}: CandidateActionsProps<A>) {
  return (
    <section className="subpanel rounded-[28px] p-5">
      <p className="text-xs uppercase tracking-[0.32em] text-cyan-100/55">Candidate Actions</p>
      <div className="mt-4 space-y-3">
        {candidates.map((candidate) => (
          <article
            key={formatActionKey(candidate)}
            className="rounded-[22px] border border-cyan-300/14 bg-white/[0.03] p-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-white">{candidate.action}</h3>
              {renderActionMeta ? renderActionMeta(candidate) : null}
            </div>
            <p className="mt-2 text-sm leading-6 text-cyan-50/76">{candidate.rationale}</p>
          </article>
        ))}
      </div>
    </section>
  );
}