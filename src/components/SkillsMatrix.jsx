import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { skillGroups } from "../data/skills";

function BarresSignal({ signal = 1, max = 3 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const on = i < signal;
        return (
          <span
            key={i}
            className={[
              "h-2 w-6 border border-white/15",
              on ? "bg-teal-400/35" : "bg-transparent",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}

export default function SkillsMatrix() {
  const [activeGroup, setActiveGroup] = useState(skillGroups[0]?.id);

  const current = useMemo(() => {
    return skillGroups.find((g) => g.id === activeGroup) ?? skillGroups[0];
  }, [activeGroup]);

  return (
    <div className="w-full border border-white/10">
      {/* En-têtes */}
      <div className="grid grid-cols-12 border-b border-white/10">
        <div className="col-span-3 px-6 py-4">
          <div className="mono ui-micro tracking-[0.35em] text-white/40">
            DOMAINES
          </div>
        </div>
        <div className="col-span-9 px-8 py-4">
          <div className="mono ui-micro tracking-[0.35em] text-white/40">
            OUTILS / PRATIQUES
          </div>
        </div>
      </div>

      {/* Corps */}
      <div className="grid grid-cols-12 min-h-115">
        {/* Colonne gauche : domaines */}
        <div className="col-span-3 border-r border-white/10">
          {skillGroups.map((g, idx) => {
            const isActive = g.id === activeGroup;

            return (
              <button
                key={g.id}
                type="button"
                onMouseEnter={() => setActiveGroup(g.id)}
                onFocus={() => setActiveGroup(g.id)}
                className={[
                  "w-full text-left px-6 py-6 border-b border-white/5",
                  "transition-colors outline-none",
                  isActive
                    ? "bg-white/2"
                    : "bg-transparent opacity-80 hover:opacity-100",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    {/* Index (micro) */}
                    <div className="mono text-[11px] tracking-[0.25em] text-white/35 tabular-nums">
                      {String(idx + 1).padStart(2, "0")}
                    </div>

                    {/* Label domaine (body) */}
                    <div
                      className={[
                        "mt-2 ui-body font-semibold truncate",
                        isActive ? "text-white" : "text-white/75",
                      ].join(" ")}
                    >
                      {g.label}
                    </div>

                    {/* Meta domaine (micro mono) */}
                    <div className="mono mt-2 ui-micro tracking-[0.22em] text-white/35 truncate">
                      {g.meta}
                    </div>
                  </div>

                  {/* Carré état */}
                  <div className="h-2 w-2 border border-white/25 mt-2">
                    <div
                      className={[
                        "h-full w-full",
                        isActive ? "bg-teal-400/80" : "bg-transparent",
                      ].join(" ")}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Colonne droite : items */}
        <div className="col-span-9 relative">
          {/* scan line lors du changement de domaine */}
          <motion.div
            key={activeGroup}
            className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-teal-400/25"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />

          {/* En-tête colonne droite */}
          <div className="px-8 py-5">
            <div className="mono ui-micro tracking-[0.35em] text-white/45">
              {current?.label?.toUpperCase()}
            </div>
            <div className="mt-2 ui-meta text-white/55">{current?.meta}</div>
          </div>

          <div className="border-t border-white/10">
            {current?.items?.map((it) => (
              <div
                key={it.name}
                className={[
                  "group relative grid grid-cols-12 gap-6 px-8 py-6",
                  "border-b border-white/5",
                  "hover:bg-white/2 transition-colors",
                ].join(" ")}
              >
                {/* Nom (body) */}
                <div className="col-span-4">
                  <div className="ui-body font-medium text-white">
                    {it.name}
                  </div>
                </div>

                {/* Intensité (micro mono + barres) */}
                <div className="col-span-4 flex items-center gap-4">
                  <div className="mono ui-micro tracking-[0.25em] text-white/35">
                    INTENSITÉ
                  </div>
                  <BarresSignal signal={it.level ?? 1} />
                </div>

                {/* Note (meta) */}
                <div className="col-span-4">
                  <div className="ui-meta text-white/55 leading-relaxed">
                    {it.note}
                  </div>
                </div>

                {/* repère teal au survol */}
                <div className="pointer-events-none absolute left-0 right-0 bottom-0">
                  <div className="h-px w-0 bg-teal-400/30 group-hover:w-full transition-all duration-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
