"use client";

import Image from "next/image";
import { type RefObject, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface ProjectsPreviewProps {
  projects: ReadonlyArray<{
    id: string;
    highlightImage: string;
    projectName: string;
  }>;
  variant?: "image" | "text";
  /** Ref pointing to the FadeUp wrapper of the first ProjectHighlight. When provided, the preview fires its own fade-in at the same scroll position as that element's FadeUp (amount: 0.35), keeping both in sync. */
  triggerRef?: RefObject<HTMLDivElement | null>;
}

export function ProjectsPreview({
  projects,
  variant = "image",
  triggerRef,
}: ProjectsPreviewProps) {
  const [activeId, setActiveId] = useState(projects[0]?.id ?? "");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const containerRef = useRef<HTMLElement>(null);
  const [hasScrolledIn, setHasScrolledIn] = useState(false);

  useEffect(() => {
    const target =
      triggerRef?.current ?? document.getElementById(projects[0]?.id ?? "");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasScrolledIn(true);
          observer.disconnect();
        }
      },
      // Match FadeUp's viewport: { amount: 0.35 }
      { threshold: 0.35 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [projects, triggerRef]);

  useEffect(() => {
    const sections = projects
      .map((p) => document.getElementById(p.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target.id, e.intersectionRatio));
        let best = "";
        let bestRatio = -1;
        ratios.forEach((r, id) => {
          if (r > bestRatio) {
            bestRatio = r;
            best = id;
          }
        });
        if (best) setActiveId(best);
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.75, 1] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [projects]);

  return (
    <nav
      ref={containerRef}
      role="navigation"
      aria-label="Project navigation"
      className={
        variant === "text"
          ? "hidden md:col-span-2 md:block md:pr-6"
          : "hidden md:col-span-1 md:block"
      }
    >
      <motion.div
        className="sticky top-0 pt-32"
        initial={{ opacity: 0, y: 40 }}
        animate={hasScrolledIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {/* 1:1 stack — width drives both dimensions */}
        <div className="flex w-full flex-col">
          {projects.map((project) => {
            const isActive = project.id === activeId;
            const isHovered = project.id === hoveredId;
            const imageUnoptimized = project.highlightImage.endsWith(".svg");

            return (
              <button
                key={project.id}
                type="button"
                aria-label={`Scroll to ${project.projectName}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => {
                  document
                    .getElementById(project.id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={
                  variant === "text"
                    ? "relative w-full cursor-pointer border-0 bg-transparent p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--bp-blue)]"
                    : "relative aspect-square w-full cursor-pointer overflow-hidden border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--bp-blue)]"
                }
              >
                {variant === "text" ? (
                  <>
                    <span
                      className={`block w-full whitespace-normal break-words pb-8 text-sm transition-colors duration-200 ${
                        isActive || isHovered
                          ? "text-[var(--primary-dark)]"
                          : "text-[var(--secondary-dark)]"
                      }`}
                    >
                      {project.projectName}
                    </span>
                  </>
                ) : (
                  <>
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        opacity: isActive ? 1 : isHovered ? 0.7 : 0.4,
                      }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      <Image
                        src={project.highlightImage}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="8vw"
                        unoptimized={imageUnoptimized}
                      />
                    </motion.div>

                    <motion.div
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-[var(--bp-blue)]"
                      initial={false}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      style={{ transformOrigin: "left" }}
                    />

                    <AnimatePresence>
                      {isHovered && !isActive && (
                        <motion.div
                          className="absolute inset-x-0 bottom-0 px-1.5 py-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2, ease: EASE }}
                        >
                          <span className="inline-block bg-[var(--primary-dark)]/70 px-1.5 py-0.5 text-sm text-[var(--primary-light)]">
                            {project.projectName}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </motion.div>
    </nav>
  );
}
