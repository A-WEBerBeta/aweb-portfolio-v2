import { useMemo, useState } from "react";
import BackgroundLayer from "./components/BackgroundLayer";
import ContactConsole from "./components/ContactConsole";
import HeroIntro from "./components/HeroIntro";
import ManifestOverlay from "./components/ManifestOverlay";
import ProjectManifest from "./components/ProjectManifest";
import Section from "./components/Section";
import SideNav from "./components/SideNav";
import Signature from "./components/Signature";
import SkillsMatrix from "./components/SkillsMatrix";
import { otherProjects, primaryProjects } from "./data/projects";
import { sections } from "./data/sections";
import { useActiveSection } from "./hooks/useActiveSection";

export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  // overlay state
  const [manifestOpen, setManifestOpen] = useState(false);

  const ids = useMemo(() => sections.map((s) => s.id), []);
  const activeId = useActiveSection(ids, { rootMargin: "-20% 0px -55% 0px" });

  const navWidth = collapsed ? 88 : 320;

  const allProjects = useMemo(() => [...primaryProjects, ...otherProjects], []);

  const jump = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-dvh text-white">
      <BackgroundLayer activeId={activeId} />

      <SideNav
        sections={sections}
        activeId={activeId}
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        onJump={jump}
      />

      <main style={{ marginLeft: navWidth }}>
        {/* HERO (plein écran) */}
        <Section
          id="intro"
          layout="console"
          backdrop="grid"
          showHeader={false}
          showSectionScanner
          showSectionSeparator
        >
          <HeroIntro onJump={jump} />
        </Section>

        {/* PROJECTS (plein écran) */}
        <Section
          id="work"
          layout="console"
          backdrop="dots"
          showSectionScanner={false}
          showSectionSeparator={false}
          kicker="SELECTED MISSIONS"
          title="Projects Manifest"
          rightSlot={
            <button
              type="button"
              onClick={() => setManifestOpen(true)}
              className="group mono text-xs tracking-[0.35em] text-white/45 hover:text-white inline-flex items-center gap-2"
            >
              <span className="relative">
                MANIFESTE COMPLET
                <span className="absolute left-0 -bottom-1 h-px w-0 bg-white/40 transition-all duration-200 group-hover:w-full" />
              </span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </button>
          }
        >
          <ProjectManifest primary={primaryProjects} other={otherProjects} />
        </Section>

        {/* SKILLS (hauteur contenu, pas 100vh) */}
        <Section
          id="skills"
          layout="full"
          backdrop="band"
          showSectionScanner
          showSectionSeparator
          kicker="TOOLCHAIN"
          title="Compétences"
          rightSlot={
            <div className="mono text-xs tracking-[0.35em] text-white/45">
              MATRICE TECHNIQUE
            </div>
          }
        >
          <SkillsMatrix />
        </Section>

        {/* ABOUT (hauteur contenu) */}
        <Section
          id="about"
          layout="console"
          backdrop="paper"
          showSectionScanner
          showSectionSeparator
          kicker="SIGNAL / STORY"
          title="Signature"
          rightSlot={
            <div className="mono text-xs tracking-[0.35em] text-white/45">
              STATUT
            </div>
          }
        >
          <Signature />
        </Section>

        {/* CONTACT (hauteur contenu) */}
        <Section
          id="contact"
          layout="console"
          backdrop="plain"
          fill={false}
          showSectionScanner
          showSectionSeparator
          kicker="HANDSHAKE"
          title="Entrer en relation"
          rightSlot={
            <div className="mono text-xs tracking-[0.35em] text-white/45">
              CANAL OUVERT
            </div>
          }
        >
          <ContactConsole />
        </Section>
      </main>

      <ManifestOverlay
        open={manifestOpen}
        onClose={() => setManifestOpen(false)}
        projects={allProjects}
      />
    </div>
  );
}
