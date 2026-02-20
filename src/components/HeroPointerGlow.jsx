import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroPointerGlow({ containerRef, variant }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Inertie = spring (feeling)
  // Plus stiffness est grand => suit plus vite (moins d'inertie)
  // Plus damping est grand => s'arrête plus vite (moins d'oscillation)
  const sx = useSpring(x, { stiffness: 220, damping: 88, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 88, mass: 0.6 });

  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;

    // Désactive mobile + reduced motion
    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;
    const finePointer = window.matchMedia?.("(pointer: fine)")?.matches;
    if (prefersReduced || !finePointer) return;

    // Position initiale = centre du hero
    const r0 = el.getBoundingClientRect();
    x.set(r0.width * 0.55);
    y.set(r0.height * 0.45);

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
      if (!active) setActive(true);
    };

    const onEnter = () => setActive(true);
    const onLeave = () => setActive(false);

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [containerRef, x, y, active]);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-5"
      aria-hidden="true"
    >
      {/* ======= VARIANT: BEAM (console) ======= */}
      {variant === "beam" && (
        <motion.div
          className="absolute top-0 bottom-0"
          style={{
            left: sx,
            x: "-50%",
            width: 240,
            opacity: active ? 1 : 0,
            transition: "opacity 220ms ease-out",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(20,184,166,0.03) 35%, rgba(20,184,166,0.08) 50%, rgba(20,184,166,0.03) 65%, transparent 100%)",
            filter: "blur(8px)",
            mixBlendMode: "screen",
          }}
        />
      )}

      {/* ======= VARIANT: ORB  ======= */}
      {variant === "orb" && (
        <motion.div
          className="absolute"
          style={{
            left: sx,
            top: sy,
            x: "-50%",
            y: "-50%",
            width: 420,
            height: 420,
            opacity: active ? 1 : 0,
            transition: "opacity 220ms ease-out",
            background:
              "radial-gradient(circle, rgba(20,184,166,0.12) 0%, rgba(20,184,166,0.05) 44%, transparent 72%)",
            filter: "blur(12px)",
            mixBlendMode: "screen",
          }}
        />
      )}
    </motion.div>
  );
}
