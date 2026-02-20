import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "./Reveal";

/**
 * Convertit une URL YouTube (watch / youtu.be / embed) en URL embed.
 * Retourne null si l'URL n'est pas reconnue.
 */
function toYouTubeEmbed(url) {
  if (!url) return null;

  try {
    const u = new URL(url);

    // youtu.be/<id>
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    // youtube.com/watch?v=<id> ou youtube.com/embed/<id>
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
      if (u.pathname.startsWith("/embed/")) return url;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Bouton de lien (anchor par défaut, ou button si onClick fourni)
 */
function LinkBtn({ href, onClick, children, title }) {
  const className =
    "mono inline-flex items-center gap-2 border border-white/15 px-4 py-2 ui-micro tracking-[0.25em] text-white/70 hover:text-white";

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        title={title}
        className={className}
      >
        {children} <span className="text-white/40">→</span>
      </button>
    );
  }

  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      title={title}
      className={className}
    >
      {children} <span className="text-white/40">→</span>
    </a>
  );
}

/**
 * Ligne "badges" (style instrument panel)
 */
function BadgeLine({ items = [] }) {
  if (!items?.length) return null;

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
 * Overlay vidéo (modal)
 */
function VideoOverlay({ open, onClose, title, embedUrl }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => closeBtnRef.current?.focus(), 0);

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const src = `${embedUrl}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="fixed inset-0 z-9999">
      <button
        type="button"
        aria-label="Fermer la vidéo"
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      <div className="relative mx-auto flex h-full max-w-275 items-center px-4">
        <div className="w-full border border-white/10 bg-black/60 backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="min-w-0">
              <div className="mono ui-micro text-white/35">DÉMO</div>
              <div className="mt-1 truncate ui-body text-white/80">
                {title ?? "Vidéo"}
              </div>
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              className="mono border border-white/15 px-3 py-2 ui-micro tracking-[0.25em] text-white/70 hover:text-white"
            >
              FERMER <span className="text-white/40">×</span>
            </button>
          </div>

          <div className="p-4">
            <div className="relative w-full overflow-hidden border border-white/10 bg-black/30 pt-[56.25%]">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={src}
                title={title ? `Démo — ${title}` : "Démo"}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="mono mt-3 ui-micro text-white/35">
              ESC = FERMER / CLIC FOND = FERMER
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Drawer PROJETS (mobile premium)
 */
function ProjectsDrawer({
  open,
  onClose,
  list,
  activeId,
  lockedId,
  onPick,
  showOther,
  onToggleOther,
  otherCount,
  closeTipNoop,
}) {
  // scroll lock + ESC
  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const ListContent = (
    <div className="h-full min-h-0 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="mono ui-micro text-white/45">PROJETS</div>

        <div className="flex items-center gap-2">
          {otherCount ? (
            <button
              type="button"
              onClick={onToggleOther}
              className="mono border border-white/15 px-3 py-2 ui-micro tracking-[0.25em] text-white/70 hover:text-white"
            >
              {showOther ? "MASQUER" : "AUTRES"}
            </button>
          ) : null}

          <button
            type="button"
            onClick={onClose}
            className="mono border border-white/15 px-3 py-2 ui-micro tracking-[0.25em] text-white/70 hover:text-white"
            aria-label="Fermer"
            title="Fermer"
          >
            ×
          </button>
        </div>
      </div>

      {/* Scroll list */}
      <div className="flex-1 min-h-0 overflow-auto">
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
              onClick={() => onPick(p.id)}
              className="group w-full border-b border-white/10 text-left hover:bg-white/2 transition-colors"
              onMouseEnter={() => closeTipNoop?.()}
              onMouseLeave={() => closeTipNoop?.()}
              onFocus={() => closeTipNoop?.()}
              onBlur={() => closeTipNoop?.()}
            >
              <div className="px-5 py-6 min-h-35">
                <div className="flex items-start gap-4">
                  <div className="w-10 mono text-[11px] tracking-[0.25em] tabular-nums text-white/35">
                    {p.index ?? String(idx + 1).padStart(2, "0")}
                  </div>

                  <div className="min-w-0 flex-1 pr-2">
                    <div className="flex items-center justify-between gap-3">
                      <div
                        className={[
                          "truncate ui-body font-medium tracking-wide",
                          isActive ? "text-white" : "text-white/75",
                        ].join(" ")}
                      >
                        {p.title}
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="mono ui-micro tracking-[0.25em] text-white/35">
                          {p.year ?? ""}
                        </div>

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

                    <div className="mt-2 ui-meta text-white/55">
                      {p.subtitle}
                    </div>

                    <div className="mt-4">
                      <BadgeLine
                        items={
                          p.metaBadges?.length ? p.metaBadges : (p.stack ?? [])
                        }
                      />
                    </div>

                    <div className="mt-4 flex items-center gap-3 mono ui-micro tracking-[0.25em] text-white/35">
                      <span className="border border-white/10 px-2 py-1">
                        {p.status ?? "—"}
                      </span>
                      <span className="text-white/25">/</span>
                      <span>{String(p.role ?? "—").toUpperCase()}</span>
                    </div>
                  </div>
                </div>

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
  );

  return (
    <AnimatePresence>
      {open ? (
        <>
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Fermer la liste"
            className="fixed inset-0 z-9998 bg-black/55 backdrop-blur-[1px] lg:hidden"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel */}
          <motion.aside
            className={[
              "fixed left-0 top-0 z-9999 h-dvh w-[min(360px,92vw)]",
              "border-r border-white/10 bg-[rgba(10,11,13,0.86)] backdrop-blur-[3px]",
              "shadow-[inset_-1px_0_0_rgba(255,255,255,0.06)]",
              "lg:hidden",
            ].join(" ")}
            initial={{ x: -420 }}
            animate={{ x: 0 }}
            exit={{ x: -420 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {ListContent}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

/**
 * Manifest "Mission Control"
 * - Desktop: 2 colonnes (inchangé)
 * - Mobile premium: Drawer "PROJETS" + dossier plein écran
 */
export default function ProjectManifest({ primary = [], other = [] }) {
  const [lockedId, setLockedId] = useState(primary[0]?.id ?? null);
  const [hoverId, setHoverId] = useState(null);
  const [showOther, setShowOther] = useState(false);

  // Mobile: drawer
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Overlay vidéo
  const [videoForId, setVideoForId] = useState(null);

  // Throttle hover (RAF)
  const hoverRaf = useRef(null);
  const setHoverRaf = (id) => {
    if (hoverRaf.current) cancelAnimationFrame(hoverRaf.current);
    hoverRaf.current = requestAnimationFrame(() => setHoverId(id));
  };

  const list = useMemo(() => {
    const base = [...primary];
    if (showOther) base.push({ id: "__divider__", divider: true });
    if (showOther) base.push(...other);
    return base;
  }, [primary, other, showOther]);

  const activeId = hoverId ?? lockedId;
  const active =
    list.find((p) => !p.divider && p.id === activeId) ??
    primary.find(Boolean) ??
    null;

  const navigable = useMemo(() => list.filter((p) => !p.divider), [list]);

  const activeIndex = useMemo(() => {
    const idx = navigable.findIndex((p) => p.id === activeId);
    return idx >= 0 ? idx : 0;
  }, [navigable, activeId]);

  const videoEmbed = useMemo(
    () => toYouTubeEmbed(active?.links?.demoVideo),
    [active?.links?.demoVideo],
  );

  const isVideoOpen = Boolean(
    videoEmbed && active?.id && videoForId === active.id,
  );

  useEffect(() => {
    const onKeyDown = (e) => {
      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;

      // si drawer mobile ouvert, on évite navigation clavier du dossier
      if (drawerOpen) return;

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
        if (!isVideoOpen) {
          e.preventDefault();
          setHoverId(null);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigable, activeIndex, activeId, isVideoOpen, drawerOpen]);

  const openDemo = () => {
    if (!videoEmbed || !active?.id) return;
    setVideoForId(active.id);
  };

  const closeDemo = () => setVideoForId(null);

  const pickProject = (id) => {
    setLockedId(id);
    setHoverId(null);
    setDrawerOpen(false);
  };

  return (
    <Reveal preset="scale" amount={0.2} once={false} className="h-full">
      <VideoOverlay
        open={isVideoOpen}
        onClose={closeDemo}
        title={active?.title}
        embedUrl={videoEmbed}
      />

      {/* ===== Mobile drawer (premium) ===== */}
      <ProjectsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        list={list}
        activeId={activeId}
        lockedId={lockedId}
        onPick={pickProject}
        showOther={showOther}
        onToggleOther={() => setShowOther((v) => !v)}
        otherCount={other?.length ?? 0}
        setHoverRaf={setHoverRaf}
        closeTipNoop={() => {}}
      />

      <div className="border border-white/10 bg-black/15 overflow-hidden h-full">
        {/* ===== MOBILE: top bar actions ===== */}
        <div className="lg:hidden border-b border-white/10 px-5 py-4 flex items-center justify-between">
          <div className="min-w-0">
            <div className="mono ui-micro text-white/35">DOSSIER</div>
            <div className="mt-1 truncate ui-body text-white/80">
              {active?.title ?? "—"}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="mono border border-white/15 px-3 py-2 ui-micro tracking-[0.25em] text-white/70 hover:text-white"
          >
            PROJETS <span className="text-white/40">≡</span>
          </button>
        </div>

        {/* ===== DESKTOP GRID  ===== */}
        <div className="hidden lg:grid h-full grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[340px_minmax(0,1fr)] 2xl:grid-cols-[380px_minmax(0,1fr)]">
          {/* =========================
            COLONNE GAUCHE : LISTE
           ========================= */}
          <Reveal preset="left" amount={0.25} once={false} className="h-full">
            <div className="h-full border-r border-white/10">
              <Reveal preset="up" amount={0.6} once={false}>
                <div className="flex items-center justify-between border-b border-white/10 px-4 xl:px-5 py-4">
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

              <div className="h-[calc(100%-57px)] overflow-auto">
                {list.map((p, idx) => {
                  if (p.divider) {
                    return (
                      <div key="divider" className="px-4 xl:px-5 py-6">
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
                      <div className="px-4 xl:px-5 py-6 min-h-35">
                        <div className="flex items-start gap-4">
                          <div className="w-10 mono text-[11px] tracking-[0.25em] tabular-nums text-white/35">
                            {p.index ?? String(idx + 1).padStart(2, "0")}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <div
                                className={[
                                  "truncate ui-body font-medium tracking-wide",
                                  isActive ? "text-white" : "text-white/75",
                                ].join(" ")}
                              >
                                {p.title}
                              </div>

                              <div className="flex items-center gap-3">
                                <div className="mono ui-micro tracking-[0.25em] text-white/35">
                                  {p.year ?? ""}
                                </div>

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

                            <div className="mt-2 ui-meta text-white/55">
                              {p.subtitle}
                            </div>

                            <div className="mt-4">
                              <motion.div
                                initial={false}
                                animate={{ opacity: isActive ? 1 : 0 }}
                                transition={{ duration: 0.15 }}
                                className="pointer-events-none"
                              >
                                <BadgeLine
                                  items={
                                    p.metaBadges?.length
                                      ? p.metaBadges
                                      : (p.stack ?? [])
                                  }
                                />
                              </motion.div>
                            </div>

                            <div className="mt-4 flex items-center gap-3 mono ui-micro tracking-[0.25em] text-white/35">
                              <span className="border border-white/10 px-2 py-1">
                                {p.status ?? "—"}
                              </span>
                              <span className="text-white/25">/</span>
                              <span>{String(p.role ?? "—").toUpperCase()}</span>
                            </div>
                          </div>
                        </div>

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

              <div className="h-[calc(100%-73px)] overflow-auto">
                <div className="border-b border-white/10 bg-black/25">
                  <div className="grid grid-cols-12 gap-8 px-6 py-7">
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

                        {videoEmbed ? (
                          <LinkBtn
                            onClick={openDemo}
                            title="Ouvrir la démo vidéo"
                          >
                            DÉMO
                          </LinkBtn>
                        ) : null}
                      </div>
                    </div>

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

        {/* ===== MOBILE: dossier en flow (pas de double scroll) ===== */}
        <div className="lg:hidden">
          {/* Header dossier (déjà en haut) => on affiche juste le contenu */}
          <div className="border-b border-white/10 bg-black/25">
            <div className="px-6 py-7">
              <div className="mono ui-micro text-white/35">APERÇU</div>

              <div className="mt-6 text-[34px] sm:text-[40px] font-semibold leading-[1.05] text-white/85">
                {active?.tagline ?? "Interface sobre. Impact net."}
              </div>

              <div className="mt-5 max-w-prose ui-body leading-relaxed text-white/65">
                {active?.taglineSub ??
                  "Une mise en scène type console : structure, hiérarchie, et détails maîtrisés."}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <LinkBtn href={active?.links?.live}>SITE</LinkBtn>
                <LinkBtn href={active?.links?.repo}>CODE</LinkBtn>
                {videoEmbed ? (
                  <LinkBtn onClick={openDemo} title="Ouvrir la démo vidéo">
                    DÉMO
                  </LinkBtn>
                ) : null}
              </div>

              <div className="mt-8 border border-white/10 bg-black/30">
                <div className="flex max-h-[46vh] w-full items-center justify-center p-4">
                  {active?.image ? (
                    <motion.img
                      key={active?.id}
                      src={active?.image}
                      alt={active?.title}
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
              </div>
            </div>
          </div>

          <div className="px-6 py-7">
            <div className="grid grid-cols-1 gap-10">
              <div>
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

              <div className="space-y-5">
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
              TAP = OUVRIR PROJETS / CLIC = VERROUILLER
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
