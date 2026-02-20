import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import Reveal from "./Reveal";

const W3FORMS_ACCESS_KEY = "56a673df-e193-42c2-a070-2b3161195303";

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
    href: "https://www.linkedin.com/in/aur%C3%A9lie-weber-a354b1340/",
    id: "linkedin",
  },
  {
    label: "GitHub",
    meta: "Code & projets",
    href: "https://github.com/A-WEBerBeta",
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
    <div className="mt-5 sm:mt-6 h-px bg-white/10 overflow-hidden">
      <motion.div
        className="h-full bg-teal-400/55"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </div>
  );
}

function replacePurposeWording(text, purpose) {
  if (purpose === "freelance") {
    return text
      .replaceAll("d’une opportunité", "d’un projet")
      .replaceAll("d'une opportunité", "d'un projet")
      .replaceAll("une opportunité", "un projet")
      .replaceAll("opportunité", "projet");
  }

  if (purpose === "collab") {
    return text
      .replaceAll("d’une opportunité", "d’une collaboration")
      .replaceAll("d'une opportunité", "d'une collaboration")
      .replaceAll("une opportunité", "une collaboration")
      .replaceAll("opportunité", "collaboration");
  }

  return text;
}

function buildMessage({ purpose, tone }) {
  const base = {
    pro: `Bonjour Aurélie,

Je vous contacte au sujet d’une opportunité. Seriez-vous disponible pour en discuter ?

Contexte : [poste/projet] · [durée] · [lieu/remote]

Cordialement,
[Nom]`,

    simple: `Bonjour Aurélie,

J’ai une proposition qui pourrait vous intéresser. Seriez-vous disponible pour en parler ?

Contexte : [poste/projet] · [durée]

Merci,
[Nom]`,

    direct: `Bonjour,

Proposition rapide : [poste/projet] · [durée] · [remote/lieu].
Seriez-vous disponible pour un échange ?

[Nom]`,
  };

  const msg = base[tone] ?? base.pro;
  return replacePurposeWording(msg, purpose);
}

export default function ContactBriefV3() {
  const [purpose, setPurpose] = useState("job");
  const [tone, setTone] = useState("pro");

  const [copied, setCopied] = useState(false);

  // édition
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState("");

  // infos expéditeur (optionnel)
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");

  // envoi
  const [sending, setSending] = useState(false);
  const [sendState, setSendState] = useState("idle"); // idle | ok | err
  const [sendNote, setSendNote] = useState("");

  // scan OK (2s)
  const [okPulse, setOkPulse] = useState(false);
  const [okScanKey, setOkScanKey] = useState(0);
  const okPulseTimer = useRef(null);

  const generated = useMemo(
    () => buildMessage({ purpose, tone }),
    [purpose, tone],
  );
  const displayedMessage = dirty ? message : generated;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(displayedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      //
    }
  };

  const reset = () => {
    setDirty(false);
    setMessage("");
    setSendState("idle");
    setSendNote("");
  };

  const triggerOkScan = () => {
    if (okPulseTimer.current) window.clearTimeout(okPulseTimer.current);
    setOkScanKey((k) => k + 1);
    setOkPulse(true);
    okPulseTimer.current = window.setTimeout(() => setOkPulse(false), 2000);
  };

  const submit = async () => {
    if (sending) return;

    if (!displayedMessage.trim()) {
      setSendState("err");
      setSendNote("Message vide.");
      return;
    }

    setSending(true);
    setSendState("idle");
    setSendNote("");

    try {
      const payload = {
        access_key: W3FORMS_ACCESS_KEY,
        subject: `Nouveau message portfolio — ${
          PURPOSES.find((p) => p.id === purpose)?.label ?? "Contact"
        }`,
        from_name: senderName || "Visiteur portfolio",
        email: senderEmail || undefined,
        message: displayedMessage,
        purpose,
        tone,
        source: "portfolio",
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data?.success) {
        setSendState("ok");
        setSendNote("Message envoyé. Merci !");
        triggerOkScan();

        window.setTimeout(() => {
          reset();
        }, 1600);
      } else {
        setSendState("err");
        setSendNote(data?.message || "Échec de l’envoi.");
      }
    } catch {
      setSendState("err");
      setSendNote("Erreur réseau. Veuillez réessayer.");
    } finally {
      setSending(false);
    }
  };

  return (
    <Reveal preset="scale" once={false} amount={0.18} className="h-full w-full">
      <div className="h-full w-full px-5 sm:px-8 lg:px-12 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* ===== GAUCHE ===== */}
          <Reveal
            preset="left"
            once={false}
            amount={0.22}
            className="lg:col-span-4"
          >
            <div className="text-white/65 text-[16px] sm:text-[18px] max-w-[50ch]">
              Une question, un projet ou une opportunité ? Choisissez le canal
              que vous préférez — ou envoyez un message directement ici.
            </div>

            <div className="mt-10 sm:mt-14 space-y-8 sm:space-y-10">
              {CHANNELS.map((c) => (
                <Reveal
                  key={c.id}
                  preset="up"
                  once={false}
                  amount={0.2}
                  className="block"
                >
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group block"
                  >
                    <div className="text-[24px] sm:text-[28px] lg:text-[30px] font-semibold text-white/85 group-hover:text-white transition-colors">
                      {c.label}
                    </div>
                    <div className="mt-2 mono text-[12px] tracking-[0.18em] text-white/40">
                      {c.meta}
                    </div>
                    <Underline />
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal
              preset="up"
              once={false}
              amount={0.2}
              className="mt-12 sm:mt-16"
            >
              <div className="mono text-[12px] tracking-[0.18em] text-white/40">
                VERDUN · METZ · NANCY · REMOTE POSSIBLE
              </div>
            </Reveal>
          </Reveal>

          {/* ===== DROITE ===== */}
          <Reveal
            preset="right"
            once={false}
            amount={0.22}
            className="lg:col-span-8 lg:border-l border-white/10 lg:pl-10"
          >
            <Reveal preset="up" once={false} amount={0.3}>
              <div className="mono text-[12px] tracking-[0.18em] text-white/45">
                INITIER UN ÉCHANGE
              </div>
            </Reveal>

            {/* INTENTION */}
            <Reveal
              preset="up"
              once={false}
              amount={0.25}
              className="mt-8 sm:mt-10"
            >
              <div className="mono text-[12px] tracking-[0.18em] text-white/35">
                INTENTION
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {PURPOSES.map((p) => (
                  <Chip
                    key={p.id}
                    active={purpose === p.id}
                    onClick={() => {
                      setPurpose(p.id);
                      reset();
                    }}
                  >
                    {p.label}
                  </Chip>
                ))}
              </div>

              <div className="mt-3 text-[14px] text-white/55">
                {PURPOSES.find((p) => p.id === purpose)?.hint}
              </div>
            </Reveal>

            {/* TON */}
            <Reveal
              preset="up"
              once={false}
              amount={0.25}
              className="mt-8 sm:mt-10"
            >
              <div className="mono text-[12px] tracking-[0.18em] text-white/35">
                TON
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {TONES.map((t) => (
                  <Chip
                    key={t.id}
                    active={tone === t.id}
                    onClick={() => {
                      setTone(t.id);
                      reset();
                    }}
                  >
                    {t.label}
                  </Chip>
                ))}
              </div>
            </Reveal>

            {/* IDENTITÉ */}
            <Reveal
              preset="up"
              once={false}
              amount={0.25}
              className="mt-8 sm:mt-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-6">
                  <div className="mono text-[12px] tracking-[0.18em] text-white/35">
                    VOTRE NOM
                  </div>
                  <input
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="mt-3 w-full border border-white/10 bg-black/10 px-4 py-3 text-[14px] text-white/80 outline-none"
                    placeholder="(optionnel)"
                  />
                </div>

                <div className="md:col-span-6">
                  <div className="mono text-[12px] tracking-[0.18em] text-white/35">
                    VOTRE EMAIL
                  </div>
                  <input
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="mt-3 w-full border border-white/10 bg-black/10 px-4 py-3 text-[14px] text-white/80 outline-none"
                    placeholder="(optionnel, mais pratique pour répondre)"
                  />
                </div>
              </div>
            </Reveal>

            {/* MESSAGE */}
            <Reveal
              preset="up"
              once={false}
              amount={0.22}
              className="mt-10 sm:mt-12"
            >
              <div className="border border-white/10 bg-black/10">
                <div className="flex items-center justify-between border-b border-white/10 px-4 sm:px-5 py-4">
                  <div className="mono text-[12px] tracking-[0.18em] text-white/45">
                    MESSAGE
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6">
                    <button
                      type="button"
                      onClick={reset}
                      className="mono text-[12px] tracking-[0.18em] text-white/45 hover:text-white"
                    >
                      RÉINITIALISER
                    </button>

                    <button
                      type="button"
                      onClick={copy}
                      className="mono text-[12px] tracking-[0.18em] text-white/65 hover:text-white"
                    >
                      {copied ? "COPIÉ ✓" : "COPIER"}
                    </button>
                  </div>
                </div>

                <textarea
                  value={displayedMessage}
                  onChange={(e) => {
                    if (!dirty) setDirty(true);
                    setMessage(e.target.value);
                  }}
                  className="w-full h-44 sm:h-56 lg:h-60 bg-transparent text-[14px] leading-relaxed text-white/80 p-4 sm:p-5 resize-none outline-none"
                />

                <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-white/10 px-4 sm:px-5 py-4 overflow-hidden">
                  {okPulse ? (
                    <motion.div
                      key={okScanKey}
                      className="pointer-events-none absolute left-0 top-0 h-px w-35"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(20,184,166,0.75), transparent)",
                      }}
                      initial={{ x: "-25%", opacity: 0 }}
                      animate={{ x: "120%", opacity: [0, 1, 0] }}
                      transition={{ duration: 0.9, ease: "easeInOut" }}
                    />
                  ) : null}

                  <div className="mono text-[12px] tracking-[0.18em] text-white/35">
                    {sendState === "ok"
                      ? "ENVOI OK"
                      : sendState === "err"
                        ? "ENVOI IMPOSSIBLE"
                        : "RÉPONSE SOUS 24–48H"}
                    {sendNote ? (
                      <span className="ml-3 text-white/55 tracking-normal normal-case">
                        · {sendNote}
                      </span>
                    ) : null}
                  </div>

                  <button
                    type="button"
                    onClick={submit}
                    disabled={sending}
                    className={[
                      "mono text-[12px] tracking-[0.18em] border border-white/15 px-5 py-3 text-white/80 hover:text-white",
                      "w-full sm:w-auto",
                      sending ? "opacity-60 cursor-not-allowed" : "",
                    ].join(" ")}
                  >
                    {sending ? "ENVOI..." : "ENVOYER →"}
                  </button>
                </div>
              </div>
            </Reveal>
          </Reveal>
        </div>
      </div>
    </Reveal>
  );
}
