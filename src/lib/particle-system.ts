import { generateBrainPoints, type BrainNode } from "./brain-shape";

export type Phase = "drift" | "converge" | "zoom";

interface Particle {
  // Current 2D position (normalized 0..1, canvas space)
  x: number;
  y: number;
  vx: number;
  vy: number;
  // Base 3D position in brain-local space (roughly [-0.5, 0.5])
  bx: number;
  by: number;
  bz: number;
  // Per-frame projected target
  targetX: number;
  targetY: number;
  depth: number; // 0 (far) .. 1 (near), set during projection
  swayPhase: number;
  swayAmp: number;
  size: number;
  alpha: number;
  hue: number;
  neighbors: number[];
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
  private sideViewActive = false;
  // Camera rotation around vertical axis (radians). Auto-drifts + side view.
  private yaw = 0;
  private targetYaw = 0;
  // Slight fixed tilt gives the brain perceptible depth even head-on.
  private readonly pitch = -0.18;
  private sprites: HTMLCanvasElement[] = [];
  private readonly spriteCount = 6;
  private readonly spriteSize = 64;
  private readonly hueMin = 185;
  private readonly hueMax = 215;
  // Perspective / projection constants
  private readonly focal = 1.6;
  private readonly projScale = 0.58;

  setSideView(active: boolean) {
    this.sideViewActive = active;
    if (this.phase === "zoom") return;
    this.phase = active ? "converge" : "drift";
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
    this.dpr = globalThis.devicePixelRatio ?? 1;

    this.particles = this.brainNodes.map((node) => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.002,
      vy: (Math.random() - 0.5) * 0.002,
      bx: node.x,
      by: node.y,
      bz: node.z,
      targetX: 0.5,
      targetY: 0.5,
      depth: 0.5,
      swayPhase: Math.random() * Math.PI * 2,
      swayAmp: 0.6 + Math.random() * 0.8,
      size: 1.6 + Math.random() * 2.2,
      alpha: 0.45 + Math.random() * 0.45,
      hue: 185 + Math.random() * 30,
      neighbors: node.neighbors,
    }));

    this.handleResize();
    if (this.reducedMotion) {
      this.phase = "converge";
      this.projectAll();
      this.snapToTargets();
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
  };

  handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 0) return;
    const rect = this.canvas.getBoundingClientRect();
    this.mouseX = (e.touches[0]!.clientX - rect.left) / this.width;
    this.mouseY = (e.touches[0]!.clientY - rect.top) / this.height;
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

  // Project a 3D brain-space point to normalized canvas coords + depth.
  // Depth returned is in [0..1], 1 = nearest to camera.
  private project(
    bx: number,
    by: number,
    bz: number,
    cosY: number,
    sinY: number,
    cosP: number,
    sinP: number,
  ): { x: number; y: number; depth: number } {
    // Yaw around Y axis
    const rx = bx * cosY + bz * sinY;
    const rz = -bx * sinY + bz * cosY;
    // Pitch around X axis
    const ry = by * cosP - rz * sinP;
    const rz2 = by * sinP + rz * cosP;
    // Perspective: points with larger z (toward camera) appear larger
    const f = this.focal;
    const pScale = f / (f - rz2); // rz2 closer to f → bigger
    const x = 0.5 + rx * pScale * this.projScale;
    const y = 0.5 + ry * pScale * this.projScale;
    // Normalize depth into [0..1]. rz2 roughly in [-0.5, 0.5].
    const depth = Math.max(0, Math.min(1, 0.5 + rz2));
    return { x, y, depth };
  }

  private projectAll() {
    const cosY = Math.cos(this.yaw);
    const sinY = Math.sin(this.yaw);
    const cosP = Math.cos(this.pitch);
    const sinP = Math.sin(this.pitch);
    for (const p of this.particles) {
      const proj = this.project(p.bx, p.by, p.bz, cosY, sinY, cosP, sinP);
      p.targetX = proj.x;
      p.targetY = proj.y;
      p.depth = proj.depth;
    }
  }

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

    // Smoothly drive yaw toward side-view (≈90°) or rest pose.
    const t = performance.now() * 0.001;
    const idleYaw = Math.sin(t * 0.25) * 0.35; // gentle auto-rotation
    this.targetYaw =
      this.phase !== "zoom" && this.sideViewActive ? Math.PI * 0.5 : idleYaw;
    this.yaw += (this.targetYaw - this.yaw) * 0.05;

    const cosY = Math.cos(this.yaw);
    const sinY = Math.sin(this.yaw);
    const cosP = Math.cos(this.pitch);
    const sinP = Math.sin(this.pitch);

    const swayStrength = 0.008;

    for (const p of this.particles) {
      // Project 3D base position to 2D + depth this frame
      const proj = this.project(p.bx, p.by, p.bz, cosY, sinY, cosP, sinP);
      const sx = Math.sin(t * 0.7 + p.swayPhase) * p.swayAmp * swayStrength;
      const sy =
        Math.cos(t * 0.5 + p.swayPhase * 1.3) * p.swayAmp * swayStrength;
      p.targetX = proj.x + sx;
      p.targetY = proj.y + sy;
      p.depth = proj.depth;

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
        const damping = this.phase === "zoom" ? 0.85 : 0.9;
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

    // Sort particles back-to-front so front particles draw on top.
    // Additive blending with depth-modulated alpha already gives the
    // volumetric look; the sort just keeps the brightest highlights front.
    const order = this.particles
      .map((_, i) => i)
      .sort((a, b) => this.particles[a]!.depth - this.particles[b]!.depth);

    if (this.phase !== "zoom") {
      this.drawEdges(order);
    }

    ctx.globalCompositeOperation = "lighter";

    for (const i of order) {
      const p = this.particles[i]!;
      const sx = p.x * w;
      const sy = p.y * h;
      // Depth shading: nearer particles are larger and brighter.
      // Far particles fade into the background for a sense of volume.
      const depthSize = 0.45 + p.depth * 0.95;
      const depthAlpha = 0.3 + p.depth * 0.9;
      const baseSize = p.size * (w / 1000) * depthSize;
      const alpha =
        this.phase === "zoom"
          ? Math.min(1, p.alpha + this.zoomProgress * 0.6)
          : p.alpha * depthAlpha;

      const draw = baseSize * 2;
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
      const flashAlpha = Math.max(0, (this.zoomProgress - 0.6) / 0.4);
      ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha})`;
      ctx.fillRect(0, 0, w, h);
    }
  }

  private drawEdges(order: number[]) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    let baseEdgeAlpha: number;
    if (this.phase === "drift") baseEdgeAlpha = 0.14;
    else if (this.phase === "converge") baseEdgeAlpha = 0.1;
    else baseEdgeAlpha = 0.03;

    ctx.lineWidth = 0.6;
    const maxEdgeDist = this.phase === "drift" ? 0.18 : 0.12;

    const buckets = 4;
    const bucketPaths: Path2D[] = [];
    for (let b = 0; b < buckets; b++) bucketPaths.push(new Path2D());

    // Iterate in any order for edge drawing (render order only matters for fill).
    void order;
    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i]!;
      for (const j of p1.neighbors) {
        if (j <= i) continue;
        const p2 = this.particles[j]!;
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > maxEdgeDist) continue;

        const distAlpha = 1 - dist / maxEdgeDist;
        if (distAlpha < 0.1) continue;
        // Fold the pair's depth into the bucket so far edges fade.
        const depthAvg = (p1.depth + p2.depth) * 0.5;
        const combined = distAlpha * (0.35 + depthAvg * 0.9);
        const b = Math.min(buckets - 1, Math.floor(combined * buckets));
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
  }
}
