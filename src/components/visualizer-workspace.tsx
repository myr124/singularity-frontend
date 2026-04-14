"use client";

import { startTransition, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { CandidateActions } from "~/components/candidate-actions";
import { DecisionSummary } from "~/components/decision-summary";
import { IterationTimeline } from "~/components/iteration-timeline";
import { TransitionDiff } from "~/components/transition-diff";
import { TreeCanvas } from "~/components/tree-canvas";
import type { MCTSNode, RunDataset } from "~/lib/contracts";

export function VisualizerWorkspace({ run }: { run: RunDataset }) {
    const [phase, setPhase] = useState<"booting" | "generating" | "ready">("booting");
    const [selectedIteration, setSelectedIteration] = useState(run.iterations.at(-1)?.iterationIndex ?? 1);
    const [selectedNodeId, setSelectedNodeId] = useState(run.iterations.at(-1)?.expandedNodeId ?? "root");
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1.4);
    const [visibleNodeCount, setVisibleNodeCount] = useState(1);

    const activeIteration = useMemo(
        () => run.iterations.find((iteration) => iteration.iterationIndex === selectedIteration) ?? run.iterations[run.iterations.length - 1],
        [run.iterations, selectedIteration],
    );

    const focusFrames = useMemo(
        () =>
            run.iterations.map((iteration) => ({
                iterationIndex: iteration.iterationIndex,
                nodeId: iteration.expandedNodeId,
                state:
                    run.nodes.find((node) => node.nodeId === iteration.expandedNodeId)?.state ??
                    run.currentState,
            })),
        [run.currentState, run.iterations, run.nodes],
    );

    const activeCandidates = activeIteration?.candidateActions.length ? activeIteration.candidateActions : run.decision.candidates;
    const playbackSteps = run.iterations.map((iteration) => iteration.iterationIndex);
    const currentStepPosition = playbackSteps.indexOf(selectedIteration);
    const currentStepPositionRef = useRef(currentStepPosition);
    const revealOrder = useMemo(() => {
        const children = new Map<string, MCTSNode[]>();
        const root = run.nodes.find((node) => node.parentId === null);
        if (!root) return run.nodes;

        for (const node of run.nodes) {
            if (!node.parentId) continue;
            const branch = children.get(node.parentId) ?? [];
            branch.push(node);
            branch.sort((left, right) => left.nodeId.localeCompare(right.nodeId));
            children.set(node.parentId, branch);
        }

        const ordered: MCTSNode[] = [];
        const queue = [root];

        while (queue.length > 0) {
            const current = queue.shift();
            if (!current) continue;
            ordered.push(current);
            queue.push(...(children.get(current.nodeId) ?? []));
        }

        return ordered;
    }, [run.nodes]);
    const visibleNodeIds = revealOrder.slice(0, visibleNodeCount).map((node) => node.nodeId);

    useEffect(() => {
        currentStepPositionRef.current = currentStepPosition;
    }, [currentStepPosition]);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setPhase("generating");
        }, 1800);

        return () => window.clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (phase !== "generating") return;

        setVisibleNodeCount(1);
        const timer = window.setInterval(() => {
            setVisibleNodeCount((count) => {
                const nextCount = count + 1;
                if (nextCount >= revealOrder.length) {
                    window.clearInterval(timer);
                    setPhase("ready");
                    return revealOrder.length;
                }
                return nextCount;
            });
        }, 340);

        return () => window.clearInterval(timer);
    }, [phase, revealOrder.length]);

    const selectIteration = useCallback((iterationIndex: number) => {
        startTransition(() => {
            setSelectedIteration(iterationIndex);
            const iteration = run.iterations.find((item) => item.iterationIndex === iterationIndex);
            if (iteration) setSelectedNodeId(iteration.expandedNodeId);
        });
    }, [run.iterations]);

    useEffect(() => {
        if (phase !== "ready" || !isPlaying || playbackSteps.length === 0) return;

        const intervalMs = Math.max(500, 1700 / playbackRate);
        const timer = window.setInterval(() => {
            const nextIndex =
                currentStepPositionRef.current >= playbackSteps.length - 1
                    ? 0
                    : currentStepPositionRef.current + 1;
            currentStepPositionRef.current = nextIndex;

            const nextIteration = playbackSteps[nextIndex];
            if (nextIteration === undefined) return;
            selectIteration(nextIteration);
        }, intervalMs);

        return () => window.clearInterval(timer);
    }, [isPlaying, phase, playbackRate, playbackSteps, selectIteration]);

    const activePath = activeIteration?.selectedPath ?? ["root"];
    const activeSimulationValue =
        activeIteration === undefined ? "0.00" : activeIteration.simulationResultValue.toFixed(2);
    const activeIterationIndex = activeIteration?.iterationIndex ?? selectedIteration;
    const activeExpandedNode = activeIteration?.expandedNodeId ?? selectedNodeId;

    const nextIndex =
        currentStepPosition >= playbackSteps.length - 1 ? 0 : currentStepPosition + 1;
    const nextIteration = playbackSteps[nextIndex];
    const handleAdvancePreview = () => {
        if (nextIteration !== undefined) selectIteration(nextIteration);
    };

    return (
        <main className="min-h-screen px-4 py-5 md:px-6 lg:px-8">
            <AnimatePresence mode="wait">
                {phase === "booting" ? (
                    <motion.section
                        key="booting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mx-auto flex min-h-[88vh] max-w-[1080px] items-center justify-center"
                    >
                        <div className="panel relative w-full overflow-hidden rounded-[40px] px-8 py-16 text-center">
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(115,240,255,0.16),transparent_30%),radial-gradient(circle_at_50%_75%,rgba(43,127,255,0.16),transparent_28%)]" />
                            <div className="relative">
                                <p className="text-xs uppercase tracking-[0.55em] text-cyan-100/40">Processing Nodes</p>
                                <h2 className="mt-5 text-4xl font-semibold text-white md:text-5xl">Preparing the search graph</h2>
                                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-cyan-50/72 md:text-base">
                                    Evaluating candidate actions, tracing branch potential, and constructing the initial synaptic tree.
                                </p>
                                <div className="mt-12 flex items-center justify-center gap-6">
                                    {[0, 1, 2, 3, 4].map((index) => (
                                        <motion.div
                                            key={index}
                                            className="h-4 w-4 rounded-full bg-cyan-200 shadow-[0_0_24px_rgba(115,240,255,0.5)]"
                                            animate={{
                                                opacity: [0.25, 1, 0.25],
                                                scale: [0.82, 1.28, 0.82],
                                                y: [0, -10, 0],
                                            }}
                                            transition={{
                                                duration: 1.35,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: "easeInOut",
                                                delay: index * 0.12,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.section>
                ) : (
                    <motion.div
                        key="workspace"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mx-auto max-w-[1600px]"
                    >
                <motion.header
                    initial={{ opacity: 0, y: -22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="panel mb-5 overflow-visible rounded-[32px] px-6 py-5"
                >
                    <div className="relative flex flex-col items-center justify-center py-2">
                        <p className="mb-2 text-[10px] uppercase tracking-[0.5em] text-cyan-100/40 md:text-xs">
                            Artificial Super Intelligence
                        </p>
                        <h1 className="singularity-wordmark bg-[linear-gradient(135deg,#f7fdff_0%,#b8f7ff_22%,#67e7ff_46%,#2b7fff_76%,#f1fbff_100%)] bg-clip-text pb-4 text-center text-4xl text-transparent md:text-5xl">
                            Singularity
                        </h1>
                    </div>
                </motion.header>

                <section className="space-y-5">
                    <div>
                        <TreeCanvas
                            nodes={run.nodes}
                            selectedPath={activeIteration?.selectedPath ?? ["root"]}
                            selectedNodeId={selectedNodeId}
                            visibleNodeIds={visibleNodeIds}
                            isGenerating={phase === "generating"}
                            onSelectNode={(nodeId) => {
                                if (phase !== "ready") return;
                                setIsPlaying(false);
                                setSelectedNodeId(nodeId);
                            }}
                        />
                        <IterationTimeline
                            iterations={run.iterations}
                            frames={focusFrames}
                            selectedIteration={selectedIteration}
                            isPlaying={phase === "ready" && isPlaying}
                            playbackRate={playbackRate}
                            onSelect={(iterationIndex) => {
                                if (phase !== "ready") return;
                                setIsPlaying(false);
                                selectIteration(iterationIndex);
                            }}
                            onTogglePlayback={() => {
                                if (phase !== "ready") return;
                                setIsPlaying((current) => !current);
                            }}
                            onReset={() => {
                                if (phase !== "ready") return;
                                setIsPlaying(false);
                                const first = playbackSteps[0];
                                if (first !== undefined) selectIteration(first);
                            }}
                            onPlaybackRateChange={(rate) => {
                                if (phase !== "ready") return;
                                setPlaybackRate(rate);
                            }}
                        />
                        <TransitionDiff transition={run.transition} />
                    </div>

                    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_420px]">
                        <CandidateActions candidates={activeCandidates} />
                        <DecisionSummary decision={run.decision} />
                        <section className="panel rounded-[28px] p-5">
                            <p className="text-xs uppercase tracking-[0.32em] text-cyan-100/55">Live Replay</p>
                            <h2 className="mt-1 text-xl font-semibold text-white">
                                Iteration {activeIterationIndex}
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-cyan-50/78">
                                Replaying path{" "}
                                <span className="font-mono text-cyan-200">
                                    {activePath.join(" → ")}
                                </span>
                            </p>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                <div className="rounded-[22px] border border-cyan-300/14 bg-white/[0.03] p-3">
                                    <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/45">Expanded</p>
                                    <p className="mt-2 font-mono text-sm text-white">
                                        {activeExpandedNode}
                                    </p>
                                </div>
                                <div className="rounded-[22px] border border-cyan-300/14 bg-white/[0.03] p-3">
                                    <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/45">Sim result</p>
                                    <p className="mt-2 font-mono text-sm text-white">{activeSimulationValue}</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleAdvancePreview}
                                disabled={phase !== "ready"}
                                className="mt-4 rounded-full border border-cyan-300/16 px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-100/72 transition enabled:hover:border-cyan-200/30 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Advance One Step
                            </button>
                        </section>
                    </div>
                </section>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
