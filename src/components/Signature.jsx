import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";

function Info({ label, value }) {
  return (
    <div className="space-y-1">
      <div className="mono text-[11px] tracking-[0.30em] text-white/35">
        {label}
      </div>
      <div className="text-[14px] text-white/75">{value}</div>
    </div>
  );
}

function SignalField({ active }) {
  return (
    <Reveal preset="scale" once={false} amount={0.22} className="w-full">
      <div className="relative w-full overflow-hidden min-h-85 sm:min-h-105 lg:min-h-130">
        {/* filaments */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* filament 1 */}
          <motion.div
            className="absolute -left-10 top-[16%] h-px w-[140%]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(20,184,166,0.18), rgba(255,255,255,0.08), transparent)",
            }}
            animate={
              active
                ? { x: [-40, 40, -40], opacity: [0.25, 0.55, 0.25] }
                : { opacity: 0 }
            }
            transition={{
              duration: 9.5,
              repeat: active ? Infinity : 0,
              ease: "easeInOut",
            }}
          />

          {/* filament 2 */}
          <motion.div
            className="absolute -left-10 top-[44%] h-px w-[140%]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.10), rgba(20,184,166,0.14), transparent)",
            }}
            animate={
              active
                ? { x: [55, -35, 55], opacity: [0.18, 0.42, 0.18] }
                : { opacity: 0 }
            }
            transition={{
              duration: 12,
              repeat: active ? Infinity : 0,
              ease: "easeInOut",
            }}
          />

          {/* filament 3 */}
          <motion.div
            className="absolute -left-10 top-[72%] h-px w-[140%]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(20,184,166,0.12), rgba(255,255,255,0.06), transparent)",
            }}
            animate={
              active
                ? { x: [-25, 65, -25], opacity: [0.12, 0.32, 0.12] }
                : { opacity: 0 }
            }
            transition={{
              duration: 10.8,
              repeat: active ? Infinity : 0,
              ease: "easeInOut",
            }}
          />

          {/* CARRÉS TEAL */}
          {[
            { top: "18%", left: "42%" },
            { top: "46%", left: "52%" },
            { top: "74%", left: "38%" },
          ].map((p, idx) => (
            <motion.div
              key={idx}
              className="absolute h-2.5 w-2.5 border border-teal-400/40"
              style={{ top: p.top, left: p.left }}
              animate={active ? { opacity: [0.25, 1, 0.25] } : { opacity: 0 }}
              transition={{
                duration: 3.6 + idx * 0.6,
                repeat: active ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              <div className="absolute inset-0 bg-teal-400/25 blur-md" />
            </motion.div>
          ))}
        </motion.div>

        {/* MICRO-INFOS — DESKTOP (overlay à droite) */}
        <Reveal
          preset="right"
          once={false}
          amount={0.35}
          className="hidden lg:flex absolute right-0 inset-y-0 flex-col justify-between top-0 space-y-6 text-right"
        >
          <Info label="LOCALISATION" value="Verdun · Grand Est" />
          <Info label="MOBILITÉ" value="Metz · Nancy · Remote" />
          <Info label="DISPONIBLE POUR" value="Mission · Freelance · Poste" />
          <Info label="FOCUS" value="Front-end · React" />
          <Info label="DÉMARRAGE" value="Immédiat" />
        </Reveal>

        {/* MICRO-INFOS — MOBILE/TABLET (grille sous le visuel, pas d’overlay) */}
        <div className="lg:hidden relative z-10 mt-6 border-t border-white/10 pt-5">
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            <Info label="LOCALISATION" value="Verdun · Grand Est" />
            <Info label="MOBILITÉ" value="Metz · Nancy · Remote" />
            <Info label="DISPONIBLE" value="Mission · Freelance · Poste" />
            <Info label="FOCUS" value="Front-end · React" />
            <Info label="DÉMARRAGE" value="Immédiat" />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function AboutEditorial() {
  const ref = useRef(null);

  const inView = useInView(ref, {
    amount: 0.18,
    once: false,
    margin: "0px 0px -30% 0px",
  });

  return (
    <div ref={ref} className="h-full min-h-0">
      <div className="h-full min-h-0 flex items-center">
        <div className="w-full">
          {/* padding responsive (évite les blocs énormes en petit écran) */}
          <div className="py-6 sm:py-8 lg:py-8">
            {/* GRID responsive */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start lg:items-center">
              {/* GAUCHE */}
              <div className="lg:col-span-7">
                <div className="space-y-10 sm:space-y-12 lg:space-y-16">
                  {/* 01 */}
                  <Reveal
                    preset="up"
                    once={false}
                    amount={0.22}
                    delay={0.18}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8"
                  >
                    <div className="mono text-white/25 text-[11px] sm:text-[12px] tracking-[0.30em] lg:col-span-2">
                      01
                    </div>

                    <div className="lg:col-span-10">
                      <h3 className="text-[26px] sm:text-[30px] lg:text-[36px] leading-tight font-semibold text-white">
                        Précision avant tout.
                      </h3>

                      <div className="mt-4 sm:mt-5 max-w-[60ch] text-white/75 leading-relaxed space-y-3">
                        <p>
                          Pendant quinze ans, j’ai exercé comme opticienne. Un
                          métier où chaque millimètre compte.
                        </p>
                        <p>
                          Cette exigence de rigueur et d’ajustement guide
                          aujourd’hui ma manière de concevoir des interfaces.
                        </p>
                      </div>

                      <div className="mt-6 sm:mt-7 h-px w-56 sm:w-70 bg-teal-400/60" />
                    </div>
                  </Reveal>

                  {/* 02 */}
                  <Reveal
                    preset="up"
                    once={false}
                    amount={0.22}
                    delay={0.36}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8"
                  >
                    <div className="mono text-white/25 text-[11px] sm:text-[12px] tracking-[0.30em] lg:col-span-2">
                      02
                    </div>

                    <div className="lg:col-span-10">
                      <h3 className="text-[26px] sm:text-[30px] lg:text-[36px] leading-tight font-semibold text-white">
                        Le déclic.
                      </h3>

                      <div className="mt-4 sm:mt-5 max-w-[60ch] text-white/75 leading-relaxed space-y-3">
                        <p>
                          La découverte du développement web a ouvert un nouveau
                          terrain d’expression : comprendre, structurer,
                          construire.
                        </p>
                        <p>
                          Très vite, créer des interfaces est devenu une
                          évidence.
                        </p>
                      </div>

                      <div className="mt-6 sm:mt-7 h-px w-56 sm:w-70 bg-white/15" />
                    </div>
                  </Reveal>

                  {/* 03 */}
                  <Reveal
                    preset="up"
                    once={false}
                    amount={0.22}
                    delay={0.54}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8"
                  >
                    <div className="mono text-white/25 text-[11px] sm:text-[12px] tracking-[0.30em] lg:col-span-2">
                      03
                    </div>

                    <div className="lg:col-span-10">
                      <h3 className="text-[26px] sm:text-[30px] lg:text-[36px] leading-tight font-semibold text-white">
                        Construire du durable.
                      </h3>

                      <div className="mt-4 sm:mt-5 max-w-[60ch] text-white/75 leading-relaxed space-y-3">
                        <p>
                          Je développe des interfaces claires, rapides et
                          maintenables, avec une attention particulière à la
                          lisibilité et à l’accessibilité.
                        </p>
                        <p>
                          Des produits conçus pour durer — pas juste pour
                          impressionner.
                        </p>
                      </div>

                      <div className="mt-6 sm:mt-7 h-px w-56 sm:w-70 bg-white/15" />
                    </div>
                  </Reveal>
                </div>
              </div>

              {/* DROITE */}
              <div className="lg:col-span-5">
                <SignalField active={inView} />
              </div>
            </div>

            {/* phrase finale */}
            <motion.div
              className="mt-12 sm:mt-16 lg:mt-25"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.35, once: false }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
            >
              <p className="max-w-[52ch] text-[16px] sm:text-[18px] text-white/85 italic">
                Interfaces sobres, lisibles et pensées pour un usage réel.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
