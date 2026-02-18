export const skillGroups = [
  {
    id: "frontend",
    label: "Front-end",
    meta: "React / UI / State",
    items: [
      { name: "React", level: 3, note: "Composants, hooks, patterns" },
      { name: "Vite", level: 3, note: "Setup, perf, DX" },
      { name: "Routing", level: 2, note: "React Router, layouts" },
      { name: "State", level: 2, note: "Local + global simple" },
      { name: "Framer Motion", level: 2, note: "Transitions, reveal, scroll" },
    ],
  },
  {
    id: "ui",
    label: "UI / CSS",
    meta: "Tailwind / Design system",
    items: [
      { name: "Tailwind v4", level: 2, note: "Tokens, variants, composition" },
      { name: "Responsive", level: 3, note: "Grid, fluid type, breakpoints" },
      { name: "Motion UI", level: 2, note: "Rythme, intention, sobriété" },
      { name: "Typography", level: 3, note: "Hiérarchie, lisibilité" },
    ],
  },
  {
    id: "web",
    label: "Web",
    meta: "Qualité / SEO",
    items: [
      { name: "Performance", level: 3, note: "Images, lazy, audits" },
      { name: "SEO", level: 3, note: "Structure, contenu, meta" },
      { name: "API", level: 1, note: "REST, fetch, erreurs" },
      { name: "Auth (bases)", level: 1, note: "JWT, flux simples" },
    ],
  },
  {
    id: "tooling",
    label: "Tooling",
    meta: "Git / Debug / Deploy",
    items: [
      { name: "Git", level: 3, note: "Branches, PR, conflits" },
      { name: "Debug", level: 3, note: "DevTools, logs utiles" },
      { name: "Deploy", level: 2, note: "Netlify/Vercel" },
      { name: "WordPress", level: 2, note: "Intégration, templates, perf" },
    ],
  },
];
