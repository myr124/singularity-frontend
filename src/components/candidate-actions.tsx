import type { ActionCandidate } from "~/lib/contracts";

export function CandidateActions({ candidates }: { candidates: ActionCandidate[] }) {
  return (
    <section className="subpanel rounded-[28px] p-5">
      <p className="text-xs uppercase tracking-[0.32em] text-cyan-100/55">Candidate Actions</p>
      <div className="mt-4 space-y-3">
        {candidates.map((candidate) => (
          <article
            key={`${candidate.action}-${candidate.x ?? "n"}-${candidate.y ?? "n"}`}
            className="rounded-[22px] border border-cyan-300/14 bg-white/[0.03] p-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-white">{candidate.action}</h3>
              <span className="font-mono text-xs text-cyan-100/55">
                {candidate.x !== null && candidate.y !== null ? `${candidate.x},${candidate.y}` : "global"}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-cyan-50/76">{candidate.rationale}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
