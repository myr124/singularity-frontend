import { StateGrid } from "~/components/state-grid";
import type { StepResult } from "~/lib/contracts";
import { countChangedCells } from "~/lib/tree-layout";

const ACTION_LABELS: Record<string, string> = {
  ACTION1: "UP",
  ACTION2: "DOWN",
  ACTION3: "LEFT",
  ACTION4: "RIGHT",
  ACTION5: "INTERACT",
  ACTION6: "POINT",
  ACTION7: "UNDO",
};

export function TransitionDiff({ transition }: { transition: StepResult }) {
  const changedCells = countChangedCells(transition.prevState.frame, transition.nextState.frame);
  const action = transition.actionTaken;
  const label = ACTION_LABELS[action.action] ?? action.action;
  const detail = action.x !== null && action.y !== null ? ` @ (${action.x}, ${action.y})` : "";

  return (
    <section className="subpanel rounded-[28px] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-cyan-100/55">Transition Diff</p>
          <h2 className="mt-1 text-xl font-semibold text-white">{label}{detail} committed</h2>
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
