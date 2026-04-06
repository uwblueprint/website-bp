import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";

interface ProjectShowcaseProps {
  /** Anchor id used by the hero links to scroll here. */
  id: string;
  highlightImage: string;
  projectName: string;
  timeline: string;
  repoUrl?: string;
  caseStudyUrl?: string;
  aboutNpo: React.ReactNode;
  ourSolution: React.ReactNode;
  testimonial?: React.ReactNode;
}

export function ProjectShowcase({
  id,
  highlightImage,
  projectName,
  timeline,
  repoUrl,
  caseStudyUrl,
  aboutNpo,
  ourSolution,
  testimonial,
}: ProjectShowcaseProps) {
  const hasButtons = !!repoUrl || !!caseStudyUrl;
  const imageUnoptimized = highlightImage.endsWith(".svg");

  return (
    <section
      id={id}
      aria-label={`${projectName} project`}
      className="grid w-full grid-cols-12 gap-0"
    >
      {/* ── Sticky image column ─────────────────────────────────────────────── */}
      <div className="relative hidden md:col-span-5 md:sticky md:top-0 md:block md:h-screen">
        <Image
          src={highlightImage}
          alt={`${projectName} highlight`}
          fill
          sizes="42vw"
          className="object-cover"
          priority={false}
          unoptimized={imageUnoptimized}
        />
      </div>

      {/* ── Main content column ─────────────────────────────────────────────── */}
      <div className="col-span-12 flex min-h-screen flex-col gap-16 bg-white px-8 py-32 md:col-span-7">
        {/* Project name */}
        <h2
          className="text-xxl lowercase text-[var(--bp-blue)]"
          style={{ lineHeight: 0.8 }}
        >
          {projectName}
        </h2>

        {/* Grey content card */}
        <div className="flex flex-col bg-[var(--off-white)]">
          {/* Timeline + buttons strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-8 pt-8">
            <p className="text-md text-[var(--secondary-dark)]">
              {timeline}
            </p>

            {hasButtons && (
              <div className="flex gap-4">
                {repoUrl && (
                  <Link
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline-blue", size: "md" }),
                      "uppercase",
                    )}
                  >
                    Project Repository
                  </Link>
                )}
                {caseStudyUrl && (
                  <Link
                    href={caseStudyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline-blue", size: "md" }),
                      "uppercase",
                    )}
                  >
                    Read Case Study
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Body text */}
          <div className="flex flex-col gap-6 px-8 py-12 text-md">
            {/* Row A — about + solution side-by-side */}
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="flex flex-1 flex-col">
                <p className="text-[var(--primary-dark)]">
                  About the nonprofit
                </p>
                <div className="text-[var(--secondary-dark)]">{aboutNpo}</div>
              </div>

              <div className="flex flex-1 flex-col">
                <p className="text-[var(--primary-dark)]">Our solution</p>
                <div className="text-[var(--secondary-dark)]">
                  {ourSolution}
                </div>
              </div>
            </div>

            {/* Row B — testimonial (optional) */}
            {testimonial && (
              <div className="flex flex-col">
                <p className="text-[var(--primary-dark)]">Testimonial</p>
                <div className="text-[var(--secondary-dark)]">
                  {testimonial}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
