"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

import type { EnvState, MCTSNode } from "~/lib/contracts";
import { buildTreeLayout } from "~/lib/tree-layout";

const WIDTH = 960;
const HEIGHT = 640;
const PREVIEW_PALETTE = ["#071321", "#184b63", "#1c91a7", "#36d4ff", "#6df0ff", "#2677ff", "#cfe8ff", "#f4ff7a"];

function MiniStatePreview({
    state,
    size,
    circular = false,
}: {
    state: EnvState;
    size: number;
    circular?: boolean;
}) {
    return (
        <div
            className={circular ? "overflow-hidden rounded-full" : "overflow-hidden rounded-[18px]"}
            style={{
                width: size,
                height: size,
                boxShadow: "inset 0 0 0 1px rgba(115,240,255,0.18), 0 0 18px rgba(115,240,255,0.12)",
            }}
        >
            <div
                className="grid h-full w-full"
                style={{
                    gridTemplateColumns: `repeat(${state.frame.length}, minmax(0, 1fr))`,
                }}
            >
                {state.frame.flatMap((row, rowIndex) =>
                    row.map((cell, columnIndex) => (
                        <div
                            key={`${rowIndex}-${columnIndex}`}
                            style={{
                                backgroundColor: PREVIEW_PALETTE[cell] ?? PREVIEW_PALETTE[0],
                            }}
                        />
                    )),
                )}
            </div>
        </div>
    );
}

type TreeCanvasProps = {
    nodes: MCTSNode[];
    selectedPath: string[];
    selectedNodeId: string;
    visibleNodeIds?: string[];
    isGenerating?: boolean;
    onSelectNode: (nodeId: string) => void;
};

export function TreeCanvas({
    nodes,
    selectedPath,
    selectedNodeId,
    visibleNodeIds,
    isGenerating = false,
    onSelectNode,
}: TreeCanvasProps) {
    const layout = useMemo(() => buildTreeLayout(nodes, WIDTH, HEIGHT), [nodes]);
    const visibleLayout = useMemo(() => {
        const set = new Set(visibleNodeIds ?? layout.map((n) => n.nodeId));
        return layout.filter((n) => set.has(n.nodeId));
    }, [layout, visibleNodeIds]);
    const nodeById = useMemo(
        () => new Map(visibleLayout.map((n) => [n.nodeId, n])),
        [visibleLayout],
    );
    const selectedPathSet = useMemo(() => new Set(selectedPath), [selectedPath]);

    return (
        <section className="subpanel grid-noise relative overflow-hidden rounded-[36px] p-5">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(115,240,255,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(43,127,255,0.14),transparent_24%)]" />
            <div className="relative z-10 mb-5 flex items-center justify-between gap-4">
                <div>
                    <p className="text-xs uppercase tracking-[0.36em] text-cyan-100/55">MCTS Tree</p>
                    <h1 className="mt-1 text-3xl font-semibold text-white">Decision Tree</h1>
                </div>
                <div className="rounded-full border border-cyan-300/18 bg-cyan-300/[0.08] px-4 py-2 font-mono text-xs uppercase tracking-[0.3em] text-cyan-100/68">
                    {visibleLayout.length}/{layout.length} nodes
                </div>
            </div>
            {isGenerating ? (
                <div className="relative z-10 mb-4 flex items-center justify-between rounded-[22px] border border-cyan-300/14 bg-cyan-300/[0.05] px-4 py-3">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-100/45">Constructing Graph</p>
                        <p className="mt-1 text-sm text-cyan-50/82">Synthesizing new branches into the search surface.</p>
                    </div>
                    <div className="h-2 w-36 rounded-full bg-cyan-100/10">
                        <motion.div
                            className="h-2 rounded-full bg-[linear-gradient(90deg,#73f0ff,#2b7fff)]"
                            animate={{ width: `${Math.max((visibleLayout.length / layout.length) * 100, 8)}%` }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                        />
                    </div>
                </div>
            ) : null}
            <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="relative z-10 h-[34rem] w-full">
                <defs>
                    <linearGradient id="edge-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
                        <stop offset="0%" stopColor="rgba(115,240,255,0.08)" />
                        <stop offset="40%" stopColor="rgba(115,240,255,0.72)" />
                        <stop offset="100%" stopColor="rgba(43,127,255,0.2)" />
                    </linearGradient>
                    <filter id="node-glow">
                        <feGaussianBlur stdDeviation="7" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                {visibleLayout.map((node) => {
                    if (!node.parentId) return null;
                    const parent = nodeById.get(node.parentId);
                    if (!parent) return null;
                    const active = selectedPathSet.has(node.nodeId) && selectedPathSet.has(parent.nodeId);
                    const edgePath = `M ${parent.x} ${parent.y} C ${parent.x} ${(parent.y + node.y) / 2}, ${node.x} ${(parent.y + node.y) / 2}, ${node.x} ${node.y}`;

                    return (
                        <motion.path
                            key={`${parent.nodeId}-${node.nodeId}`}
                            d={edgePath}
                            fill="none"
                            stroke={active ? "url(#edge-gradient)" : "rgba(115, 240, 255, 0.14)"}
                            strokeWidth={active ? 3.5 : 1.4}
                            initial={{ pathLength: 0, opacity: 0.2 }}
                            animate={{ pathLength: 1, opacity: active ? 1 : 0.8 }}
                            transition={{ duration: isGenerating ? 0.46 : 1.1, ease: "easeOut" }}
                        />
                    );
                })}
                {visibleLayout.map((node, index) => {
                    const active = selectedPathSet.has(node.nodeId);
                    const selected = node.nodeId === selectedNodeId;
                    const showEmbeddedPreview = selected || active;
                    const nodeRadius = selected ? 22 : active ? 18 : 13;
                    const useGlow = selected || active;

                    return (
                        <motion.g
                            key={node.nodeId}
                            initial={{ opacity: 0, scale: 0.55 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.34, delay: isGenerating ? 0.24 : Math.min(index * 0.02, 0.6) }}
                        >
                            <circle
                                cx={node.x}
                                cy={node.y}
                                r={nodeRadius}
                                fill={selected ? "rgba(115, 240, 255, 0.28)" : "rgba(12, 30, 56, 0.96)"}
                                stroke={selected ? "#90fbff" : active ? "#73f0ff" : "rgba(115, 240, 255, 0.36)"}
                                strokeWidth={selected ? 2.6 : 1.4}
                                filter={useGlow ? "url(#node-glow)" : undefined}
                                style={{ cursor: "pointer" }}
                                onClick={() => onSelectNode(node.nodeId)}
                            />
                            {showEmbeddedPreview ? (
                                <foreignObject
                                    x={node.x - nodeRadius + 2}
                                    y={node.y - nodeRadius + 2}
                                    width={(nodeRadius - 2) * 2}
                                    height={(nodeRadius - 2) * 2}
                                    style={{ pointerEvents: "none" }}
                                >
                                    <MiniStatePreview
                                        state={node.state}
                                        size={(nodeRadius - 2) * 2}
                                        circular
                                    />
                                </foreignObject>
                            ) : (
                                <circle
                                    cx={node.x}
                                    cy={node.y}
                                    r={selected ? 7.5 : 5}
                                    fill={selected ? "#ffffff" : active ? "#7af6ff" : "#2e6fe6"}
                                />
                            )}
                            <text x={node.x} y={node.y - 30} textAnchor="middle" className="fill-cyan-50/80 text-[11px] tracking-[0.24em]">
                                {node.nodeId}
                            </text>
                            <text x={node.x} y={node.y + 38} textAnchor="middle" className="fill-cyan-100/55 text-[10px]">
                                {node.action?.action ?? "ROOT"} · {node.meanValue.toFixed(2)}
                            </text>
                        </motion.g>
                    );
                })}
            </svg>
            {(() => {
                const selectedNode = visibleLayout.find((node) => node.nodeId === selectedNodeId);
                if (!selectedNode) return null;

                const previewX = Math.min(Math.max(selectedNode.x + 28, 16), WIDTH - 176);
                const previewY = Math.min(Math.max(selectedNode.y - 70, 24), HEIGHT - 176);

                return (
                    <div className="pointer-events-none absolute inset-0 z-20">
                        <motion.div
                            key={selectedNode.nodeId}
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.24, ease: "easeOut" }}
                            className="absolute w-[148px] rounded-[24px] border border-cyan-300/20 bg-[rgba(5,14,24,0.92)] p-3 shadow-[0_0_32px_rgba(115,240,255,0.14)]"
                            style={{
                                left: `${(previewX / WIDTH) * 100}%`,
                                top: `${(previewY / HEIGHT) * 100}%`,
                            }}
                        >
                            <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-100/48">State Preview</p>
                            <p className="mt-1 font-mono text-xs text-white/84">{selectedNode.nodeId}</p>
                            <div className="mt-3">
                                <MiniStatePreview state={selectedNode.state} size={122} />
                            </div>
                            <p className="mt-3 text-[11px] text-cyan-50/68">
                                {selectedNode.action?.action ?? "ROOT"} · score {selectedNode.state.score.toFixed(2)}
                            </p>
                        </motion.div>
                    </div>
                );
            })()}
        </section>
    );
}
