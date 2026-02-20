import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { skillGroups } from "../data/skills";

function polarToXY(cx, cy, r, aDeg) {
  const a = (aDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function Node({ x, y, active, label, meta, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={[
        "absolute -translate-x-1/2 -translate-y-1/2 text-left",
        "rounded-2xl border px-4 py-3 backdrop-blur",
        "transition-colors outline-none",
        active
          ? "border-teal-400/45 bg-white/6"
          : "border-white/10 bg-black/20 hover:bg-white/4",
      ].join(" ")}
      style={{ left: x, top: y }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className={[
          "ui-body font-semibold",
          active ? "text-white" : "text-white/80",
        ].join(" ")}
      >
        {label}
      </div>
      <div className="mt-1 mono ui-micro tracking-[0.22em] text-white/40 line-clamp-1">
        {meta}
      </div>
      <div className="mt-2 h-px w-full bg-white/10" />
      <div className="mt-2 flex items-center gap-2">
        <span
          className={[
            "inline-block h-2 w-2 rounded-full",
            active ? "bg-teal-400/90" : "bg-white/20",
          ].join(" ")}
        />
        <span className="mono ui-micro tracking-[0.22em] text-white/35">
          OPEN
        </span>
      </div>
    </motion.button>
  );
}

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/12 bg-white/3 px-3 py-1 text-[12px] text-white/75">
      {children}
    </span>
  );
}

export default function SkillsStackMap() {
  const [activeId, setActiveId] = useState(skillGroups[0]?.id);

  const active = useMemo(
    () => skillGroups.find((g) => g.id === activeId) ?? skillGroups[0],
    [activeId],
  );

  const size = 520;
  const cx = size / 2;
  const cy = size / 2;
  const ringR = 185;

  const nodes = useMemo(() => {
    const n = skillGroups.length || 1;
    const startAngle = -110; // décale pour laisser de l’air vers la droite (détails)
    const step = 320 / Math.max(1, n - 1);
    return skillGroups.map((g, i) => {
      const a = startAngle + i * step;
      const { x, y } = polarToXY(cx, cy, ringR, a);
      return { ...g, x, y };
    });
  }, [cx, cy, ringR]);

  return (
    <div className="w-full border border-white/10">
      {/* Header */}
      <div className="flex items-start justify-between gap-6 border-b border-white/10 px-6 py-5">
        <div>
          <div className="mono ui-micro tracking-[0.35em] text-white/40">
            SKILLS MAP
          </div>
          <div className="mt-2 ui-meta text-white/55">
            Vue “satellites” : domaines → outils → usage concret (sans notes de
            niveau).
          </div>
        </div>
        <div className="mono ui-micro tracking-[0.22em] text-white/35">
          Clique un nœud →
        </div>
      </div>

      <div className="grid grid-cols-12">
        {/* MAP */}
        <div className="col-span-12 lg:col-span-7 border-b lg:border-b-0 lg:border-r border-white/10">
          <div className="p-6">
            <div
              className="relative mx-auto"
              style={{ width: size, height: size }}
            >
              {/* Rings */}
              <div className="absolute inset-0 rounded-full border border-white/10" />
              <div
                className="absolute rounded-full border border-white/5"
                style={{ left: 42, top: 42, right: 42, bottom: 42 }}
              />

              {/* Core */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="rounded-3xl border border-white/10 bg-white/3 px-6 py-5 backdrop-blur">
                  <div className="mono ui-micro tracking-[0.35em] text-white/40">
                    CORE
                  </div>
                  <div className="mt-2 text-[20px] font-semibold text-white">
                    Front-end / UI
                  </div>
                  <div className="mt-2 ui-meta text-white/55 max-w-[260px]">
                    Construire des interfaces : structure, intégration,
                    interactions, finition.
                  </div>
                </div>
              </motion.div>

              {/* Connectors */}
              <svg
                className="absolute inset-0"
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
              >
                {nodes.map((g) => {
                  const isActive = g.id === activeId;
                  return (
                    <line
                      key={g.id}
                      x1={cx}
                      y1={cy}
                      x2={g.x}
                      y2={g.y}
                      stroke="rgba(255,255,255,0.10)"
                      strokeWidth="1"
                      opacity={isActive ? 1 : 0.55}
                    />
                  );
                })}
              </svg>

              {/* Nodes */}
              {nodes.map((g) => (
                <Node
                  key={g.id}
                  x={g.x}
                  y={g.y}
                  active={g.id === activeId}
                  label={g.label}
                  meta={g.meta}
                  onClick={() => setActiveId(g.id)}
                />
              ))}

              {/* Active halo */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  className="pointer-events-none absolute inset-0 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="absolute inset-0 rounded-full ring-1 ring-teal-400/10" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* DETAILS */}
        <div className="col-span-12 lg:col-span-5">
          <div className="p-6">
            <div className="mono ui-micro tracking-[0.35em] text-white/45">
              {active?.label?.toUpperCase()}
            </div>
            <div className="mt-2 ui-meta text-white/55">{active?.meta}</div>

            <div className="mt-6 border-t border-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.18 }}
                >
                  {/* Chips (plus visuel) */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(active?.items ?? []).map((it) => (
                      <Chip key={it.name}>{it.name}</Chip>
                    ))}
                  </div>

                  {/* Details (concret) */}
                  <div className="mt-4 grid gap-3">
                    {(active?.items ?? []).map((it) => (
                      <div
                        key={it.name}
                        className="rounded-2xl border border-white/10 bg-white/2 px-4 py-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="ui-body font-medium text-white">
                            {it.name}
                          </div>
                          <div className="h-2 w-2 rounded-full bg-teal-400/60 mt-2" />
                        </div>

                        {it.note ? (
                          <div className="mt-2 ui-meta text-white/55 leading-relaxed">
                            {it.note}
                          </div>
                        ) : (
                          <div className="mt-2 ui-meta text-white/35">
                            Ajoute une note courte (usage concret).
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
