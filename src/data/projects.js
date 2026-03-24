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
    subtitle: "Outil de création de moodboards interactifs",
    stack: ["React", "Vite", "TailwindCSS", "dnd-kit"],
    year: "2026",
    role: "Front-end development",
    status: "EN DÉVELOPPEMENT",

    tagline: "Structurer l’inspiration, sans casser le flux créatif.",

    taglineSub:
      "Un espace visuel permettant d’assembler, manipuler et exporter des éléments graphiques dans un workflow fluide.",

    summary:
      "Conception d’un outil interactif permettant de centraliser et organiser des inspirations visuelles. L’interface repose sur un canvas manipulable librement, pensé pour reproduire un usage réel en phase de direction artistique ou de conception produit.",

    highlights: [
      "Canvas interactif avec drag & drop permettant une manipulation libre des éléments",
      "Structuration du state pour gérer plusieurs boards et leurs contenus",
      "Intégration d’API externes pour enrichir les palettes et les assets visuels",
      "Export du contenu en image pour faciliter le partage client ou équipe",
      "Approche orientée outil : priorité donnée à la fluidité et à la lisibilité de l’interface",
    ],
    image: macaronImg,
    links: {
      live: "https://hueboard.vercel.app/",
      repo: "https://github.com/A-WEBerBeta/hueboard",
    },
    metaBadges: ["WIP", "React", "Canvas", "Design Tool"],
  },
  {
    id: "obsidian-ink",
    index: "02",
    title: "Obsidian Ink",
    subtitle: "Site vitrine pour un studio créatif",
    stack: ["React", "Vite", "Tailwind v4", "Framer Motion"],
    year: "2026",
    role: "Front-end development",
    status: "ONLINE",

    tagline: "Créer une ambiance sans nuire à l’expérience.",

    taglineSub:
      "Un site pensé pour valoriser une identité forte tout en gardant un parcours utilisateur clair et rapide.",

    summary:
      "Réalisation d’un site vitrine avec une direction artistique marquée. Le travail s’est concentré sur l’équilibre entre esthétique et lisibilité, avec une navigation fluide et des animations discrètes pour ne pas impacter la performance ni la compréhension du contenu.",

    highlights: [
      "Hiérarchisation du contenu pour guider la lecture et la prise de contact",
      "Animations limitées aux transitions utiles pour préserver la fluidité",
      "Système de styles cohérent pour garantir homogénéité et maintenabilité",
      "Optimisation du rendu sur mobile avec priorisation des contenus clés",
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
    subtitle: "Site vitrine orienté contenu",
    stack: ["WordPress", "Elementor", "CSS", "Responsive"],
    year: "2026",
    role: "Intégration front-end",
    status: "ONLINE",

    tagline: "Rendre l’information accessible immédiatement.",

    taglineSub:
      "Une vitrine pensée pour un usage rapide : consulter, comprendre, décider.",

    summary:
      "Intégration d’un site vitrine WordPress pour un café fictif, avec un focus sur la lisibilité et l’accès rapide aux informations essentielles. L’objectif était de structurer le contenu pour un usage mobile prioritaire et une consultation sans friction.",

    highlights: [
      "Structuration du contenu pour accès rapide aux informations clés",
      "Mise en place de sections réutilisables pour faciliter les évolutions",
      "Optimisation mobile : adaptation des typographies et priorités visuelles",
      "Logique éditoriale orientée utilisateur (horaires, menu, accès rapide)",
    ],
    image: mokaImg,
    links: {
      live: null,
      repo: null,
      demoVideo: "https://youtu.be/weJuvUnlI1g",
    },
  },
];

export const otherProjects = [
  {
    id: "portfolio-v1",
    index: "04",
    title: "Portfolio V.1",
    subtitle: "Projet React - UI & architecture",
    stack: ["React", "Vite", "JavaScript", "CSS Modules"],
    year: "2025",
    role: "Front-end",
    status: "ARCHIVÉ",
    tagline: "Première itération.",
    taglineSub:
      "Base initiale avant la refonte : structure, composants, premières itérations UI.",
    summary:
      "Version initiale de mon portfolio React. Base de travail ayant permis de structurer l’architecture et d’identifier les axes d’amélioration pour la version actuelle.",
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
  {
    id: "kasa",
    index: "05",
    title: "Kasa",
    subtitle: "OpenClassrooms",
    stack: ["React", "React Router", "JavaScript", "HTML", "CSS"],
    year: "2025",
    role: "Intégration",
    status: "TERMINÉ",
    tagline: "Construire une base solide en React.",
    taglineSub: "Routing, composants réutilisables et UI fidèle à la maquette.",
    summary:
      "Projet de formation ayant permis de consolider les fondamentaux React : routing, composants réutilisables et gestion des états d’interface dans une application structurée.",
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
