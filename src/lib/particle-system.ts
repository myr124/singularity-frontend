import {
  generateBrainPoints,
  generateSideBrainTargets,
  type BrainNode,
} from "./brain-shape";

export type Phase = "drift" | "converge" | "zoom";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  frontX: number;
  frontY: number;
  sideX: number;
  sideY: number;
  swayPhase: number;
  swayAmp: number;
  size: number;
  alpha: number;
  hue: number;
  neighbors: number[]; // Indices of connected particles
}

export class ParticleSystem {
  private particles: Particle[] = [];
  private brainNodes: BrainNode[] = [];
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width = 0;
  private height = 0;
  private dpr = 1;
  private mouseX = -9999;
  private mouseY = -9999;
  private phase: Phase = "drift";
  private animationId = 0;
  private zoomProgress = 0;
  private onZoomComplete?: () => void;
  private reducedMotion = false;
  private autoConvergeTimer: ReturnType<typeof setTimeout> | null = null;
  private sideBlend = 0;
  private sideViewActive = false;
  private sprites: HTMLCanvasElement[] = [];
  private readonly spriteCount = 6;
  private readonly spriteSize = 64;
  private readonly hueMin = 185;
  private readonly hueMax = 215;

  setSideView(active: boolean) {
    this.sideViewActive = active;
  }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D not supported");
    this.ctx = ctx;

    this.reducedMotion = globalThis.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    this.buildSprites();
  }

  private buildSprites() {
    const s = this.spriteSize;
    for (let i = 0; i < this.spriteCount; i++) {
      const hue =
        this.hueMin + (this.hueMax - this.hueMin) * (i / (this.spriteCount - 1));
      const c = document.createElement("canvas");
      c.width = s;
      c.height = s;
      const g = c.getContext("2d")!;
      const r = s / 2;
      const grad = g.createRadialGradient(r, r, 0, r, r, r);
      grad.addColorStop(0, `hsla(${hue}, 100%, 85%, 1)`);
      grad.addColorStop(0.5, `hsla(${hue}, 95%, 65%, 0.5)`);
      grad.addColorStop(1, `hsla(${hue}, 85%, 45%, 0)`);
      g.fillStyle = grad;
      g.fillRect(0, 0, s, s);
      this.sprites.push(c);
    }
  }

  private pickSprite(hue: number): HTMLCanvasElement {
    const t = (hue - this.hueMin) / (this.hueMax - this.hueMin);
    const idx = Math.max(
      0,
      Math.min(this.spriteCount - 1, Math.round(t * (this.spriteCount - 1))),
    );
    return this.sprites[idx]!;
  }

  init(count = 2000) {
    this.brainNodes = generateBrainPoints(count);
    const sideTargets = generateSideBrainTargets(count);
    this.dpr = globalThis.devicePixelRatio ?? 1;

    this.particles = this.brainNodes.map((node, i) => {
      const startX = Math.random();
      const startY = Math.random();
      const side = sideTargets[i]!;
      return {
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 0.002,
        vy: (Math.random() - 0.5) * 0.002,
        targetX: node.x,
        targetY: node.y,
        frontX: node.x,
        frontY: node.y,
        sideX: side.x,
        sideY: side.y,
        swayPhase: Math.random() * Math.PI * 2,
        swayAmp: 0.6 + Math.random() * 0.8,
        size: 1.5 + Math.random() * 2.5,
        alpha: 0.4 + Math.random() * 0.5,
        hue: 185 + Math.random() * 30,
        neighbors: node.neighbors,
      };
    });

    this.handleResize();
    if (this.reducedMotion) {
      this.phase = "converge";
      this.snapToTargets();
    } else {
      // Auto-converge after 3 seconds if user hasn't interacted
      this.autoConvergeTimer = setTimeout(() => {
        if (this.phase === "drift") {
          this.phase = "converge";
        }
      }, 3000);
    }
    this.loop();
  }

  handleResize = () => {
    const rect = this.canvas.parentElement?.getBoundingClientRect();
    if (!rect) return;
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  };

  private snapToTargets() {
    for (const p of this.particles) {
      p.x = p.targetX;
      p.y = p.targetY;
      p.vx = 0;
      p.vy = 0;
    }
  }

  handleMouseMove = (e: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    this.mouseX = (e.clientX - rect.left) / this.width;
    this.mouseY = (e.clientY - rect.top) / this.height;
    if (this.phase === "drift") {
      this.phase = "converge";
      if (this.autoConvergeTimer) {
        clearTimeout(this.autoConvergeTimer);
        this.autoConvergeTimer = null;
      }
    }
  };

  handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 0) return;
    const rect = this.canvas.getBoundingClientRect();
    this.mouseX =
      (e.touches[0]!.clientX - rect.left) / this.width;
    this.mouseY =
      (e.touches[0]!.clientY - rect.top) / this.height;
    if (this.phase === "drift") {
      this.phase = "converge";
      if (this.autoConvergeTimer) {
        clearTimeout(this.autoConvergeTimer);
        this.autoConvergeTimer = null;
      }
    }
  };

  handleMouseLeave = () => {
    this.mouseX = -9999;
    this.mouseY = -9999;
  };

  startZoom(onComplete: () => void) {
    this.onZoomComplete = onComplete;
    this.phase = "zoom";
    this.zoomProgress = 0;
  }

  private stopped = false;

  private loop = () => {
    if (this.stopped) return;
    this.update();
    if (this.stopped) return;
    this.draw();
    this.animationId = requestAnimationFrame(this.loop);
  };

  private update() {
    const dt = 1;
    const mouseRadius = 0.08;

    if (this.phase === "zoom") {
      this.zoomProgress += 0.007;
      if (this.zoomProgress >= 1) {
        this.stopped = true;
        cancelAnimationFrame(this.animationId);
        const cb = this.onZoomComplete;
        this.onZoomComplete = undefined;
        cb?.();
        return;
      }
    }

    const blendTarget = this.phase !== "zoom" && this.sideViewActive ? 1 : 0;
    this.sideBlend += (blendTarget - this.sideBlend) * 0.06;

    const t = performance.now() * 0.001;
    const swayStrength = (1 - this.sideBlend) * 0.012;

    for (const p of this.particles) {
      const baseX = p.frontX + (p.sideX - p.frontX) * this.sideBlend;
      const baseY = p.frontY + (p.sideY - p.frontY) * this.sideBlend;
      const sx = Math.sin(t * 0.7 + p.swayPhase) * p.swayAmp * swayStrength;
      const sy = Math.cos(t * 0.5 + p.swayPhase * 1.3) * p.swayAmp * swayStrength;
      p.targetX = baseX + sx;
      p.targetY = baseY + sy;
      // Mouse repulsion
      const dx = p.x - this.mouseX;
      const dy = p.y - this.mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      if (dist < mouseRadius) {
        const force = ((mouseRadius - dist) / mouseRadius) * 0.003;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }

      if (this.phase === "drift") {
        p.vx += (Math.random() - 0.5) * 0.0004;
        p.vy += (Math.random() - 0.5) * 0.0004;
      }

      if (this.phase === "converge" || this.phase === "zoom") {
        const springK = this.phase === "zoom" ? 0.12 : 0.06;
        const damping = this.phase === "zoom" ? 0.85 : 0.90;

        p.vx += (p.targetX - p.x) * springK;
        p.vy += (p.targetY - p.y) * springK;
        p.vx *= damping;
        p.vy *= damping;
      }

      if (this.phase === "drift") {
        p.vx *= 0.98;
        p.vy *= 0.98;
      }

      p.x += p.vx * dt;
      p.y += p.vy * dt;

      // Soft boundary
      if (p.x < 0) { p.x = 0; p.vx *= -0.5; }
      if (p.x > 1) { p.x = 1; p.vx *= -0.5; }
      if (p.y < 0) { p.y = 0; p.vy *= -0.5; }
      if (p.y > 1) { p.y = 1; p.vy *= -0.5; }
    }
  }

  private draw() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.clearRect(0, 0, w, h);

    if (this.phase === "zoom") {
      const scale = 1 + this.zoomProgress * 1.5;
      const offsetX = w * 0.5 * (1 - scale);
      const offsetY = h * 0.5 * (1 - scale);
      ctx.save();
      ctx.translate(offsetX, offsetY);
      ctx.scale(scale, scale);
    }

    // Draw edges first (behind particles). Skip during zoom — barely visible and expensive.
    if (this.phase !== "zoom") {
      this.drawEdges();
    }

    // Draw particles on top
    ctx.globalCompositeOperation = "lighter";

    const spriteSize = this.spriteSize;
    for (const p of this.particles) {
      const sx = p.x * w;
      const sy = p.y * h;
      const baseSize = p.size * (w / 1000);
      // During zoom, ctx.scale already grows the sprite — avoid compounding it.
      const size = baseSize;
      const alpha = this.phase === "zoom"
        ? Math.min(1, p.alpha + this.zoomProgress * 0.6)
        : p.alpha;

      const draw = size * 2;
      ctx.globalAlpha = alpha;
      ctx.drawImage(
        this.pickSprite(p.hue),
        sx - draw / 2,
        sy - draw / 2,
        draw,
        draw,
      );
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";

    if (this.phase === "zoom") {
      ctx.restore();

      // White flash overlay
      const flashAlpha = Math.max(0, (this.zoomProgress - 0.6) / 0.4);
      ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha})`;
      ctx.fillRect(0, 0, w, h);
    }
  }

  private drawEdges() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    
    // Edge opacity varies by phase:
    // - drift: visible network
    // - converge: fading out as particles lock into position
    // - zoom: minimal edges
    let baseEdgeAlpha: number;
    if (this.phase === "drift") {
      baseEdgeAlpha = 0.14;
    } else if (this.phase === "converge") {
      baseEdgeAlpha = 0.10;
    } else {
      baseEdgeAlpha = 0.03;
    }

    ctx.lineWidth = 0.6;
    const maxEdgeDist = this.phase === "drift" ? 0.18 : 0.12;

    // Batch edges into a few alpha buckets to minimize strokeStyle changes.
    const buckets = 4;
    const bucketPaths: Path2D[] = [];
    for (let b = 0; b < buckets; b++) bucketPaths.push(new Path2D());

    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i]!;
      for (const neighborIdx of p1.neighbors) {
        if (neighborIdx <= i) continue; // draw each edge once
        const p2 = this.particles[neighborIdx]!;
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > maxEdgeDist) continue;

        const distAlpha = 1 - dist / maxEdgeDist;
        if (distAlpha < 0.1) continue;
        const b = Math.min(buckets - 1, Math.floor(distAlpha * buckets));
        const path = bucketPaths[b]!;
        path.moveTo(p1.x * w, p1.y * h);
        path.lineTo(p2.x * w, p2.y * h);
      }
    }

    for (let b = 0; b < buckets; b++) {
      const frac = (b + 0.5) / buckets;
      const a = baseEdgeAlpha * frac;
      if (a < 0.01) continue;
      ctx.strokeStyle = `rgba(115, 240, 255, ${a})`;
      ctx.stroke(bucketPaths[b]!);
    }
  }

  destroy() {
    cancelAnimationFrame(this.animationId);
    if (this.autoConvergeTimer) {
      clearTimeout(this.autoConvergeTimer);
    }
  }
}