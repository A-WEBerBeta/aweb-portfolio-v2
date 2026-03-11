import kasaImg from "../assets/projects/kasa.png";
import macaronImg from "../assets/projects/macaron.png";
import mokaImg from "../assets/projects/moka.png";
import obsidianImg from "../assets/projects/obsidian.png";
import v1Img from "../assets/projects/v1-projects.png";

export const primaryProjects = [
  {
    id: "hueboard",
    index: "01",
    title: "HueBoard",
    subtitle: "Outil visuel de création de moodboards",
    stack: ["React", "Vite", "TailwindCSS", "dnd-kit"],
    year: "2026",
    role: "Front-end",
    status: "EN DÉVELOPPEMENT",
    tagline: "Composer, explorer, expérimenter.",
    taglineSub:
      "Un canvas interactif pour assembler palettes, typographies, images et formes dans un moodboard visuel.",
    summary:
      "Application React permettant de créer des moodboards interactifs. Les utilisateurs peuvent ajouter des éléments visuels (images, formes, typographies, palettes), les manipuler librement sur un canvas et générer des palettes de couleurs. Le projet explore les interactions modernes inspirées d’outils comme Figma ou Milanote.",
    highlights: [
      "Canvas interactif avec drag & drop (dnd-kit)",
      "Ajout d’éléments : notes, shapes, typographies, images Unsplash et palettes",
      "Génération de palettes via The Color API + extraction depuis images",
      "Gestion de plusieurs boards avec sauvegarde locale",
      "Export du moodboard en image (PNG)",
    ],
    image: macaronImg,
    links: {
      live: null,
      repo: "https://github.com/A-WEBerBeta/hueboard",
    },
    metaBadges: ["WIP", "React", "Canvas", "Design Tool"],
  },
  {
    id: "obsidian-ink",
    index: "02",
    title: "Obsidian Ink",
    subtitle: "Studio Tattoo - site vitrine responsive",
    stack: ["React", "Vite", "Tailwind v4", "Framer Motion"],
    year: "2026",
    role: "Front-end",
    status: "ONLINE",
    tagline: "Interface sombre. Détails nets.",
    taglineSub:
      "Une vitrine qui pose une ambiance, guide l’utilisateur, et reste rapide à parcourir.",
    summary:
      "Site vitrine React pour un studio de tatouage fictif. Navigation claire, ambiance sombre maîtrisée et animations discrètes. Déployé sur Vercel avec un focus sur lisibilité et performance.",
    highlights: [
      "Structure en sections + navigation latérale (parcours simple, repères clairs)",
      "Animations Framer Motion (reveal, transitions) calibrées pour rester discrètes",
      "Système de styles Tailwind cohérent (typo, espacements, états) sans surcharge",
    ],
    image: obsidianImg,
    links: {
      live: "https://obsidian-ink-nancy.vercel.app/",
      repo: "https://github.com/A-WEBerBeta/obsidian-ink-website",
    },
  },

  {
    id: "moka-miel",
    index: "03",
    title: "Moka & Miel",
    subtitle: "Cosy café & expérience de précommande",
    stack: ["WordPress", "Elementor", "CSS", "Responsive"],
    year: "2026",
    role: "Intégration",
    status: "ONLINE",
    tagline: "Chaleureux, lisible, efficace.",
    taglineSub:
      "Une vitrine WordPress orientée contenu : on trouve vite, on lit bien, on comprend.",
    summary:
      "Site vitrine WordPress pour un café fictif, centré sur la lisibilité et l’accès rapide aux informations clés. Mise en page chaleureuse et responsive optimisé pour mobile.",
    highlights: [
      "Intégration Elementor : sections réutilisables + mise en page cohérente",
      "Responsive : ajustements mobiles (typographies, espacements, priorités de contenu)",
      "Structure de contenu pensée “vitrine” (infos clés accessibles rapidement)",
    ],
    image: mokaImg,
    links: {
      live: null,
      repo: null,
      demoVideo: "https://youtu.be/weJuvUnlI1g",
    },
  },

  {
    id: "portfolio-v1",
    index: "04",
    title: "Portfolio V.1",
    subtitle: "Projet React - UI & architecture",
    stack: ["React", "Vite", "JavaScript", "CSS Modules"],
    year: "2025",
    role: "Front-end",
    status: "ARCHIVÉ",
    tagline: "Point de départ.",
    taglineSub:
      "Base initiale avant la refonte : structure, composants, premières itérations UI.",
    summary:
      "Première version de mon portfolio React. Base d’architecture, organisation des composants et premières explorations UI avant la refonte actuelle.",
    highlights: [
      "Mise en place des pages et composants de base (structure)",
      "Organisation du projet : dossiers, assets, styles (CSS Modules)",
      "Premiers choix UI + itérations (ce qui a mené à la V2)",
      "Projet “archive” documenté : utile pour montrer l’évolution",
    ],
    image: v1Img,
    links: {
      live: null,
      repo: "https://github.com/A-WEBerBeta/aweb-portfolio#",
    },
    metaBadges: ["Archive", "React", "UI"],
  },
];

export const otherProjects = [
  {
    id: "kasa",
    index: "05",
    title: "Kasa",
    subtitle: "OpenClassrooms",
    stack: ["React", "React Router", "JavaScript", "HTML", "CSS"],
    year: "2025",
    role: "Intégration",
    status: "TERMINÉ",
    tagline: "App React responsive.",
    taglineSub: "Routing, composants réutilisables et UI fidèle à la maquette.",
    summary:
      "Application de location immobilière développée avec React à partir d’une maquette. Mise en place d’une navigation SPA avec React Router, pages dynamiques (logements), gestion des états UI (erreurs/404) et intégration responsive.",
    highlights: [
      "SPA + React Router (routes dynamiques)",
      "Composants réutilisables (cards, carousel, accordéon)",
      "Gestion des états UI (404, données manquantes)",
      "Responsive (Flex/Grid) et structure CSS propre",
    ],
    image: kasaImg,
    links: {
      live: "https://kasa-zeta-murex.vercel.app/",
      repo: "https://github.com/A-WEBerBeta/P11_Kasa",
    },
    metaBadges: ["OC", "React", "SPA", "Responsive"],
  },
];
