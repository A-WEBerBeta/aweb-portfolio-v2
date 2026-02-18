import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

export default function SideNav({
  sections,
  activeId,
  collapsed,
  onToggle,
  onJump,
}) {
  return (
    <aside
      className={[
        "fixed left-0 top-0 h-dvh border-r border-white/10",
        "bg-[rgba(10,11,13,0.78)] backdrop-blur-[2px]",
        "shadow-[inset_-1px_0_0_rgba(255,255,255,0.06)]",
        collapsed ? "w-22" : "w-[320px]",
        "px-4 py-6",
        "overflow-hidden",
        // layout
        "flex flex-col",
      ].join(" ")}
    >
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
              {collapsed ? "AW" : "PORTFOLIO"}
            </div>

            <div className="mt-2 truncate text-[18px] font-semibold text-white tracking-[0.06em] leading-tight">
              {collapsed ? "Aur." : "Aurélie Weber"}
            </div>

            <div className="mt-2 mono ui-micro text-white/45">
              {collapsed ? "FE · R" : "FRONT-END DEVELOPER · REACT"}
            </div>
          </div>

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
        </div>

        {/* Sections (scroll si besoin, sans pousser le footer) */}
        <div className="mt-12 space-y-1 flex-1 min-h-0 overflow-auto pr-1">
          {sections.map((s, idx) => {
            const isActive = s.id === activeId;

            return (
              <button
                key={s.id}
                onClick={() => onJump(s.id)}
                type="button"
                className={[
                  "group flex w-full items-center gap-3 py-3 text-left",
                  "border-b border-white/5",
                  "hover:bg-white/2 transition-colors",
                ].join(" ")}
              >
                <div className="w-10 mono ui-micro text-white/35 tabular-nums">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                <div className="relative flex-1 min-w-0">
                  <div
                    className={[
                      "truncate ui-body",
                      isActive ? "text-white" : "text-white/70",
                    ].join(" ")}
                  >
                    {collapsed ? s.label.slice(0, 1) : s.label}
                  </div>

                  <AnimatePresence>
                    {!collapsed && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-1 overflow-hidden mono ui-micro text-white/40"
                      >
                        {s.meta}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="activeLine"
                        className="absolute -left-14 top-1/2 h-px w-10 bg-white/70"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                </div>

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
          <div className="mono ui-micro text-white/40">
            {collapsed ? "SOC" : "SOCIAL"}
          </div>

          <div className="mt-3 space-y-2">
            <a
              href="https://github.com/A-WEBerBeta"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              aria-label="GitHub"
              title="GitHub"
            >
              {/* Icône encadrée */}
              <div className="flex h-10 w-10 items-center justify-center border border-white/15 bg-white/2 group-hover:bg-white/4 transition-colors">
                <Github className="h-4 w-4 opacity-80 group-hover:opacity-100" />
              </div>

              {/* Texte */}
              {!collapsed && <span className="ui-meta">GitHub</span>}
            </a>

            <a
              href="https://www.linkedin.com/in/aurélie-weber-a354b1340/"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              {/* Icône encadrée */}
              <div className="flex h-10 w-10 items-center justify-center border border-white/15 bg-white/2 group-hover:bg-white/4 transition-colors">
                <Linkedin className="h-4 w-4 opacity-80 group-hover:opacity-100" />
              </div>

              {/* Texte */}
              {!collapsed && <span className="ui-meta">LinkedIn</span>}
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 border-t border-white/10 pt-4">
          <div className="mono ui-micro text-white/40">
            {collapsed ? "SYS" : "SYSTEM"}
          </div>

          <div
            className={[
              "mt-2 text-white/70",
              collapsed ? "mono ui-micro" : "ui-meta",
            ].join(" ")}
          >
            {collapsed ? "R · V · T · M" : "React · Vite · Tailwind · Motion"}
          </div>
        </div>
      </div>
    </aside>
  );
}
