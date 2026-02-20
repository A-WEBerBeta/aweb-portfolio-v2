import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function RailTooltipFixed({ open, x, y, label, meta }) {
  if (!open) return null;

  return (
    <div
      className="fixed z-9999 pointer-events-none"
      style={{ left: x, top: y, transform: "translateY(-50%)" }}
    >
      <div className="border border-white/12 bg-[rgba(10,11,13,0.92)] backdrop-blur-[2px] px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
        <div className="mono text-[11px] tracking-[0.18em] text-white/45">
          SECTION
        </div>
        <div className="mt-1 text-[14px] text-white/85 whitespace-nowrap">
          {label}
        </div>
        {meta ? (
          <div className="mt-1 mono text-[11px] tracking-[0.14em] text-white/35 whitespace-nowrap">
            {meta}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function SideNav({
  sections,
  activeId,
  collapsed,
  onToggle,
  onJump,
  variant = "rail", // "rail" | "drawer"
  open = true,
  onClose,
}) {
  const isDrawer = variant === "drawer";

  // en drawer, on force une largeur stable (pas de mode collapsed)
  const railWidth = collapsed ? 88 : 320;
  const navWidth = isDrawer ? 320 : railWidth;

  const [tip, setTip] = useState({
    open: false,
    x: 0,
    y: 0,
    label: "",
    meta: "",
  });

  const closeTip = () => setTip((t) => ({ ...t, open: false }));

  // tooltip: utile uniquement en rail collapsed
  useEffect(() => {
    if (isDrawer) return;
    if (!collapsed) return;
    const onAny = () => closeTip();
    window.addEventListener("scroll", onAny, true);
    window.addEventListener("resize", onAny);
    return () => {
      window.removeEventListener("scroll", onAny, true);
      window.removeEventListener("resize", onAny);
    };
  }, [collapsed, isDrawer]);

  const tipX = useMemo(() => navWidth + 14, [navWidth]);

  const openTipFromEl = (el, label, meta) => {
    const r = el.getBoundingClientRect();
    setTip({
      open: true,
      x: tipX,
      y: r.top + r.height / 2,
      label,
      meta: meta ?? "",
    });
  };

  // ESC pour fermer le drawer
  useEffect(() => {
    if (!isDrawer || !open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isDrawer, open, onClose]);

  const content = (
    <>
      {/* Grain / texture (dans la nav) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "220px 220px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />

      {/* Contenu */}
      <div className="relative z-10 flex flex-col h-full min-h-0">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mono ui-micro text-white/55 tracking-[0.22em]">
              {!isDrawer && collapsed ? "AW" : "PORTFOLIO"}
            </div>

            {/* en drawer: on affiche toujours le header complet */}
            {(!isDrawer && !collapsed) || isDrawer ? (
              <>
                <div className="mt-2 truncate text-[18px] font-semibold text-white tracking-[0.06em] leading-tight">
                  Aurélie Weber
                </div>

                <div className="mt-2 mono ui-micro text-white/45">
                  FRONT-END DEVELOPER · REACT
                </div>
              </>
            ) : null}
          </div>

          {/* bouton toggle seulement en rail */}
          {!isDrawer ? (
            <button
              onClick={onToggle}
              className={[
                "mono h-9 w-9 border border-white/15 text-white/70 hover:text-white",
                "bg-white/2 hover:bg-white/4 transition-colors",
              ].join(" ")}
              aria-label="Réduire/agrandir la barre latérale"
              title="Réduire/agrandir"
              type="button"
            >
              {collapsed ? "→" : "←"}
            </button>
          ) : (
            <button
              onClick={onClose}
              className={[
                "mono h-9 w-9 border border-white/15 text-white/70 hover:text-white",
                "bg-white/2 hover:bg-white/4 transition-colors",
              ].join(" ")}
              aria-label="Fermer le menu"
              title="Fermer"
              type="button"
            >
              ×
            </button>
          )}
        </div>

        {/* Sections (scroll vertical seulement) */}
        <div className="mt-12 space-y-1 flex-1 min-h-0 overflow-y-auto pr-1">
          {sections.map((s, idx) => {
            const isActive = s.id === activeId;

            return (
              <button
                key={s.id}
                onClick={() => {
                  onJump(s.id);
                  if (isDrawer) onClose?.();
                }}
                type="button"
                className={[
                  "group relative flex w-full items-center gap-3 py-3 text-left",
                  "border-b border-white/5",
                  "hover:bg-white/2 transition-colors",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20",
                ].join(" ")}
                onMouseEnter={(e) => {
                  if (isDrawer) return;
                  if (!collapsed) return;
                  openTipFromEl(e.currentTarget, s.label, s.meta);
                }}
                onMouseLeave={() => {
                  if (isDrawer) return;
                  if (!collapsed) return;
                  closeTip();
                }}
                onFocus={(e) => {
                  if (isDrawer) return;
                  if (!collapsed) return;
                  openTipFromEl(e.currentTarget, s.label, s.meta);
                }}
                onBlur={() => {
                  if (isDrawer) return;
                  if (!collapsed) return;
                  closeTip();
                }}
              >
                <div className="w-10 mono ui-micro text-white/35 tabular-nums">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                {/* en drawer: on force l’affichage complet */}
                {(!isDrawer && !collapsed) || isDrawer ? (
                  <div className="relative flex-1 min-w-0">
                    <div
                      className={[
                        "truncate ui-body",
                        isActive ? "text-white" : "text-white/70",
                      ].join(" ")}
                    >
                      {s.label}
                    </div>

                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-1 overflow-hidden mono ui-micro text-white/40"
                      >
                        {s.meta}
                      </motion.div>
                    </AnimatePresence>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          layoutId={isDrawer ? undefined : "activeLine"}
                          className="absolute -left-14 top-1/2 h-px w-10 bg-white/70"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                ) : null}

                <div className="h-2 w-2 border border-white/25">
                  <div
                    className={[
                      "h-full w-full",
                      isActive ? "bg-teal-400/80" : "bg-transparent",
                    ].join(" ")}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Social */}
        <div className="mt-6 border-t border-white/10 pt-4">
          {((!isDrawer && !collapsed) || isDrawer) && (
            <div className="mono ui-micro text-white/40">SOCIAL</div>
          )}

          <div
            className={
              collapsed && !isDrawer ? "mt-0 space-y-2" : "mt-3 space-y-2"
            }
          >
            <a
              href="https://github.com/A-WEBerBeta"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              aria-label="GitHub"
              title="GitHub"
            >
              <div className="flex h-10 w-10 items-center justify-center border border-white/15 bg-white/2 group-hover:bg-white/4 transition-colors">
                <Github className="h-4 w-4 opacity-80 group-hover:opacity-100" />
              </div>
              {((!isDrawer && !collapsed) || isDrawer) && (
                <span className="ui-meta">GitHub</span>
              )}
            </a>

            <a
              href="https://www.linkedin.com/in/aur%C3%A9lie-weber-a354b1340/"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <div className="flex h-10 w-10 items-center justify-center border border-white/15 bg-white/2 group-hover:bg-white/4 transition-colors">
                <Linkedin className="h-4 w-4 opacity-80 group-hover:opacity-100" />
              </div>
              {((!isDrawer && !collapsed) || isDrawer) && (
                <span className="ui-meta">LinkedIn</span>
              )}
            </a>
          </div>
        </div>

        {/* System + credits */}
        <div className="mt-6 border-t border-white/10 pt-4">
          <div className="mono ui-micro text-white/40">
            {!isDrawer && collapsed ? "SYS" : "SYSTEM"}
          </div>

          <div
            className={[
              "mt-2 text-white/70",
              !isDrawer && collapsed ? "mono ui-micro" : "ui-meta",
            ].join(" ")}
          >
            {!isDrawer && collapsed
              ? "R · V · T · M"
              : "React · Vite · Tailwind · Motion"}
          </div>

          <div className="mt-3 mono ui-micro text-white/35 tracking-[0.14em]">
            BUILD — AW · © 2026
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Overlay + drawer */}
      <AnimatePresence>
        {isDrawer && open && (
          <motion.button
            type="button"
            aria-label="Fermer le menu"
            onClick={onClose}
            className="fixed inset-0 z-90 bg-black/55 backdrop-blur-[1px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(!isDrawer || open) && (
          <motion.aside
            className={[
              "fixed left-0 top-0 h-dvh border-r border-white/10",
              "bg-[rgba(10,11,13,0.78)] backdrop-blur-[2px]",
              "shadow-[inset_-1px_0_0_rgba(255,255,255,0.06)]",
              "px-4 py-6 flex flex-col",
              isDrawer ? "z-100 w-[320px]" : "z-30",
              !isDrawer && (collapsed ? "w-22" : "w-[320px]"),
            ].join(" ")}
            initial={isDrawer ? { x: -360 } : false}
            animate={isDrawer ? { x: 0 } : false}
            exit={isDrawer ? { x: -360 } : false}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {content}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Tooltip global (hors du scroll) : rail only */}
      {!isDrawer && <RailTooltipFixed {...tip} />}
    </>
  );
}
