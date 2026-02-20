export default function SectionBackdrop({ variant = "plain" }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* ICI : PAS de haze, PAS de halos, PAS de grain global */}

      {variant === "grid" && (
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              opacity: 0.16,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), " +
                "linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
              backgroundSize: "120px 120px",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              opacity: 0.09,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), " +
                "linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          {/* <div className="absolute inset-0 bg-black/10" /> */}
        </div>
      )}

      {variant === "dots" && (
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              opacity: 0.12,
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          {/* <div className="absolute inset-0 bg-black/10" /> */}
        </div>
      )}

      {variant === "band" && (
        <div className="absolute inset-0">
          <div
            className="absolute inset-x-0 top-[34%] h-[36%]"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.00), rgba(0,0,0,0.35), rgba(0,0,0,0.00))",
              filter: "blur(10px)",
              opacity: 0.6,
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
            }}
          />
        </div>
      )}

      {variant === "paper" && (
        <div className="absolute inset-0">
          {/* voile clair neutre (laisse passer le grain) */}
          <div className="absolute inset-0 bg-white/[0.035]" />

          {/* micro-stries très fines (texture matte) */}
          <div
            className="absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 8px)",
            }}
          />

          {/* <div className="absolute inset-0 bg-black/10" /> */}
        </div>
      )}
    </div>
  );
}
