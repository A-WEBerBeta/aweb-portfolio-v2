import mokaImg from "../assets/projects/moka.png";
import obsidianImg from "../assets/projects/obsidian.png";
import portfolioImg from "../assets/projects/portfolio-v1.png";

export const primaryProjects = [
  {
    id: "obsidian-ink",
    index: "01",
    title: "Obsidian Ink",
    subtitle: "Studio Tattoo - site vitrine responsive",
    stack: ["React", "Vite", "Tailwind v4", "Framer Motion"],
    year: "2026",
    role: "Front-end",
    status: "ONLINE",
    tagline: "Interface sombre. Détails nets.",
    taglineSub:
      "Navigation latérale, animations maîtrisées, sections rythmées. Une expérience “tech noir” sans effets gadget.",
    summary:
      "Conception et développement d'un site vitrine moderne pour un studio de tatouage fictif, avec un design sombre premium, une expérience mobile soignée et un parcours de prise de rendez-vous optimisé.",
    highlights: [
      "Animations Motion (entrée, reveal, scroll)",
      "UI Tailwind (sans radius, sans cartes)",
      "Structure et rythme des sections",
    ],
    image: obsidianImg,
    links: {
      live: "https://obsidian-ink-nancy.vercel.app/",
      repo: "https://github.com/A-WEBerBeta/obsidian-ink-website",
    },
    metaBadges: ["UI", "Motion", "Responsive"],
  },
  {
    id: "moka-miel",
    index: "02",
    title: "Moka & Miel",
    subtitle: "Cosy café & expérience de précommande",
    stack: ["WordPress", "Elementor", "SEO", "Performances"],
    year: "2026",
    role: "Intégration / UI",
    status: "ONLINE",
    tagline: "Chaleureux, lisible, efficace.",
    taglineSub:
      "Un site vitrine orienté contenu : structure propre, SEO, et performances au centre.",
    summary:
      "Création d'un site vitrine immersif sous WordPress avec prototype de précommande et travail poussé sur la cohérence UI et le responsive.",
    highlights: [
      "Structure des pages & contenus",
      "Optimisations (images, cache, Core Web Vitals)",
      "Mise en page responsive",
    ],
    image: mokaImg,
    links: {
      live: null,
      repo: null,
      demoVideo: "https://youtu.be/weJuvUnlI1g",
    },
    metaBadges: ["WordPress", "SEO", "Perf"],
  },
  {
    id: "portfolio-v1",
    index: "03",
    title: "Portfolio v.1",
    subtitle: "Projet React - UI & architecture",
    stack: ["React", "Vite", "JavaScript", "CSS Modules"],
    year: "2025",
    role: "Front-end",
    status: "ARCHIVÉ",
    tagline: "Point de départ.",
    taglineSub:
      "Base initiale avant la refonte : structure, composants, premières itérations UI.",
    summary:
      "Première version du portfolio : fondation des contenus et de l’architecture, avant le passage à une expérience “console”.",
    highlights: ["Architecture React", "Composants de base", "Itérations UI"],
    image: portfolioImg,
    links: {
      live: null,
      repo: "https://github.com/A-WEBerBeta/aweb-portfolio#",
    },
    metaBadges: ["Archive", "React", "UI"],
  },
];

export const otherProjects = [
  {
    id: "oc-booki",
    index: "04",
    title: "Booki",
    subtitle: "OpenClassrooms",
    stack: ["HTML", "CSS"],
    year: "2024",
    role: "Intégration",
    status: "TERMINÉ",
    tagline: "Fondations front.",
    taglineSub: "Intégration responsive et structure HTML/CSS propre.",
    summary:
      "Intégration responsive avec une attention portée à la structure et au layout.",
    highlights: ["Responsive", "Flex / Grid", "Structure propre"],
    image: null,
    links: { live: "#", repo: "#" },
    metaBadges: ["OC", "Intégration"],
  },
  // Ajoute les autres OC ici…
];
