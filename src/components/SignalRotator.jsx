import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Rotation de slogans côté droit du hero
 * - Crossfade + léger slide vertical
 * - Boucle infinie
 * - Animation fluide et non intrusive
 */
export default function SignalRotator() {
  const groups = [
    ["UI clean.", "Motion utile.", "Détails maîtrisés."],
    ["Navigation fluide.", "Structure claire.", "Code solide."],
    ["Interfaces sobres.", "Performance réelle.", "UX lisible."],
  ];

  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setI((v) => (v + 1) % groups.length);
    }, 3200);

    return () => clearInterval(id);
  }, [groups.length]);

  const current = groups[i];

  return (
    <div className="mt-10 space-y-7">
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="space-y-7"
        >
          {current.map((text) => (
            <div
              key={text}
              className="text-[44px] leading-[0.98] font-semibold text-white/90"
            >
              {text}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
