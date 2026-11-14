import React from "react";
import Image from "next/image";

import { FadeUp } from "@/components/ui/FadeUp";
import { buttonVariants } from "@/components/ui/button-variants";
import { ArrowUpRight } from "@/components/ui/icons";
import { Tag } from "@/components/ui/Tag";
import TextLinkButton from "@/components/ui/TextLinkButton";
import { TestimonialQuoteBody } from "@/lib/testimonial-quote";
import { cn } from "@/lib/utils";
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

          {/* Metadata row: spacer (4) | location (2) | links (2) */}
          {/* Mobile: single column stack. md: 8-column row. */}
          {(location || website) && (
            <div className="grid grid-cols-1 gap-y-2 md:grid-cols-8 md:gap-x-0 md:gap-y-0">
              {/* spacer — 4 cols (desktop only) */}
              <div className="hidden md:col-span-4 md:block" aria-hidden />

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
                    href={
                      website.startsWith("http")
                        ? website
                        : `https://${website}`
                    }
                    variant="dark"
                    size="sm"
                  >
                    Visit Website
                  </TextLinkButton>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-8 md:gap-16">
            <div className="grid w-full grid-cols-8 gap-0">
              <div className="col-span-12 md:col-span-3 flex flex-col gap-6 pb-8 md:pb-0">
                <p className="text-md text-[var(--secondary-dark)]">
                  About the nonprofit
                </p>
                <div className="text-sm text-[var(--primary-dark)]">
                  {aboutNpo}
                </div>
              </div>

              <div className="hidden md:block md:col-span-1" aria-hidden />

              <div className="col-span-12 md:col-span-4 flex flex-col gap-6">
                <p className="text-md text-[var(--secondary-dark)]">
                  Our solution
                </p>
                <div className="text-sm text-[var(--primary-dark)]">
                  {ourSolution}
                </div>
              </div>
            </div>

            {testimonial && (
              <div className="flex flex-col gap-6">
                <p className="text-md text-[var(--secondary-dark)]">
                  Testimonial
                </p>
                <blockquote className="text-sm text-[var(--primary-dark)]">
                  <TestimonialQuoteBody>{testimonial}</TestimonialQuoteBody>
                </blockquote>
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              <Tag>{timeline}</Tag>
              {repoUrl && (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline-dark", size: "md" }),
                    "gap-2",
                  )}
                >
                  Project repo
                  <ArrowUpRight aria-hidden />
                </a>
              )}
              {caseStudyUrl && (
                <a
                  href={caseStudyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline-dark", size: "md" }),
                    "gap-2",
                  )}
                >
                  Read case study
                  <ArrowUpRight aria-hidden />
                </a>
              )}
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
