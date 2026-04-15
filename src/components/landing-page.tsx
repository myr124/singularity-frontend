"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ParticleSystem } from "~/lib/particle-system";

export function LandingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const systemRef = useRef<ParticleSystem | null>(null);
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setShowContent(true);
    const timer = setTimeout(() => setShowButton(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    systemRef.current?.startZoom(() => {
      router.push("/mcts");
    });
  }, [isTransitioning, router]);

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
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
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
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="mt-2 max-w-md text-center text-sm leading-6 text-cyan-100 md:text-base"
              >
                Visualizing the decision architecture of artificial cognition
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showButton && (
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              onClick={handleGetStarted}
              onMouseEnter={() => systemRef.current?.setSideView(true)}
              onMouseLeave={() => systemRef.current?.setSideView(false)}
              onFocus={() => systemRef.current?.setSideView(true)}
              onBlur={() => systemRef.current?.setSideView(false)}
              className="btn-get-started pointer-events-auto mt-10 rounded-full border border-cyan-300/20 bg-white/[0.04] px-10 py-3 text-sm uppercase tracking-[0.28em] text-cyan-100 backdrop-blur-xl transition-all hover:border-cyan-300/40 hover:bg-white/[0.08] hover:text-white"
              aria-label="Get Started - Enter MCTS Visualizer"
            >
              Get Started
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}