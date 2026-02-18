import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const CHANNELS = [
  {
    label: "M’écrire un email",
    meta: "Le plus direct",
    href: "mailto:aurelie.weber@email.com",
    id: "email",
  },
  {
    label: "LinkedIn",
    meta: "Pro / réseau",
    href: "https://linkedin.com",
    id: "linkedin",
  },
  {
    label: "GitHub",
    meta: "Code & projets",
    href: "https://github.com",
    id: "github",
  },
];

const PURPOSES = [
  { id: "job", label: "Opportunité", hint: "CDD / CDI / alternance" },
  { id: "freelance", label: "Projet", hint: "Mission courte / site / app" },
  { id: "collab", label: "Collab", hint: "Pair / side / hack" },
];

const TONES = [
  { id: "simple", label: "Simple" },
  { id: "pro", label: "Pro" },
  { id: "direct", label: "Direct" },
];

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "mono text-[12px] tracking-[0.14em] border px-4 py-2",
        active
          ? "border-teal-400/40 text-white"
          : "border-white/10 text-white/60 hover:text-white hover:border-white/20",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Underline() {
  return (
    <div className="mt-6 h-px bg-white/10 overflow-hidden">
      <motion.div
        className="h-full bg-teal-400/55"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </div>
  );
}

function buildMessage({ purpose, tone }) {
  const base = {
    pro: "Bonjour Aurélie,\n\nJe vous contacte au sujet d’une opportunité. Est-ce que vous seriez disponible pour en discuter rapidement ?\n\nContexte : [poste/projet] · [durée] · [lieu/remote]\nDétails : [2–3 lignes max]\n\nMerci,\n[Nom]",
    simple:
      "Hello Aurélie,\n\nJ’ai une proposition et je pense que ça peut matcher. Tu as 10 min cette semaine ?\n\nContexte : [poste/projet] · [durée] · [remote/lieu]\n\n[Nom]",
    direct:
      "Salut Aurélie,\n\nProposition rapide : [poste/projet] · [durée] · [remote/lieu].\nSi ok, on cale un call.\n\n[Nom]",
  };

  let msg = base[tone] ?? base.pro;

  if (purpose === "freelance") {
    msg = msg.replace("opportunité", "projet / mission");
  }
  if (purpose === "collab") {
    msg = msg.replace("opportunité", "collaboration");
  }

  return msg;
}

export default function ContactBriefV2() {
  const [purpose, setPurpose] = useState("job");
  const [tone, setTone] = useState("pro");
  const [copied, setCopied] = useState(false);

  const message = useMemo(
    () => buildMessage({ purpose, tone }),
    [purpose, tone],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // si clipboard bloqué, l’utilisateur peut sélectionner/coller manuellement
    }
  };

  return (
    <div className="h-full w-full px-12 flex items-center">
      <motion.div className="w-full" layout>
        <div className="grid grid-cols-12 gap-12 items-start">
          {/* GAUCHE : plus étroit */}
          <div className="col-span-12 lg:col-span-4">
            <motion.h2
              className="text-[64px] leading-none font-semibold text-white"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
            >
              Contact
            </motion.h2>

            <div className="mt-6 text-white/65 text-[18px] max-w-[38ch]">
              Choisis un canal. Si tu veux, je te prépare un message prêt à
              envoyer.
            </div>

            <div className="mt-14 space-y-10">
              {CHANNELS.map((c, i) => (
                <motion.a
                  key={c.id}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group block"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: 0.06 * i, duration: 0.45 }}
                >
                  <div className="text-[30px] font-semibold text-white/85 group-hover:text-white transition-colors">
                    {c.label}
                  </div>
                  <div className="mt-2 mono text-[12px] tracking-[0.18em] text-white/40">
                    {c.meta}
                  </div>
                  <Underline />
                </motion.a>
              ))}
            </div>

            <div className="mt-16 mono text-[12px] tracking-[0.18em] text-white/40">
              ZONE · VERDUN · METZ · NANCY · REMOTE POSSIBLE
            </div>
          </div>

          {/* DROITE : plus large */}
          <div className="col-span-12 lg:col-span-8">
            <motion.div
              className="border-l border-white/10 pl-10"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5 }}
              layout
            >
              <div className="mono text-[12px] tracking-[0.18em] text-white/45">
                BRIEF RAPIDE
              </div>

              <motion.div className="mt-10" layout>
                <div className="mono text-[12px] tracking-[0.18em] text-white/35">
                  INTENTION
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {PURPOSES.map((p) => (
                    <Chip
                      key={p.id}
                      active={purpose === p.id}
                      onClick={() => setPurpose(p.id)}
                    >
                      {p.label}
                    </Chip>
                  ))}
                </div>
                <div className="mt-3 text-[14px] text-white/55">
                  {PURPOSES.find((p) => p.id === purpose)?.hint}
                </div>
              </motion.div>

              <motion.div className="mt-10" layout>
                <div className="mono text-[12px] tracking-[0.18em] text-white/35">
                  TON
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {TONES.map((t) => (
                    <Chip
                      key={t.id}
                      active={tone === t.id}
                      onClick={() => setTone(t.id)}
                    >
                      {t.label}
                    </Chip>
                  ))}
                </div>
              </motion.div>

              {/* MESSAGE : hauteur stable -> plus aucun saut */}
              <motion.div
                className="mt-12 border border-white/10 bg-black/10"
                layout
              >
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div className="mono text-[12px] tracking-[0.18em] text-white/45">
                    MESSAGE PRÊT
                  </div>
                  <button
                    type="button"
                    onClick={copy}
                    className="mono text-[12px] tracking-[0.18em] text-white/65 hover:text-white"
                  >
                    {copied ? "COPIÉ ✓" : "COPIER →"}
                  </button>
                </div>

                <div className="px-5 py-5">
                  {/* zone stable */}
                  <div className="h-[240px] overflow-auto pr-2">
                    <pre className="whitespace-pre-wrap text-[14px] leading-relaxed text-white/75">
                      {message}
                    </pre>
                  </div>

                  <div className="mt-6 h-px bg-white/10" />

                  <div className="mt-4 grid grid-cols-2 gap-8">
                    <div>
                      <div className="mono text-[12px] tracking-[0.18em] text-white/35">
                        DISPONIBILITÉ
                      </div>
                      <div className="mt-2 text-[14px] text-white/70">
                        Opportunités · Projets
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="mono text-[12px] tracking-[0.18em] text-white/35">
                        RÉPONSE
                      </div>
                      <div className="mt-2 text-[14px] text-white/70">
                        24–48h (en général)
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="mt-10 flex items-center justify-between">
                <div className="mono text-[12px] tracking-[0.18em] text-white/35">
                  CANAL OUVERT
                </div>
                <div className="h-2 w-2 border border-white/25">
                  <div className="h-full w-full bg-teal-400/70" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
