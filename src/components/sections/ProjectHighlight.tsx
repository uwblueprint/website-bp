import React from "react";
import Image from "next/image";

import { FadeUp } from "@/components/ui/FadeUp";
import TextLinkButton from "@/components/ui/TextLinkButton";
import { TestimonialQuoteBody } from "@/lib/testimonial-quote";
interface ProjectHighlightProps {
  id: string;
  highlightImage: string;
  projectName: string;
  timeline: string;
  location?: string;
  website?: string;
  repoUrl?: string;
  caseStudyUrl?: string;
  aboutNpo: React.ReactNode;
  ourSolution: React.ReactNode;
  testimonial?: React.ReactNode;
  /** When provided, this ref is attached to the FadeUp wrapper so an external observer can watch the same element FadeUp uses to fire its animation. */
  fadeUpRef?: React.Ref<HTMLDivElement>;
}

export function ProjectHighlight({
  id,
  highlightImage,
  projectName,
  timeline,
  location,
  website,
  repoUrl,
  caseStudyUrl,
  aboutNpo,
  ourSolution,
  testimonial,
  fadeUpRef,
}: ProjectHighlightProps) {
  const imageUnoptimized = highlightImage.endsWith(".svg");

  return (
    <section id={id} aria-label={`${projectName} project`}>
      <FadeUp inView ref={fadeUpRef}>
        <div className="flex flex-col gap-8 pt-8 md:pt-32 pb-8">
          <h2
            className="text-xl lowercase text-[var(--bp-blue)]"
            style={{ lineHeight: 0.8 }}
          >
            {projectName}
          </h2>

          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={highlightImage}
              alt={`${projectName} highlight`}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover"
              unoptimized={imageUnoptimized}
            />
          </div>

          {/* Metadata row: timeline (3) | spacer (1) | location (2) | links (2) */}
          {/* Mobile: single column stack. md: 8-column row. */}
          <div className="grid grid-cols-1 gap-y-2 md:grid-cols-8 md:gap-x-0 md:gap-y-0">
            {/* timeline — 3 cols */}
            <p className="text-sm text-[var(--secondary-dark)] md:col-span-3">
              {timeline}
            </p>

            {/* spacer — 1 col (desktop only) */}
            <div className="hidden md:col-span-1 md:block" aria-hidden />

            {/* location — 2 cols */}
            <div className="md:col-span-2">
              {location ? (
                <p className="text-sm text-[var(--secondary-dark)]">
                  {location}
                </p>
              ) : null}
            </div>

            {/* links — 2 cols, right-aligned on desktop */}
            <div className="flex flex-col items-start gap-1 md:col-span-2 md:items-end md:gap-[4px]">
              {website && (
                <TextLinkButton
                  href={website.startsWith("http") ? website : `https://${website}`}
                  variant="dark"
                  size="sm"
                >
                  Visit Website
                </TextLinkButton>
              )}
              {repoUrl && (
                <TextLinkButton href={repoUrl} variant="dark" size="sm">
                  Project Repo
                </TextLinkButton>
              )}
              {caseStudyUrl && (
                <TextLinkButton href={caseStudyUrl} variant="dark" size="sm">
                  Read Case Study
                </TextLinkButton>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-8 md:gap-16">
            <div className="grid w-full grid-cols-8 gap-0">
              <div className="col-span-12 md:col-span-3 flex flex-col gap-6 pb-8 md:pb-0">
                <p className="text-md text-[var(--primary-dark)]">
                  About the nonprofit
                </p>
                <div className="text-sm text-[var(--primary-dark)]">
                  {aboutNpo}
                </div>
              </div>

              <div className="hidden md:block md:col-span-1" aria-hidden />

              <div className="col-span-12 md:col-span-4 flex flex-col gap-6">
                <p className="text-md text-[var(--primary-dark)]">
                  Our solution
                </p>
                <div className="text-sm text-[var(--primary-dark)]">
                  {ourSolution}
                </div>
              </div>
            </div>

            {testimonial && (
              <div className="flex flex-col gap-6">
                <p className="text-md text-[var(--primary-dark)]">
                  Testimonial
                </p>
                <blockquote className="text-sm text-[var(--primary-dark)]">
                  <TestimonialQuoteBody>{testimonial}</TestimonialQuoteBody>
                </blockquote>
              </div>
            )}

          </div>
        </div>
      </FadeUp>
    </section>
  );
}
