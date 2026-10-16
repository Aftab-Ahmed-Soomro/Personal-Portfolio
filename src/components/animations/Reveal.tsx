"use client";

import React from "react";
import { motion, type Variants } from "motion/react";

/** Shared easing – a smooth "expo out" curve used across the whole site. */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Direction = "up" | "down" | "left" | "right" | "none";

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 48 },
  down: { x: 0, y: -48 },
  left: { x: 64, y: 0 },
  right: { x: -64, y: 0 },
  none: { x: 0, y: 0 },
};

interface RevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  /** Re-animate every time it enters the viewport. */
  repeat?: boolean;
}

/** Fade + slide (+ de-blur) element into view when scrolled to. */
export const Reveal: React.FC<RevealProps> = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.9,
  className,
  repeat = false,
}) => {
  const { x, y } = offsets[direction];
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: !repeat, amount: 0.25 }}
      transition={{ duration, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
};

const containerVariants = (stagger: number, delayChildren: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

const itemVariants = (direction: Direction, duration: number): Variants => {
  const { x, y } = offsets[direction];
  return {
    hidden: { opacity: 0, x, y, scale: 0.96 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration, ease: EASE_OUT_EXPO },
    },
  };
};

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

/** Wrap a group of <StaggerItem/> – children animate one after another. */
export const Stagger: React.FC<StaggerProps> = ({
  children,
  className,
  stagger = 0.12,
  delay = 0,
}) => (
  <motion.div
    className={className}
    variants={containerVariants(stagger, delay)}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    {children}
  </motion.div>
);

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  duration?: number;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className,
  direction = "up",
  duration = 0.85,
}) => (
  <motion.div className={className} variants={itemVariants(direction, duration)}>
    {children}
  </motion.div>
);

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  /** Trigger on mount (hero) instead of on scroll. */
  immediate?: boolean;
}

/** Headline reveal – each word rises out of a mask, one after another. */
export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  className,
  delay = 0,
  immediate = false,
}) => {
  const words = text.split(" ");
  const trigger = immediate
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: { once: true, amount: 0.6 } };

  return (
    <motion.span
      className={className}
      style={{ display: "inline-block" }}
      variants={containerVariants(0.08, delay)}
      initial="hidden"
      {...trigger}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            variants={{
              hidden: { y: "110%", rotate: 4 },
              visible: {
                y: "0%",
                rotate: 0,
                transition: { duration: 0.9, ease: EASE_OUT_EXPO },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};
