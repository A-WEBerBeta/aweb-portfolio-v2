import { useEffect, useMemo, useRef, useState } from "react";
import BackgroundLayer from "./components/BackgroundLayer";
import ContactConsole from "./components/ContactConsole";
import HeroIntro from "./components/HeroIntro";
import ManifestOverlay from "./components/ManifestOverlay";
import ProjectManifest from "./components/ProjectManifest";
import Section from "./components/Section";
import SideNav from "./components/SideNav";
import Signature from "./components/Signature";
import Skills from "./components/Skills";
import { otherProjects, primaryProjects } from "./data/projects";
import { sections } from "./data/sections";
import { useActiveSection } from "./hooks/useActiveSection";

function useResponsiveNavWithOverride() {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);
  const [isUltraWide, setIsUltraWide] = useState(
    () => window.innerWidth >= 1920,
  );
  const [collapsed, setCollapsed] = useState(false);

  const userOverrideRef = useRef(null);

  useEffect(() => {
    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const mqWide = window.matchMedia("(min-width: 1300px)");
    const mqUltra = window.matchMedia("(min-width: 1920px)");

    const apply = () => {
      const desktop = mqDesktop.matches;
      const wide = mqWide.matches;
      const ultra = mqUltra.matches;

      setIsDesktop(desktop);
      setIsUltraWide(ultra);

      if (!desktop) {
        userOverrideRef.current = null;
        return;
      }

      const zone = wide ? "wide" : "mid";

      if (
        userOverrideRef.current?.zone &&
        userOverrideRef.current.zone !== zone
      ) {
        userOverrideRef.current = null;
      }

      if (userOverrideRef.current == null) {
        setCollapsed(!wide);
      } else {
        setCollapsed(userOverrideRef.current.value);
      }
    };

    apply();
    mqDesktop.addEventListener("change", apply);
    mqWide.addEventListener("change", apply);
    mqUltra.addEventListener("change", apply);

    return () => {
      mqDesktop.removeEventListener("change", apply);
      mqWide.removeEventListener("change", apply);
      mqUltra.removeEventListener("change", apply);
    };
  }, []);

  const toggleCollapsed = () => {
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!desktop) return;

    const wide = window.matchMedia("(min-width: 1300px)").matches;
    const zone = wide ? "wide" : "mid";

    setCollapsed((prev) => {
      const next = !prev;
      userOverrideRef.current = { value: next, zone };
      return next;
    });
  };

  return { isDesktop, isUltraWide, collapsed, toggleCollapsed };
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // overlay state
  const [manifestOpen, setManifestOpen] = useState(false);

  const ids = useMemo(() => sections.map((s) => s.id), []);
  const activeId = useActiveSection(ids, { rootMargin: "-20% 0px -55% 0px" });

  const allProjects = useMemo(() => [...primaryProjects, ...otherProjects], []);

  const jump = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const { isDesktop, isUltraWide, collapsed, setCollapsed } =
    useResponsiveNavWithOverride();

  return (
    <div className="min-h-dvh text-white">
      <BackgroundLayer activeId={activeId} />

      {/* ===== DESKTOP SIDENAV ===== */}
      <div className="hidden lg:block">
        <SideNav
          sections={sections}
          activeId={activeId}
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
          onJump={jump}
          variant="rail"
        />
      </div>

      {/* ===== MOBILE DRAWER ===== */}
      <div className="lg:hidden">
        <SideNav
          sections={sections}
          activeId={activeId}
          collapsed={false}
          onToggle={() => {}}
          onJump={jump}
          variant="drawer"
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
      </div>

      {/* ===== MOBILE HEADER ===== */}
      <div className="lg:hidden sticky top-0 z-50 flex items-center justify-between px-5 h-16 border-b border-white/10 bg-[rgba(10,11,13,0.85)] backdrop-blur-[6px]">
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="mono h-10 w-10 border border-white/15 text-white/80 bg-white/5 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Ouvrir le menu"
        >
          ≡
        </button>

        <div className="mono text-[12px] tracking-[0.18em] text-white/60">
          PORTFOLIO
        </div>

        <div className="w-10" />
      </div>

      <main className={collapsed ? "lg:ml-22" : "lg:ml-80"}>
        {/* HERO */}
        <Section
          id="intro"
          layout={isDesktop ? "console" : "full"}
          backdrop="grid"
          showHeader={false}
          showSectionScanner
          showSectionSeparator
        >
          <HeroIntro onJump={jump} />
        </Section>

        {/* PROJECTS */}
        <Section
          id="work"
          layout={isUltraWide ? "console" : "full"}
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

        {/* SKILLS */}
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
          <Skills />
        </Section>

        {/* ABOUT */}
        <Section
          id="about"
          layout={isDesktop && isUltraWide ? "console" : "full"}
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

        {/* CONTACT */}
        <Section
          id="contact"
          layout={isDesktop && isUltraWide ? "console" : "full"}
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
