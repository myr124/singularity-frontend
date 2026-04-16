"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Grid3x3, Type, Calculator } from "lucide-react";
import { ParticleSystem } from "~/lib/particle-system";
import { getAllTasks } from "~/lib/tasks/registry";

const TASK_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  arc: Grid3x3,
  "word-puzzle": Type,
  math: Calculator,
};

export function LandingPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const systemRef = useRef<ParticleSystem | null>(null);
    const router = useRouter();
    const [showContent, setShowContent] = useState(false);
    const [showTasks, setShowTasks] = useState(false);
    const [navigatingTo, setNavigatingTo] = useState<string | null>(null);

    const tasks = getAllTasks().filter((t) => t.id !== "template");

    useEffect(() => {
        setShowContent(true);
        const timer = setTimeout(() => setShowTasks(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleNavigate = useCallback((taskId: string) => {
        if (navigatingTo) return;
        setNavigatingTo(taskId);
        setTimeout(() => {
            systemRef.current?.startZoom(() => {
                router.push(`/mcts/${taskId}`);
            });
        }, 200);
    }, [navigatingTo, router]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const system = new ParticleSystem(canvas);
        systemRef.current = system;
        system.init(3500);

        const resizeObserver = new ResizeObserver(() => {
            system.handleResize();
        });
        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement);
        }

        return () => {
            system.destroy();
            resizeObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.addEventListener("mousemove", systemRef.current!.handleMouseMove);
        canvas.addEventListener("touchmove", systemRef.current!.handleTouchMove);
        canvas.addEventListener("mouseleave", systemRef.current!.handleMouseLeave);
        return () => {
            canvas.removeEventListener("mousemove", systemRef.current!.handleMouseMove);
            canvas.removeEventListener("touchmove", systemRef.current!.handleTouchMove);
            canvas.removeEventListener("mouseleave", systemRef.current!.handleMouseLeave);
        };
    }, []);

    return (
        <div className="landing-container">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 h-[60vh] w-full"
                aria-hidden="true"
            />

            <div className="absolute inset-0 flex flex-col items-center pt-[10vh] pointer-events-none">
                <AnimatePresence>
                    {showContent && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="flex flex-col items-center"
                        >
                            <p className="mb-3 text-xs uppercase tracking-[0.55em] text-cyan-100/40 md:text-sm">
                                Artificial Super Intelligence
                            </p>
                            <h1 className="singularity-wordmark bg-[linear-gradient(135deg,#f7fdff_0%,#b8f7ff_22%,#67e7ff_46%,#2b7fff_76%,#f1fbff_100%)] bg-clip-text pb-6 text-center text-5xl text-transparent md:text-7xl">
                                Singularity
                            </h1>
                            </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-12 pt-8 pointer-events-none">
                <AnimatePresence>
                    {showTasks && (
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="pointer-events-auto flex w-full max-w-3xl flex-col items-center gap-4 px-4"
                        >
                            <p className="text-[10px] uppercase tracking-[0.4em] text-cyan-100/40">Choose a visualization</p>
                            <div
                                className="flex items-center justify-center gap-3"
                                onMouseEnter={() => { if (!navigatingTo) systemRef.current?.convergeToFront(); }}
                                onMouseLeave={() => systemRef.current?.drift()}
                            >
                                {tasks.map((task) => {
                                    const Icon = TASK_ICONS[task.id];
                                    const isNavigating = navigatingTo === task.id;
                                    return (
                                        <button
                                            key={task.id}
                                            onClick={() => handleNavigate(task.id)}
                                            disabled={!!navigatingTo}
                                            className="btn-get-started group relative flex items-center gap-2.5 rounded-full border border-cyan-300/16 bg-white/[0.03] px-6 py-3 backdrop-blur-xl transition-all hover:border-cyan-300/40 hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-40 md:px-8 md:py-3.5"
                                            aria-label={`Open ${task.name} visualizer`}
                                        >
                                            {Icon && <Icon className="h-4 w-4 text-cyan-200/70 transition-colors group-hover:text-cyan-100" />}
                                            <span className="text-xs uppercase tracking-[0.22em] text-cyan-100/80 transition-colors group-hover:text-white md:text-sm">
                                                {task.name}
                                            </span>
                                            {isNavigating && (
                                                <motion.div
                                                    className="absolute inset-0 rounded-full bg-white/[0.06]"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}