"use client";

import { useRef, type ReactNode } from "react";

// A restrained pointer-driven 3D tilt. Max ~5° so it reads as depth, never
// as a gimmick. Disabled for coarse pointers (touch) and reduced motion.
export function Tilt({
  children,
  className = "",
  max = 5,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${px * max * 2}deg) rotateX(${-py * max * 2}deg)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div className={`tilt-scene ${className}`}>
      <div
        ref={ref}
        className="tilt h-full"
        onPointerMove={onMove}
        onPointerLeave={reset}
      >
        {children}
      </div>
    </div>
  );
}
