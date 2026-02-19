import { motion } from "framer-motion";

/*
  Reveal universel :

  ✔ Scroll → animation
  ✔ Clic nav → animation rejoue (via activeKey)
  ✔ Delay pour stagger
  ✔ Presets simples
  ✔ Pas de hacks viewport partout
*/

const variants = {
  up: {
    hidden: { opacity: 0, y: 22 },
    show: (c) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: c?.delay ?? 0,
      },
    }),
  },

  left: {
    hidden: { opacity: 0, x: -42 },
    show: (c) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.55,
        ease: "easeOut",
        delay: c?.delay ?? 0,
      },
    }),
  },

  right: {
    hidden: { opacity: 0, x: 42 },
    show: (c) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.55,
        ease: "easeOut",
        delay: c?.delay ?? 0,
      },
    }),
  },

  scale: {
    hidden: { opacity: 0, scale: 0.96, y: 12 },
    show: (c) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: "easeOut",
        delay: c?.delay ?? 0,
      },
    }),
  },
};

export default function Reveal({
  children,

  // Animation
  preset = "up",
  delay = 0,

  // Scroll behavior
  once = false,
  amount = 0.25,
  margin = "0px 0px -12% 0px",

  // 🔥 IMPORTANT :
  // change cette valeur quand la section devient active
  // → force le replay même si déjà visible
  activeKey,

  className = "",
}) {
  const selected = variants[preset] || variants.up;

  return (
    <motion.div
      key={activeKey} // 🔥 le secret du replay propre
      className={className}
      variants={selected}
      custom={{ delay }}
      initial="hidden"
      whileInView="show"
      viewport={{
        once,
        amount,
        margin,
      }}
    >
      {children}
    </motion.div>
  );
}
