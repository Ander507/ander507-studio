"use client";

import { motion } from "motion/react";

// Letters roll up and are replaced from below on hover.
// Adapted from "Text Roll" by Mazyar kawa on 21st.dev.
// Reduced motion is handled by <MotionConfig reducedMotion="user"> around the page.

const STAGGER = 0.035;

interface TextRollProps {
  children: string;
  className?: string;
  /** Roll from the middle outwards instead of left to right. */
  center?: boolean;
  /** Tight values clip descenders (g, y); keep >= 1.1 for lowercase text. */
  lineHeight?: number;
}

export default function TextRoll({ children, className, center = false, lineHeight = 1.15 }: TextRollProps) {
  // Inline-block spans collapse plain spaces, so swap them for non-breaking ones.
  const letters = children.split("").map((letter) => (letter === " " ? " " : letter));
  const delayFor = (i: number) =>
    center ? STAGGER * Math.abs(i - (letters.length - 1) / 2) : STAGGER * i;

  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={`text-roll ${className ?? ""}`}
      style={{ lineHeight }}
    >
      <span className="sr-only">{children}</span>
      <span aria-hidden>
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="text-roll-letter"
            variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
            transition={{ ease: "easeInOut", delay: delayFor(i) }}
          >
            {letter}
          </motion.span>
        ))}
      </span>
      <span className="text-roll-under" aria-hidden>
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="text-roll-letter"
            variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
            transition={{ ease: "easeInOut", delay: delayFor(i) }}
          >
            {letter}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
}
