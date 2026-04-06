"use client";

import { useCallback, useState } from "react";
import { useReducedMotion } from "motion/react";

import ScrollReader from "./ScrollReader";
import ScrollCollage, { type CollageCard } from "./ScrollCollage";

const PARAGRAPHS = [
  `Founded in {2015,:2015,} we are {waterloo:Waterloo's} longest-standing {collective:collective} of student {developers,:developers,} {designers,:designers,} and {product:product} managers dedicated to {social:social} good.`,
  `We believe that great {technology:technology} should serve {everyone;:everyone;} not just those who can {afford:afford} it.`,
  `We strive to {deliver:deliver} meaningful {tools:tools} for high-impact NPOs while fostering a community rooted in mentorship, {growth,:growth,} and the genuine enjoyment of building things {together.:together.}`,
  `By working closely with partner {organizations,:organizations,} our teams contribute far more than code, bringing projects to {life:life} through ideation, design, and development.`,
  `If you're a nonprofit, we'd love to chat :)`,
  `If you're a student, you're in the right place and we're glad you found us.`,
  `Take a poke around to learn more about our mission and the people behind the team.`,
  `- UW Blueprint`,
];

const CARDS: CollageCard[] = [
  {
    key: "c-2015",
    triggerKey: "2015,",
    src: "/img/collage/team.svg",
    top: "70.79%",
    left: "17.50%",
    width: "69.08%",
    zIndex: 10,
  },
  {
    key: "c-waterloo",
    triggerKey: "waterloo",
    src: "/img/collage/waterloo.svg",
    top: "46.71%",
    left: "9.08%",
    width: "28.68%",
    zIndex: 2,
  },
  {
    key: "c-developers",
    triggerKey: "developers,",
    src: "/img/collage/dev.svg",
    top: "59.21%",
    left: "21.05%",
    width: "43.95%",
    zIndex: 7,
  },
  {
    key: "c-designers",
    triggerKey: "designers,",
    src: "/img/collage/design.svg",
    top: "0%",
    left: "43.03%",
    width: "41.71%",
    zIndex: 1,
  },
  {
    key: "c-product",
    triggerKey: "product",
    src: "/img/collage/product.svg",
    top: "62.24%",
    left: "11.97%",
    width: "16.18%",
    zIndex: 6,
  },
  {
    key: "c-social",
    triggerKey: "social",
    src: "/img/collage/marillac.svg",
    top: "34.21%",
    left: "54.08%",
    width: "39.61%",
    zIndex: 3,
  },
  {
    key: "c-everyone",
    triggerKey: "everyone;",
    src: "/img/collage/sistema.svg",
    top: "29.08%",
    left: "34.74%",
    width: "33.95%",
    zIndex: 4,
  },
  {
    key: "c-afford",
    triggerKey: "afford",
    src: "/img/collage/fck.svg",
    top: "37.89%",
    left: "24.61%",
    width: "42.11%",
    zIndex: 5,
  },
  {
    key: "c-deliver",
    triggerKey: "deliver",
    src: "/img/collage/plane.svg",
    top: "84.21%",
    left: "11.84%",
    width: "22.89%",
    zIndex: 11,
  },
  {
    key: "c-growth",
    triggerKey: "growth,",
    src: "/img/collage/growth.svg",
    top: "53.42%",
    left: "51.97%",
    width: "29.21%",
    zIndex: 8,
  },
  {
    key: "c-together",
    triggerKey: "together.",
    src: "/img/collage/hands.svg",
    top: "58.03%",
    left: "72.11%",
    width: "26.97%",
    zIndex: 9,
  },
  {
    key: "c-life",
    triggerKey: "life",
    src: "/img/collage/bp.svg",
    top: "0%",
    left: "0.92%",
    width: "67.24%",
    zIndex: 0,
  },
];

export default function ScrollExperience() {
  const reduceMotion = useReducedMotion();
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());

  const handleTrigger = useCallback((key: string, dir: "on" | "off") => {
    setActiveKeys((prev) => {
      const next = new Set(prev);
      if (dir === "on") next.add(key);
      else next.delete(key);
      return next;
    });
  }, []);

  return (
    <div className="grid w-full grid-cols-12 items-stretch gap-0">
      {/* Columns 1–4: story paragraphs (full width on small screens). */}
      <div className="col-span-12 md:pb-48 lg:col-span-4">
        <ScrollReader
          paragraphs={PARAGRAPHS}
          onTrigger={handleTrigger}
          reduceMotion={reduceMotion}
        />
      </div>

      {/* Columns 5–12: sticky collage */}
      <div className="relative col-span-12 min-h-0 lg:col-span-8">
        <div className="sticky top-[5dvh]">
          <ScrollCollage cards={CARDS} activeKeys={activeKeys} />
        </div>
      </div>
    </div>
  );
}
