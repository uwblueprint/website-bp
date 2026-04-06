"use client";

import { useEffect, useRef, useState } from "react";

import SimpleMarquee from "@/components/fancy/blocks/simple-marquee";
import { CursorTrail, CursorTrailProvider } from "@/components/ui/CursorTrail";

type Photo = { src: string; label: string };

// ─── Image data ──────────────────────────────────────────────────────────────
// Ordered most-recent → oldest across 4 rows (10 / 9 / 9 / 9 = 37 total).
// f19-celebratory-burrito is last.

const ROW_1: Photo[] = [
  { src: "/img/socials/w26-mfsn-pottery.webp",             label: "W26 MFSN tries their hands at pottery" },
  { src: "/img/socials/f25-design-star.webp",             label: "F25 Design team really coming together" },
  { src: "/img/socials/f25-internal-murder-mystery.webp", label: "F25's murder mystery night (best internal ever?)" },
  { src: "/img/socials/f25-pumpkin-1.webp",               label: "F25 [unknown pumpkin design]" },
  { src: "/img/socials/f25-pumpkin-2.webp",               label: "F25 pumpkin carving social" },
  { src: "/img/socials/f25-pumpkin-3.webp",               label: "F25 David judges the best batch" },
  { src: "/img/socials/s24-eaf-toronto.webp",             label: "S24 EAF team escapes Toronto" },
  { src: "/img/socials/w24-design-team.webp",              label: "W24 Design team takes on kbbq" },
  { src: "/img/socials/w24-eaf-escape-room.webp",         label: "W24 EAF team escapes KW" },
  { src: "/img/socials/w24-eaf-mario.webp",                label: "W24 EAF team takes on Mario Kart" },
];

const ROW_2: Photo[] = [
  { src: "/img/socials/w24-de-design.webp",         label: "W24 DE design team at EOT (end of term)" },
  { src: "/img/socials/w24-de-zoom.webp",           label: "W24 DE team loves zoom" },
  { src: "/img/socials/w24-llsc-codenames.webp",    label: "W24 LLSC plays codenames" },
  { src: "/img/socials/w24-marillac-4-life.webp",   label: "W24 · Marillac · 4 Life" },
  { src: "/img/socials/w24-marillac-bowling.webp",  label: "W24 · Marillac · bowling" },
  { src: "/img/socials/w24-omhs-famoso.webp",       label: "W24 · OMHS · Famoso" },
  { src: "/img/socials/w24-pm-axe.webp",            label: "W24 · PM · axe throwing" },
  { src: "/img/socials/w24-sistema-kbbq.webp",      label: "W24 · Sistema · KBBQ" },
  { src: "/img/socials/s23-cas-seaside.webp",      label: "S23 · CAS · seaside" },
];

const ROW_3: Photo[] = [
  { src: "/img/socials/w23-eteam-climb.webp",     label: "W23 · E-Team · climbing" },
  { src: "/img/socials/w23-general-social.webp",  label: "W23 · Internal · general social" },
  { src: "/img/socials/w23-jumpmath-toronto.webp", label: "W23 · JumpMath · Toronto trip" },
  { src: "/img/socials/f23-cas-bike.webp",        label: "F23 · CAS · biking" },
  { src: "/img/socials/f23-cas-raft.webp",        label: "F23 · CAS · rafting" },
  { src: "/img/socials/f23-cas-spikeball.webp",   label: "F23 · CAS · spikeball" },
  { src: "/img/socials/f23-show.webp",            label: "F23 · Internal · show night" },
  { src: "/img/socials/s22-bot.webp",             label: "S22 · Internal · bot competition" },
  { src: "/img/socials/w22-gm.webp",              label: "W22 · Internal · general meeting" },
];

const ROW_4: Photo[] = [
  { src: "/img/socials/w22-gm-1.webp",                   label: "W22 · Internal · general meeting" },
  { src: "/img/socials/w22-rhs-burgers.webp",             label: "W22 · RHS · burgers" },
  { src: "/img/socials/f21-community-fridge.webp",        label: "F21 · Community Fridge · volunteer" },
  { src: "/img/socials/w20-reunion.webp",                  label: "W20 · Internal · reunion" },
  { src: "/img/socials/s19-data-assist-spooderman.webp",  label: "S19 · Data Assist · Spiderman" },
  { src: "/img/socials/w19-foodbank.webp",                 label: "W19 · Food Bank · volunteer" },
  { src: "/img/socials/w19-snowday.webp",                  label: "W19 · Internal · snow day" },
  { src: "/img/socials/f19-eteam-pumpkins.webp",           label: "F19 · E-Team · pumpkins" },
  { src: "/img/socials/f19-celebratory-burrito.webp",      label: "F19 · Internal · celebratory burrito" },
];

const ROWS: { photos: Photo[]; direction: "left" | "right" }[] = [
  { photos: ROW_1, direction: "left" },
  { photos: ROW_2, direction: "right" },
  { photos: ROW_3, direction: "left" },
  { photos: ROW_4, direction: "right" },
];

// ─── Photo card ───────────────────────────────────────────────────────────────

function PhotoCard({ src, label }: Photo) {
  return (
    <CursorTrail
      label={
        <span className="whitespace-nowrap bg-[var(--bp-blue)] px-2 py-1 font-roobert text-sm text-[var(--primary-light)] shadow-md">
          {label}
        </span>
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        draggable={false}
        className="h-[200px] w-auto select-none object-cover"
      />
    </CursorTrail>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function SocialsMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionInView, setSectionInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSectionInView(entry.isIntersecting);
      },
      {
        // Any overlap with the viewport counts as “visible”
        threshold: 0,
        rootMargin: "0px",
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <CursorTrailProvider>
      <section
        id="about-socials"
        ref={sectionRef}
        aria-label="Team socials gallery"
        className="flex flex-col gap-4 overflow-x-hidden py-24"
      >
        <h2 className="pl-8 text-xxl text-[var(--bp-blue)]">our socials</h2>
        {ROWS.map(({ photos, direction }, rowIdx) => (
          <SimpleMarquee
            key={rowIdx}
            direction={direction}
            baseVelocity={0}
            useScrollVelocity={sectionInView}
            scrollVelocityScale={10}
            draggable
            grabCursor
            dragSensitivity={0.1}
            dragVelocityDecay={0.95}
            repeat={3}
          >
            {/* pr-4 closes the gap at the seam where the repeat loops */}
            <div className="flex gap-4 pr-4">
              {photos.map((photo) => (
                <PhotoCard key={photo.src} {...photo} />
              ))}
            </div>
          </SimpleMarquee>
        ))}
      </section>
    </CursorTrailProvider>
  );
}
