"use client";

import { motion, type Variants } from "motion/react";

// Satu pola masuk untuk seluruh situs: fade + naik 12px, sekali saat terlihat.
const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const viewport = { once: true, margin: "0px 0px -80px 0px" } as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
};

export function Reveal({ children, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={item}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {children}
    </motion.div>
  );
}

// Daftar dengan stagger: hanya dipakai untuk kartu proyek dan skill.
export function RevealGroup({ children, className }: RevealProps) {
  return (
    <motion.ul
      className={className}
      variants={group}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {children}
    </motion.ul>
  );
}

export function RevealItem({ children, className }: RevealProps) {
  return (
    <motion.li className={className} variants={item}>
      {children}
    </motion.li>
  );
}
