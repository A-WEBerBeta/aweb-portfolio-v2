import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  SiCss3,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiReact,
  SiReactrouter,
  SiRedux,
  SiSass,
  SiTailwindcss,
  SiVite,
  SiWordpress,
} from "react-icons/si";
import Reveal from "./Reveal";

const GROUPS = [
  {
    id: "lang",
    label: "LANGAGES & STYLING",
    meta: "Structure et apparence de l'interface.",
    items: [
      { name: "JavaScript", Icon: SiJavascript },
      { name: "HTML", Icon: SiHtml5 },
      { name: "CSS", Icon: SiCss3 },
      { name: "Sass/SCSS", Icon: SiSass },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
    ],
  },
  {
    id: "fe",
    label: "FRAMEWORKS & LIBS",
    meta: "Logique et interaction.",
    items: [
      { name: "React", Icon: SiReact },
      { name: "React Router", Icon: SiReactrouter },
      { name: "Redux", Icon: SiRedux },
    ],
  },
  {
    id: "tools",
    label: "OUTILS",
    meta: "Conception et livraison.",
    items: [
      { name: "Vite", Icon: SiVite },
      { name: "Git", Icon: SiGit },
      { name: "GitHub", Icon: SiGithub },
      { name: "Figma", Icon: SiFigma },
      { name: "WordPress", Icon: SiWordpress },
    ],
  },
];

const BRAND = {
  JavaScript: "#F7DF1E",
  HTML: "#E34F26",
  CSS: "#1572B6",
  "Sass/SCSS": "#CC6699",
  React: "#61DAFB",
  Redux: "#764ABC",
  Vite: "#FFC517",
  Figma: "#F24E1E",
  Git: "#F05032",
  GitHub: "#FFFFFF",
  "Tailwind CSS": "#06B6D4",
  "React Router": "#CA4245",
  WordPress: "#21759B",
};

function Toggle({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "border border-white/10 px-3 py-2",
        "mono ui-micro tracking-[0.28em] uppercase transition-colors",
        active
          ? "bg-white/5 text-white border-teal-400/40"
          : "text-white/60 hover:text-white",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function TechRow({ name, Icon, mode }) {
  const mono = name === "GitHub" ? "#FFFFFF" : "rgba(255,255,255,0.82)";
  const color = mode === "brand" ? (BRAND[name] ?? mono) : mono;

  return (
    <div
      className={[
        "border border-white/10 bg-white/2",
        "h-14 px-4",
        "flex items-center gap-3",
      ].join(" ")}
      title={name}
    >
      <Icon className="h-5 w-5 shrink-0" aria-hidden style={{ color }} />
      <div className="ui-meta text-white/70 truncate leading-none">{name}</div>
    </div>
  );
}

export default function Skills() {
  const [mode, setMode] = useState("mono");
  const [hovered, setHovered] = useState(GROUPS[0].id);

  const hoveredIndex = useMemo(
    () =>
      Math.max(
        0,
        GROUPS.findIndex((g) => g.id === hovered),
      ),
    [hovered],
  );

  return (
    <Reveal preset="up" amount={0.2} once={false} className="block">
      <div className="mx-auto w-full px-6 md:px-8">
        <section className="w-full border border-white/10 bg-white/1">
          {/* Header */}
          <div className="flex items-center justify-between gap-4 px-8 py-4 border-b border-white/10">
            <div className="mono ui-body tracking-[0.35em] text-white/40">
              Stack front-end orientée UI
            </div>

            <div className="flex items-center gap-2">
              <Toggle active={mode === "mono"} onClick={() => setMode("mono")}>
                mono
              </Toggle>
              <Toggle
                active={mode === "brand"}
                onClick={() => setMode("brand")}
              >
                brand
              </Toggle>
            </div>
          </div>

          {/* 3 colonnes qui s’étirent pareil */}
          <div className="grid grid-cols-1 lg:grid-cols-3 items-stretch divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {GROUPS.map((g, colIdx) => {
              const isHot = hovered === g.id;

              return (
                <Reveal
                  key={g.id}
                  preset="up"
                  delay={colIdx * 0.06}
                  once={false}
                  amount={0.2}
                  className="block h-full"
                >
                  {/* hover sur toute la colonne + hauteur pleine */}
                  <div
                    className={[
                      "relative h-full flex flex-col p-8 transition-colors",
                      isHot ? "bg-white/[0.018]" : "bg-transparent",
                    ].join(" ")}
                    onMouseEnter={() => setHovered(g.id)}
                    onFocusCapture={() => setHovered(g.id)}
                  >
                    {/* Header colonne */}
                    <div className="relative pb-6 border-b border-white/10">
                      <div className="mono ui-meta tracking-[0.35em] text-white/45">
                        {g.label}
                      </div>
                      <div className="mt-2 mono ui-micro tracking-[0.22em] text-white/35">
                        {g.meta}
                      </div>

                      {/* underline teal : smooth + fade */}
                      {isHot ? (
                        <motion.div
                          layoutId="col-underline"
                          className="pointer-events-none absolute left-0 right-0 -bottom-px h-px bg-teal-400/35"
                          initial={false}
                          animate={{ opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 32,
                            mass: 0.9,
                          }}
                        />
                      ) : null}
                    </div>

                    {/* Items (flex-1 pour remplir la colonne) */}
                    <div className="pt-6 flex-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {g.items.map((it) => (
                          <TechRow
                            key={it.name}
                            name={it.name}
                            Icon={it.Icon}
                            mode={mode}
                          />
                        ))}
                      </div>
                    </div>

                    {/* (optionnel) petit repère discret de colonne active */}
                    {isHot ? (
                      <div className="pointer-events-none absolute right-6 top-6 mono ui-micro tracking-[0.25em] text-white/25 tabular-nums">
                        {String(hoveredIndex + 1).padStart(2, "0")}
                      </div>
                    ) : null}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
      </div>
    </Reveal>
  );
}
