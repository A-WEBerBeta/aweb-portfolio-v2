import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function ManifestOverlay({ open, onClose, projects = [] }) {
  const [q, setQ] = useState("");

  // Fermer avec ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock scroll body
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return projects;
    return projects.filter((p) => {
      const hay = [
        p.title,
        p.subtitle,
        p.year,
        p.status,
        (p.stack || []).join(" "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(term);
    });
  }, [projects, q]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-200 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="absolute left-10 right-10 top-10 bottom-10 border border-white/10 bg-black/25 overflow-hidden"
            initial={{ opacity: 0, y: 14, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.995 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="relative border-b border-white/10 px-6 py-4">
              {/* repère ultra discret */}
              <div className="pointer-events-none absolute left-6 right-6 top-0 h-px bg-white/10" />
              <div className="pointer-events-none absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2">
                <div className="h-full w-full border border-teal-400/35" />
                <div className="absolute inset-0 bg-teal-400/20 blur-md animate-[pulse_4s_ease-in-out_infinite]" />
              </div>

              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="mono text-[11px] tracking-[0.35em] text-white/45">
                    INDEX
                  </div>
                  <div className="mt-2 text-xl font-semibold text-white">
                    Manifeste complet
                  </div>
                  <div className="mt-1 text-xs text-white/45">
                    Recherche, filtre léger, vue globale.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Rechercher…"
                    className="mono w-60 border border-white/15 bg-black/20 px-3 py-2 text-[11px] tracking-[0.25em] text-white/75 placeholder:text-white/25 outline-none"
                  />
                  <button
                    onClick={onClose}
                    className="mono border border-white/15 px-4 py-2 text-[11px] tracking-[0.25em] text-white/70 hover:text-white"
                  >
                    FERMER ✕
                  </button>
                </div>
              </div>
            </div>

            {/* Liste */}
            <div className="h-[calc(100%-96px)] overflow-auto">
              <div className="px-6 py-6">
                <div className="grid grid-cols-12 gap-4 border-b border-white/10 pb-3 mono text-[11px] tracking-[0.25em] text-white/35">
                  <div className="col-span-2">ID</div>
                  <div className="col-span-4">PROJET</div>
                  <div className="col-span-2">ANNÉE</div>
                  <div className="col-span-2">STATUT</div>
                  <div className="col-span-2">STACK</div>
                </div>

                <div className="divide-y divide-white/10">
                  {filtered.map((p) => (
                    <div
                      key={p.id}
                      className="grid grid-cols-12 gap-4 py-4 text-white/75"
                    >
                      <div className="col-span-2 mono text-[11px] tracking-[0.25em] text-white/45">
                        {p.index ?? "—"}
                      </div>

                      <div className="col-span-4">
                        <div className="text-sm text-white">{p.title}</div>
                        <div className="mt-1 text-xs text-white/50">
                          {p.subtitle}
                        </div>
                      </div>

                      <div className="col-span-2 mono text-[11px] tracking-[0.25em] text-white/55">
                        {p.year ?? "—"}
                      </div>

                      <div className="col-span-2 mono text-[11px] tracking-[0.25em] text-white/55">
                        {p.status ?? "—"}
                      </div>

                      <div className="col-span-2 text-xs text-white/60">
                        {(p.stack ?? []).slice(0, 3).join(" · ")}
                      </div>
                    </div>
                  ))}

                  {filtered.length === 0 ? (
                    <div className="py-10 text-center text-white/45">
                      Aucun résultat.
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
