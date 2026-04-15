"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Pause, Play, RotateCcw } from "lucide-react";

import type { IterationFrame, MCTSIteration } from "~/lib/mcts/types";
import { cn } from "~/lib/utils";

type IterationTimelineProps<S> = {
  iterations: MCTSIteration<unknown>[];
  frames: IterationFrame<S>[];
  selectedIteration: number;
  isPlaying: boolean;
  playbackRate: number;
  onSelect: (index: number) => void;
  onTogglePlayback: () => void;
  onReset: () => void;
  onPlaybackRateChange: (rate: number) => void;
  renderFramePreview: (state: S) => ReactNode;
};

export function IterationTimeline<S>({
  iterations,
  frames,
  selectedIteration,
  isPlaying,
  playbackRate,
  onSelect,
  onTogglePlayback,
  onReset,
  onPlaybackRateChange,
  renderFramePreview,
}: IterationTimelineProps<S>) {
  const progress =
    iterations.length > 1
      ? ((selectedIteration - 1) / (iterations.length - 1)) * 100
      : 100;
  const minIteration = iterations[0]?.iterationIndex ?? 1;
  const maxIteration = iterations[iterations.length - 1]?.iterationIndex ?? 1;

  return (
    <section className="subpanel rounded-[28px] p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-cyan-100/55">Iteration Replay</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Selection and backprop timeline</h2>
        </div>
        <div className="font-mono text-xs text-cyan-100/65">{iterations.length} passes</div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onTogglePlayback}
          className="flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-50 transition hover:border-cyan-200/35"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 rounded-full border border-cyan-300/14 px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-100/72 transition hover:border-cyan-200/25"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
        <div className="ml-auto flex items-center gap-2">
          {[0.8, 1.4, 2].map((rate) => (
            <button
              key={rate}
              type="button"
              onClick={() => onPlaybackRateChange(rate)}
              className={cn(
                "rounded-full border px-3 py-1.5 font-mono text-xs transition",
                playbackRate === rate
                  ? "border-cyan-200/40 bg-cyan-300/[0.12] text-cyan-50"
                  : "border-cyan-300/14 text-cyan-100/60 hover:border-cyan-200/25",
              )}
            >
              {rate.toFixed(1)}x
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <div className="relative h-6">
          <div className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-cyan-100/8" />
          <motion.div
            className="absolute left-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,#73f0ff,#2b7fff)] shadow-[0_0_18px_rgba(115,240,255,0.35)]"
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
          />
          <motion.div
            className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-100/60 bg-[#c8f8ff] shadow-[0_0_20px_rgba(115,240,255,0.5)]"
            animate={{ left: `${progress}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
          />
          <input
            type="range"
            min={minIteration}
            max={maxIteration}
            step={1}
            value={selectedIteration}
            onChange={(event) => onSelect(Number(event.target.value))}
            className="absolute inset-0 z-10 h-full w-full cursor-ew-resize opacity-0"
            aria-label="Scrub replay iterations"
          />
        </div>
        <div className="mt-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-100/42">
          <span>Start</span>
          <span>Iteration {selectedIteration}</span>
          <span>End</span>
        </div>
      </div>
      <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
        {iterations.map((iteration) => {
          const active = iteration.iterationIndex === selectedIteration;
          const frame = frames.find((item) => item.iterationIndex === iteration.iterationIndex);
          return (
            <button
              key={iteration.iterationIndex}
              type="button"
              onClick={() => onSelect(iteration.iterationIndex)}
              className={cn(
                "relative min-w-[220px] rounded-[22px] border p-4 text-left transition",
                active
                  ? "border-cyan-200/45 bg-cyan-300/[0.10]"
                  : "border-cyan-300/14 bg-white/[0.03] hover:border-cyan-200/25",
              )}
            >
              {active ? (
                <motion.div
                  layoutId="iteration-glow"
                  className="absolute inset-0 rounded-[22px] border border-cyan-200/30 shadow-[0_0_24px_rgba(115,240,255,0.18)]"
                />
              ) : null}
              {frame ? (
                <div className="mb-2">
                  {renderFramePreview(frame.state)}
                </div>
              ) : null}
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-100/55">Iteration {iteration.iterationIndex}</p>
              <p className="mt-3 text-sm text-white">
                Expanded <span className="font-mono text-cyan-200">{iteration.expandedNodeId}</span>
              </p>
              <p className="mt-2 text-xs text-cyan-50/70">Sim value {iteration.simulationResultValue.toFixed(2)}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}