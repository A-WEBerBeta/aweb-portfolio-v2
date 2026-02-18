import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const CHANNELS = [
  {
    label: "Email",
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
  { id: "job", label: "Opportunité", hint: "CDD / CDI" },
  { id: "freelance", label: "Projet", hint: "Mission / site / app" },
  { id: "collab", label: "Collaboration", hint: "Side / pair / idée" },
];

const TONES = [
  { id: "simple", label: "Simple" },
  { id: "pro", label: "Professionnel" },
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
    pro: `Bonjour Aurélie,

Je vous contacte au sujet d’une opportunité. Seriez-vous disponible pour en discuter ?

Contexte : [poste/projet] · [durée] · [lieu/remote]

Cordialement,
[Nom]`,

    simple: `Hello Aurélie,

J’ai une proposition qui pourrait t’intéresser. Tu serais dispo pour en parler ?

Contexte : [poste/projet] · [durée]

Merci,
[Nom]`,

    direct: `Bonjour,

Proposition rapide : [poste/projet] · [durée] · [remote/lieu].
Disponible pour un échange ?

[Nom]`,
  };

  let msg = base[tone] ?? base.pro;

  if (purpose === "freelance") msg = msg.replace("opportunité", "projet");
  if (purpose === "collab") msg = msg.replace("opportunité", "collaboration");

  return msg;
}

export default function ContactBriefV3() {
  const [purpose, setPurpose] = useState("job");
  const [tone, setTone] = useState("pro");
  const [copied, setCopied] = useState(false);

  const generated = useMemo(
    () => buildMessage({ purpose, tone }),
    [purpose, tone],
  );

  const [message, setMessage] = useState(generated);

  // Met à jour si template change
  useMemo(() => setMessage(generated), [generated]);

  const copy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const mailHref = `mailto:aurelie.weber@email.com?subject=Contact&body=${encodeURIComponent(
    message,
  )}`;

  return (
    <div className="h-full w-full px-12 flex items-center">
      <div className="w-full grid grid-cols-12 gap-12 items-start">
        {/* ===== GAUCHE ===== */}
        <div className="col-span-12 lg:col-span-4">
          {/* <h2 className="text-[64px] leading-none font-semibold text-white">
            Prendre contact
          </h2> */}

          <div className="mt-6 text-white/65 text-[18px] max-w-[38ch]">
            Une question, un projet ou une opportunité ? Choisissez le canal qui
            vous convient. Le message peut être adapté avant envoi.
          </div>

          <div className="mt-14 space-y-10">
            {CHANNELS.map((c) => (
              <a
                key={c.id}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="group block"
              >
                <div className="text-[30px] font-semibold text-white/85 group-hover:text-white transition-colors">
                  {c.label}
                </div>
                <div className="mt-2 mono text-[12px] tracking-[0.18em] text-white/40">
                  {c.meta}
                </div>
                <Underline />
              </a>
            ))}
          </div>

          <div className="mt-16 mono text-[12px] tracking-[0.18em] text-white/40">
            VERDUN · METZ · NANCY · REMOTE POSSIBLE
          </div>
        </div>

        {/* ===== DROITE ===== */}
        <div className="col-span-12 lg:col-span-8 border-l border-white/10 pl-10">
          <div className="mono text-[12px] tracking-[0.18em] text-white/45">
            INITIER UN ÉCHANGE
          </div>

          {/* INTENTION */}
          <div className="mt-10">
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
          </div>

          {/* TON */}
          <div className="mt-10">
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
          </div>

          {/* MESSAGE EDITABLE */}
          <div className="mt-12 border border-white/10 bg-black/10">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="mono text-[12px] tracking-[0.18em] text-white/45">
                MESSAGE
              </div>

              <button
                onClick={copy}
                className="mono text-[12px] tracking-[0.18em] text-white/65 hover:text-white"
              >
                {copied ? "COPIÉ ✓" : "COPIER"}
              </button>
            </div>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-[240px] bg-transparent text-[14px] leading-relaxed text-white/80 p-5 resize-none outline-none"
            />

            <div className="flex items-center justify-between border-t border-white/10 px-5 py-4">
              <div className="mono text-[12px] tracking-[0.18em] text-white/35">
                RÉPONSE SOUS 24–48H
              </div>

              <a
                href={mailHref}
                className="mono text-[12px] tracking-[0.18em] border border-white/15 px-5 py-3 text-white/80 hover:text-white"
              >
                ENVOYER →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
