import { StateGrid } from "~/components/state-grid";
import type { StepResult } from "~/lib/contracts";
import { countChangedCells } from "~/lib/tree-layout";

export function TransitionDiff({ transition }: { transition: StepResult }) {
  const changedCells = countChangedCells(transition.prevState.frame, transition.nextState.frame);

  return (
    <section className="subpanel rounded-[28px] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-cyan-100/55">Transition Diff</p>
          <h2 className="mt-1 text-xl font-semibold text-white">{transition.actionTaken.action} committed</h2>
        </div>
        <div className="font-mono text-xs uppercase tracking-[0.26em] text-cyan-100/65">reward +{transition.reward.toFixed(2)}</div>
      </div>
      <div className="mt-4 grid gap-3 grid-cols-2 min-w-0">
        <StateGrid state={transition.prevState} label="Before" compact />
        <StateGrid state={transition.nextState} label="After" compact />
      </div>
      <p className="mt-3 text-sm text-cyan-50/76">{changedCells} cells changed in the selected step transition.</p>
    </section>
  );
}
