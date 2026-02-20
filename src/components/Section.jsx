import { motion } from "framer-motion";
import SectionBackdrop from "./SectionBackdrop";

export default function Section({
  id,
  kicker,
  title,
  children,
  rightSlot,
  backdrop = "plain",
  layout = "split", // "split" | "full" | "console"
  showHeader = true,
  showSectionSeparator = true,
  showSectionScanner = true, // repère teal
}) {
  const isConsole = layout === "console";

  const hasHeaderContent = Boolean(kicker || title || rightSlot);
  const shouldRenderHeader = showHeader && hasHeaderContent;

  // === Footer console: overlay bottom (OK pour 100vh)
  const consoleFooter =
    showSectionSeparator || showSectionScanner ? (
      <>
        {showSectionSeparator ? (
          <div className="pointer-events-none absolute left-10 right-10 bottom-10 h-px bg-white/10 z-20" />
        ) : null}

        {showSectionScanner ? (
          <div className="pointer-events-none absolute left-1/2 bottom-10 h-3 w-3 -translate-x-1/2 translate-y-1/2 z-20">
            <div className="h-full w-full border border-teal-400/40" />
            <div className="absolute inset-0 bg-teal-400/25 blur-md animate-[pulse_4s_ease-in-out_infinite]" />
          </div>
        ) : null}
      </>
    ) : null;

  // === Footer normal: dans le flow
  const flowFooter =
    showSectionSeparator || showSectionScanner ? (
      <div className="mt-10 sm:mt-12 lg:mt-16 relative">
        {showSectionSeparator ? (
          <div className="h-px w-full bg-white/10" />
        ) : null}

        {showSectionScanner ? (
          <div className="pointer-events-none absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2">
            <div className="h-full w-full border border-teal-400/40" />
            <div className="absolute inset-0 bg-teal-400/25 blur-md animate-[pulse_4s_ease-in-out_infinite]" />
          </div>
        ) : null}
      </div>
    ) : null;

  return (
    <section
      id={id}
      className={[
        "relative overflow-hidden",
        isConsole ? "h-dvh" : "h-auto",
        isConsole ? "px-0 py-0" : "px-8 py-8",
      ].join(" ")}
    >
      <SectionBackdrop variant={backdrop} />

      {isConsole ? (
        <div
          className="relative h-full w-full grid z-10"
          style={{ gridTemplateRows: shouldRenderHeader ? "auto 1fr" : "1fr" }}
        >
          {/* ===== HEADER CONSOLE ===== */}
          {shouldRenderHeader ? (
            <div className="px-8 sm:px-10 pt-12 sm:pt-14">
              <div className="flex items-end justify-between gap-8">
                <div className="max-w-[90%] lg:max-w-245">
                  {kicker ? (
                    <div className="mono text-xs tracking-[0.35em] text-white/40">
                      {kicker}
                    </div>
                  ) : null}

                  {title ? (
                    <motion.h2
                      className="
                        mt-4 sm:mt-6
                        text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl
                        font-semibold text-white
                        leading-[0.92] tracking-[-0.02em]
                      "
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ amount: 0.35, once: true }}
                      transition={{ duration: 0.45 }}
                    >
                      {title}
                    </motion.h2>
                  ) : null}
                </div>

                {rightSlot ? (
                  <div className="text-right text-white/60">{rightSlot}</div>
                ) : null}
              </div>
            </div>
          ) : null}

          {/* ===== CONTENU CONSOLE ===== */}
          <div
            className={[
              "min-h-0",
              shouldRenderHeader
                ? "px-8 sm:px-10 pt-8 sm:pt-10 pb-12 sm:pb-14"
                : "h-full",
            ].join(" ")}
          >
            <div className="h-full min-h-0">{children}</div>
          </div>

          {consoleFooter}
        </div>
      ) : (
        <div className="relative w-full z-10">
          {/* ===== HEADER NORMAL ===== */}
          {shouldRenderHeader ? (
            <div className="flex items-end justify-between gap-8">
              <div className="max-w-[90%] lg:max-w-225">
                {kicker ? (
                  <div className="mono text-xs tracking-[0.35em] text-white/40">
                    {kicker}
                  </div>
                ) : null}

                {title ? (
                  <motion.h2
                    className="
                      mt-4 sm:mt-6
                      text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl
                      font-semibold text-white
                      leading-[0.95]
                    "
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.35, once: true }}
                    transition={{ duration: 0.45 }}
                  >
                    {title}
                  </motion.h2>
                ) : null}
              </div>

              {rightSlot ? (
                <div className="text-right text-white/60">{rightSlot}</div>
              ) : null}
            </div>
          ) : null}

          {/* ===== CONTENU NORMAL ===== */}
          {layout === "split" ? (
            <div
              className={
                shouldRenderHeader
                  ? "mt-8 sm:mt-10 grid grid-cols-12 gap-8"
                  : "grid grid-cols-12 gap-8"
              }
            >
              <div className="col-span-12 lg:col-span-7 text-white/70 leading-relaxed">
                {children}
              </div>

              <div className="hidden lg:block col-span-5 text-white/60" />
            </div>
          ) : (
            <div className={shouldRenderHeader ? "mt-8 sm:mt-10" : "mt-0"}>
              {children}
            </div>
          )}

          {flowFooter}
        </div>
      )}
    </section>
  );
}
