import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import HeroPointerGlow from "./HeroPointerGlow";
import SignalRotator from "./SignalRotator";

function CTA({ onClick, children, subtle = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "mono text-[12px] tracking-[0.14em] border px-5 py-3",
        subtle
          ? "border-white/10 text-white/65 hover:text-white hover:border-white/20"
          : "border-white/15 text-white/80 hover:text-white",
      ].join(" ")}
    >
      {children} <span className="text-white/40">→</span>
    </button>
  );
}

function Ticker({ items = [] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!items.length) return;
    const id = setInterval(() => setI((v) => (v + 1) % items.length), 2200);
    return () => clearInterval(id);
  }, [items.length]);

  const current = items[i] ?? "";

  return (
    <div className="relative overflow-hidden">
      <motion.div
        key={current}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mono text-[12px] tracking-[0.14em] text-white/55"
      >
        {current}
      </motion.div>
    </div>
  );
}

function HeroBoot({ done }) {
  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          className="pointer-events-none absolute inset-0 z-20"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <motion.div
            className="absolute top-0 bottom-0 w-130"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)",
            }}
            initial={{ x: "-60%" }}
            animate={{ x: "280%" }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.08, 0] }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{
              background:
                "radial-gradient(900px 520px at 40% 40%, rgba(20,184,166,0.12), transparent 62%)",
            }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function HeroAccents() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* marqueurs discrets (L-corners) — desktop only */}
      <div className="absolute left-3 sm:left-6 lg:left-12 top-16 sm:top-20 h-10 w-10 border-l border-t border-white/10" />
      <div className="absolute right-3 sm:right-6 lg:right-12 top-16 sm:top-20 h-10 w-10 border-r border-t border-white/10" />
      <div className="absolute left-3 sm:left-6 lg:left-12 bottom-16 sm:bottom-20 h-10 w-10 border-l border-b border-white/10" />
      <div className="absolute right-3 sm:right-6 lg:right-12 bottom-16 sm:bottom-20 h-10 w-10 border-r border-b border-white/10" />

      {/* mini accent teal */}
      <div className="absolute left-6 sm:left-12 top-16 sm:top-20 h-px w-36 sm:w-44 bg-teal-400/55" />
    </div>
  );
}

export default function HeroIntro({ onJump }) {
  const heroRef = useRef(null);
  const [bootDone, setBootDone] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setBootDone(true), 950);
    return () => clearTimeout(id);
  }, []);

  return (
    <div ref={heroRef} className="relative h-full w-full">
      <HeroAccents />
      <HeroBoot done={bootDone} />

      <HeroPointerGlow containerRef={heroRef} variant="beam" />

      {/* HUD TOP */}
      <div
        className={[
          "absolute flex items-center justify-between",
          "top-6 left-6 right-6",
          "sm:top-8 sm:left-8 sm:right-8",
          "lg:top-10 lg:left-12 lg:right-12",
        ].join(" ")}
      >
        <div className="mono text-[10px] sm:text-[12px] tracking-[0.14em] text-white/45">
          STATUS / PROFIL
        </div>

        <div className="mono text-[10px] sm:text-[12px] tracking-[0.14em] text-white/45">
          SIGNAL · LIVE
        </div>
      </div>

      <div
        className={[
          "relative h-full",
          "px-6 sm:px-8 lg:px-12",
          "pt-32 sm:pt-36 lg:pt-0",
        ].join(" ")}
      >
        <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-start lg:items-center">
          {/* GAUCHE */}
          <div className="lg:col-span-6">
            <motion.h1
              className="text-[44px] sm:text-[64px] lg:text-[92px] leading-[0.92] tracking-[-0.06em] font-semibold text-white"
              initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              Aurélie Weber
            </motion.h1>

            <motion.div
              className="mt-6 flex items-center gap-5 flex-wrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.45, ease: "easeOut" }}
            >
              <div className="mono text-[12px] tracking-[0.14em] text-white/75">
                FRONT-END DEVELOPER · REACT
              </div>
              <div className="h-px w-32 sm:w-48 lg:w-55 bg-teal-400/70" />
            </motion.div>

            <motion.p
              className="mt-8 text-[15px] sm:text-[16px] leading-relaxed text-white/80 max-w-[56ch]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14, duration: 0.45, ease: "easeOut" }}
            >
              Des interfaces claires, rapides et soignées — conçues pour un
              usage réel.
            </motion.p>

            <motion.div
              className="mt-10 mb-14 sm:mb-16 lg:mb-0 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.45, ease: "easeOut" }}
            >
              <CTA onClick={() => onJump?.("work")}>VOIR LES PROJETS</CTA>
              <CTA subtle onClick={() => onJump?.("contact")}>
                ME CONTACTER
              </CTA>
            </motion.div>
          </div>

          {/* DROITE — DESKTOP ONLY */}
          <div className="hidden lg:block lg:col-span-6">
            <motion.div
              className="border-l border-white/10 pl-10 h-130 flex flex-col justify-between"
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.18, duration: 0.5, ease: "easeOut" }}
            >
              <SignalRotator />

              <div className="pt-4 flex items-center gap-6">
                <div className="mono text-[12px] tracking-[0.14em] text-white/40">
                  FEED
                </div>

                <div className="relative flex-1">
                  <div className="absolute left-0 right-0 -top-2 h-px bg-white/10" />

                  <Ticker
                    items={[
                      "STACK: React · Vite · Tailwind v4",
                      "FOCUS: UX · rythme · lisibilité",
                      "MOTION: transitions · reveal · scroll",
                      "CIBLE: interfaces “produit fini”",
                    ]}
                  />
                </div>

                <div className="h-2 w-2 border border-white/25">
                  <motion.div
                    className="h-full w-full bg-teal-400/70"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* HUD bas */}
        <div
          className={[
            // MOBILE: dans le flow (pas d'overlay)
            "mt-10 flex flex-col gap-2",
            // DESKTOP: overlay
            "lg:mt-0 lg:absolute lg:bottom-12 lg:left-12 lg:right-12 lg:flex-row lg:items-center lg:justify-between",
          ].join(" ")}
        >
          <div className="mono text-[10px] sm:text-[12px] tracking-[0.14em] text-white/40">
            VERDUN · METZ · NANCY · REMOTE POSSIBLE
          </div>
          <div className="mono text-[10px] sm:text-[12px] tracking-[0.14em] text-white/40">
            UTC+1 · DISPONIBLE
          </div>
        </div>
      </div>
    </div>
  );
}
