"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Chromatic glass hourglass, canvas edition: two wireframe cones tip-to-tip
 * drawn in three hue-split passes with additive blending, tumbling slowly and
 * tilting toward the cursor, with specular streaks running the cone edges.
 * Pauses offscreen; renders a single static frame under reduced motion.
 * Swap-ready: replace this component with a rendered .webm loop any time.
 */
export default function Hourglass({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = false;
    let t = Math.PI / 5; // start on an elegant tilt
    const pointer = { target: 0, value: 0 };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    resize();

    const PASSES: [string, number][] = [
      ["rgba(255, 90, 70, 0.55)", -0.05],
      ["rgba(120, 235, 160, 0.5)", 0],
      ["rgba(120, 140, 255, 0.6)", 0.05],
    ];

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const R = w * 0.24;
      const H = h * 0.3;
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2);
      pointer.value += (pointer.target - pointer.value) * 0.06;
      // Continuous tumble — a full revolution roughly every 12 seconds.
      ctx.rotate(t * 0.52 + pointer.value);

      ctx.globalCompositeOperation = "lighter";
      for (const [color, offset] of PASSES) {
        ctx.save();
        ctx.rotate(offset);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2 * dpr;
        // rims
        ctx.beginPath();
        ctx.ellipse(0, -H, R, R * 0.24, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(0, H, R, R * 0.24, 0, 0, Math.PI * 2);
        ctx.stroke();
        // cone edges
        ctx.beginPath();
        ctx.moveTo(-R, -H);
        ctx.lineTo(0, 0);
        ctx.lineTo(R, -H);
        ctx.moveTo(-R, H);
        ctx.lineTo(0, 0);
        ctx.lineTo(R, H);
        ctx.stroke();
        ctx.restore();
      }

      // specular streaks travelling the edges
      for (let i = 0; i < 4; i++) {
        const phase = (Math.sin(t * 0.9 + i * 1.7) + 1) / 2;
        const side = i % 2 === 0 ? -1 : 1;
        const vert = i < 2 ? -1 : 1;
        const x = side * R * (1 - phase);
        const y = vert * H * (1 - phase);
        const grad = ctx.createRadialGradient(x, y, 0, x, y, R * 0.22);
        grad.addColorStop(0, "rgba(255,255,255,0.85)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, R * 0.22, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      t += 0.016;
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      draw(); // one elegant still
      return;
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.target =
        ((e.clientX - rect.left) / rect.width - 0.5) * 0.5;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className={`opacity-80 ${className}`} aria-hidden />;
}
