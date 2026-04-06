"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";

/**
 * xxl header line: primary megaphone on “much”, corner megaphone bottom-right;
 * each runs idle → over → big with the same delays, different scroll triggers.
 */
export default function IntroMuchHeading() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const muchRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // No-op placeholder: keep `wrapRef` mounted for future layout needs.
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <motion.p
        className="ml-[-4px] max-w-full text-balance text-xxl text-[color:var(--bp-blue)] [overflow-wrap:anywhere]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.07 } },
        }}
      >
        {["but,", "we’re"].map((word, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
              visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {word}&nbsp;
          </motion.span>
        ))}
        <span ref={muchRef} className="inline">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
              visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            much
          </motion.span>
        </span>
        {" "}
        {["more", "than", "a", "design", "team."].map((word, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
              visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {word}{i < 4 ? " " : ""}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
}
