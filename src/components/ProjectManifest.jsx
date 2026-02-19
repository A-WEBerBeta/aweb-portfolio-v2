import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "./Reveal";

/**
 * Ligne de stack en style "instrument panel"
 * (Toujours présente pour éviter les changements de hauteur)
 */
function StackLine({ items }) {
  return (
    <div className="mono ui-micro text-white/45">
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {items.map((s) => (
          <span
            key={s}
            className="after:ml-3 after:content-['/'] last:after:content-['']"
          >
            {String(s).toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Petit bloc de stats à droite
 */
function Stat({ label, value }) {
  return (
    <div className="border-t border-white/10 pt-4">
      <div className="mono ui-micro text-white/35">{label}</div>
      <div className="mt-2 ui-body text-white/75">{value ?? "—"}</div>
    </div>
  );
}

/**
 * Bouton de lien
 */
function LinkBtn({ href, children }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="mono inline-flex items-center gap-2 border border-white/15 px-4 py-2 ui-micro tracking-[0.25em] text-white/70 hover:text-white"
    >
      {children} <span className="text-white/40">→</span>
    </a>
  );
}

/**
 * Manifest "Mission Control"
 * - Prend la hauteur du parent (le 100vh est géré par Section layout="console")
 * - Scroll interne (liste / dossier)
 * - Hover fluide (RAF throttle)
 * - Screenshot centré (object-contain)
 */
export default function ProjectManifest({ primary = [], other = [] }) {
  const [lockedId, setLockedId] = useState(primary[0]?.id ?? null);
  const [hoverId, setHoverId] = useState(null);
  const [showOther, setShowOther] = useState(false);

  // Throttle du hover pour éviter les tremblements / sursauts
  const hoverRaf = useRef(null);
  const setHoverRaf = (id) => {
    if (hoverRaf.current) cancelAnimationFrame(hoverRaf.current);
    hoverRaf.current = requestAnimationFrame(() => setHoverId(id));
  };

  // Liste affichée (avec séparation "Autres projets" si demandé)
  const list = useMemo(() => {
    const base = [...primary];
    if (showOther) base.push({ id: "__divider__", divider: true });
    if (showOther) base.push(...other);
    return base;
  }, [primary, other, showOther]);

  // Projet actif = hover si présent, sinon verrouillé
  const activeId = hoverId ?? lockedId;
  const active =
    list.find((p) => !p.divider && p.id === activeId) ??
    primary.find(Boolean) ??
    null;

  // Liste "navigable" (sans divider)
  const navigable = useMemo(() => list.filter((p) => !p.divider), [list]);

  const activeIndex = useMemo(() => {
    const idx = navigable.findIndex((p) => p.id === activeId);
    return idx >= 0 ? idx : 0;
  }, [navigable, activeId]);

  useEffect(() => {
    const onKeyDown = (e) => {
      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = navigable[Math.min(activeIndex + 1, navigable.length - 1)];
        if (next) setHoverId(next.id);
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = navigable[Math.max(activeIndex - 1, 0)];
        if (prev) setHoverId(prev.id);
      }

      if (e.key === "Enter") {
        e.preventDefault();
        if (activeId) setLockedId(activeId);
      }

      if (e.key === "Escape") {
        e.preventDefault();
        setHoverId(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigable, activeIndex, activeId]);

  return (
    <Reveal preset="scale" amount={0.2} once={false} className="h-full">
      <div className="border border-white/10 bg-black/15 overflow-hidden h-full">
        <div
          className="grid h-full"
          style={{ gridTemplateColumns: "380px minmax(0, 1fr)" }}
        >
          {/* =========================
            COLONNE GAUCHE : LISTE
           ========================= */}
          <Reveal preset="left" amount={0.25} once={false} className="h-full">
            <div className="h-full border-r border-white/10">
              {/* Header fixe */}
              <Reveal preset="up" amount={0.6} once={false}>
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div className="mono ui-micro text-white/45">PROJETS</div>

                  {other?.length ? (
                    <button
                      type="button"
                      onClick={() => setShowOther((v) => !v)}
                      className="mono border border-white/15 px-3 py-2 ui-micro tracking-[0.25em] text-white/70 hover:text-white"
                    >
                      {showOther ? "MASQUER" : "AUTRES"}
                    </button>
                  ) : null}
                </div>
              </Reveal>

              {/* Scroll interne de la liste */}
              <div className="h-[calc(100%-57px)] overflow-auto">
                {list.map((p, idx) => {
                  if (p.divider) {
                    return (
                      <div key="divider" className="px-5 py-6">
                        <div className="h-px bg-white/10" />
                        <div className="mono ui-micro mt-3 text-white/35">
                          AUTRES PROJETS
                        </div>
                      </div>
                    );
                  }

                  const isActive = p.id === activeId;
                  const isLocked = p.id === lockedId;

                  return (
                    <button
                      key={p.id}
                      type="button"
                      onMouseEnter={() => setHoverRaf(p.id)}
                      onMouseLeave={() => setHoverRaf(null)}
                      onFocus={() => setHoverRaf(p.id)}
                      onBlur={() => setHoverRaf(null)}
                      onClick={() => setLockedId(p.id)}
                      className="group w-full border-b border-white/10 text-left"
                    >
                      <div className="px-5 py-6 min-h-35">
                        <div className="flex items-start gap-4">
                          {/* Index (micro + assumé) */}
                          <div className="w-10 mono text-[11px] tracking-[0.25em] tabular-nums text-white/35">
                            {p.index ?? String(idx + 1).padStart(2, "0")}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                              {/* Titre (body) */}
                              <div
                                className={[
                                  "truncate ui-body font-medium tracking-wide",
                                  isActive ? "text-white" : "text-white/75",
                                ].join(" ")}
                              >
                                {p.title}
                              </div>

                              <div className="flex items-center gap-3">
                                {/* Année (micro) */}
                                <div className="mono ui-micro tracking-[0.25em] text-white/35">
                                  {p.year ?? ""}
                                </div>

                                {/* Carré état */}
                                <div className="h-2 w-2 border border-white/25">
                                  <div
                                    className={[
                                      "h-full w-full",
                                      isLocked
                                        ? "bg-teal-400/80"
                                        : isActive
                                          ? "bg-white/40"
                                          : "bg-transparent",
                                    ].join(" ")}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Sous-titre (meta) */}
                            <div className="mt-2 ui-meta text-white/55">
                              {p.subtitle}
                            </div>

                            {/* Stack (micro mono) */}
                            <div className="mt-4">
                              <motion.div
                                initial={false}
                                animate={{ opacity: isActive ? 1 : 0 }}
                                transition={{ duration: 0.15 }}
                                className="pointer-events-none"
                              >
                                <StackLine items={p.stack ?? []} />
                              </motion.div>
                            </div>

                            {/* Badges (micro mono) */}
                            <div className="mt-4 flex items-center gap-3 mono ui-micro tracking-[0.25em] text-white/35">
                              <span className="border border-white/10 px-2 py-1">
                                {p.status ?? "—"}
                              </span>
                              <span className="text-white/25">/</span>
                              <span>{String(p.role ?? "—").toUpperCase()}</span>
                            </div>
                          </div>
                        </div>

                        {/* Indice actif */}
                        <motion.div
                          initial={false}
                          animate={{ opacity: isActive ? 1 : 0 }}
                          transition={{ duration: 0.15 }}
                          className="mt-6 h-px bg-white/15"
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* =========================
            COLONNE DROITE : DOSSIER
           ========================= */}
          <Reveal preset="right" amount={0.25} once={false} className="h-full">
            <div className="h-full">
              {/* Header fixe du dossier */}
              <div className="flex items-start justify-between border-b border-white/10 px-6 py-5">
                <div className="min-w-0">
                  <div className="mono ui-micro text-white/35">DOSSIER</div>

                  <motion.div
                    key={active?.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <div className="mt-2 truncate text-2xl font-semibold text-white">
                      {active?.title ?? "—"}
                    </div>

                    <div className="mt-2 ui-meta text-white/55">
                      {active?.subtitle ?? ""}
                    </div>
                  </motion.div>
                </div>

                <div className="text-right">
                  <div className="mono ui-micro text-white/35">VERROU</div>
                  <div className="mono ui-micro mt-2 tracking-[0.25em] text-white/65">
                    {lockedId === active?.id ? "ACTIF" : "APERÇU"}
                  </div>
                </div>
              </div>

              {/* Contenu scrollable du dossier */}
              <div className="h-[calc(100%-73px)] overflow-auto">
                {/* Bloc preview */}
                <div className="border-b border-white/10 bg-black/25">
                  <div className="grid grid-cols-12 gap-8 px-6 py-7">
                    {/* Texte */}
                    <div className="col-span-7">
                      <div className="mono ui-micro text-white/35">APERÇU</div>

                      <div className="mt-6 text-[44px] font-semibold leading-[1.05] text-white/85">
                        {active?.tagline ?? "Interface sobre. Impact net."}
                      </div>

                      <div className="mt-5 max-w-prose ui-body leading-relaxed text-white/65">
                        {active?.taglineSub ??
                          "Une mise en scène type console : structure, hiérarchie, et détails maîtrisés."}
                      </div>

                      <div className="mt-7 flex flex-wrap gap-3">
                        <LinkBtn href={active?.links?.live}>SITE</LinkBtn>
                        <LinkBtn href={active?.links?.repo}>CODE</LinkBtn>
                      </div>
                    </div>

                    {/* Screenshot */}
                    <div className="col-span-5">
                      <div className="border border-white/10 bg-black/30">
                        <div className="flex h-105 max-h-[52vh] w-full items-center justify-center p-4">
                          {active?.image ? (
                            <motion.img
                              key={active.id}
                              src={active.image}
                              alt={active.title}
                              className="max-h-full max-w-full object-contain opacity-85"
                              initial={{ opacity: 0.0 }}
                              animate={{ opacity: 0.85 }}
                              transition={{ duration: 0.2 }}
                            />
                          ) : (
                            <div className="mono ui-micro text-white/35">
                              PAS D’IMAGE
                            </div>
                          )}
                        </div>

                        {/* Crosshair */}
                        <div className="pointer-events-none relative">
                          <div className="absolute left-4 right-4 top-1/2 h-px bg-white/10" />
                          <div className="absolute top-4 bottom-4 left-1/2 w-px bg-white/5" />
                          <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2">
                            <div className="h-full w-full border border-teal-400/35" />
                            <div className="absolute inset-0 bg-teal-400/20 blur-md animate-[pulse_4s_ease-in-out_infinite]" />
                          </div>
                          <div className="h-0" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Corps du dossier */}
                <div className="px-6 py-7">
                  <div className="grid grid-cols-12 gap-10">
                    <div className="col-span-7">
                      <div className="mono ui-micro text-white/35">RÉSUMÉ</div>

                      <div className="mt-4 ui-body leading-relaxed text-white/70">
                        {active?.summary ?? "—"}
                      </div>

                      <div className="mono mt-9 ui-micro text-white/35">
                        POINTS CLÉS
                      </div>

                      <ul className="mt-4 space-y-3 ui-body text-white/70">
                        {(active?.highlights ?? []).map((h) => (
                          <li key={h} className="flex gap-3">
                            <span className="mt-2.5 h-1 w-1 bg-teal-400/80" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="col-span-5 space-y-5">
                      <div className="border-t border-white/10 pt-4">
                        <div className="mono ui-micro text-white/35">STACK</div>
                        <div className="mt-3 ui-body text-white/70">
                          {(active?.stack ?? []).join(" · ")}
                        </div>
                      </div>

                      <Stat label="STATUT" value={active?.status} />
                      <Stat label="RÔLE" value={active?.role} />
                      <Stat label="ANNÉE" value={active?.year} />
                    </div>
                  </div>

                  <div className="mono mt-10 text-[11px] text-white/35">
                    SURVOL = APERÇU / CLIC = VERROUILLER
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Reveal>
  );
}
