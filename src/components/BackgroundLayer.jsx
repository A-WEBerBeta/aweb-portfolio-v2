export default function BackgroundLayer() {
  // Grain SVG (feTurbulence) encodé en data URI
  const grainDataUri =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='.45'/%3E%3C/svg%3E";

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base (évite le noir pur) */}
      <div className="absolute inset-0 bg-[#0c0e11]" />

      {/* Haze global : une seule fois, stable */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1100px 650px at 32% 22%, rgba(255,255,255,0.065), transparent 62%)," +
            "radial-gradient(950px 650px at 78% 62%, rgba(20,184,166,0.04), transparent 62%)," +
            "radial-gradient(1400px 900px at 50% 50%, rgba(0,0,0,0.18), rgba(0,0,0,0.45) 78%, rgba(0,0,0,0.62) 100%)",
        }}
      />

      {/* Grid global ultra léger (cohérence + structure) */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.1,
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), " +
            "linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Micro grid (texture) */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.06,
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), " +
            "linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Grain global (plus visible, mais propre) */}
      <div
        className="absolute inset-0 mix-blend-soft-light"
        style={{
          opacity: 0.6,
          backgroundImage: `url("${grainDataUri}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "220px 220px",
        }}
      />

      {/* Anti-banding ultra discret (évite les aplats “smooth”) */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.04,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 10px)",
        }}
      />

      {/* Vignette : moins violente que 0.88 (LCD friendly) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.72)_100%)]" />
    </div>
  );
}
