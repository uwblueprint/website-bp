"use client";

import Link from "next/link";

import UnderlineToBackground from "@/components/fancy/text/underline-to-background";
import { FadeUp } from "@/components/ui/FadeUp";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

const PANELS = [
  {
    key: "nonprofits",
    label: "Nonprofits",
    body: (
      <>
        We&apos;re open to working with all registered nonprofits that serve
        their community — regardless of where you&apos;re located and your
        domain of interest. If you have a problem and believe that we can help,
        we&apos;d love to get in touch :){" "}
        <UnderlineToBackground
          as={Link}
          href="/contact"
          targetTextColor="var(--primary-light)"
        >
          Contact
        </UnderlineToBackground>{" "}
        us and our scoping team will promptly schedule an intro call to work
        through your problem space, needs and ways that we can provide
        technological relief.
      </>
    ),
    buttons: (
      <>
        <Link
          href="/nonprofits"
          className={buttonVariants({ variant: "filled-blue", size: "md" })}
        >
          nonprofits
        </Link>
        <Link
          href="/projects"
          className={buttonVariants({ variant: "outline-blue", size: "md" })}
        >
          projects
        </Link>
      </>
    ),
  },
  {
    key: "students",
    label: "Students",
    body: (
      <>
        We have a wide variety of roles and encourage applicants of all years
        and technical abilities to apply. Whether you&apos;re applying for
        developer, graphic designer or VP finance, we assess all candidates on
        their desire to learn, cultural fit and passion for social good — not
        just skill or seniority. We work year-round and our applications open ~2
        months before the term begins, with hiring decisions released 4–5 weeks
        later.
      </>
    ),
    buttons: (
      <>
        <Link
          href="/join-us"
          className={buttonVariants({ variant: "filled-blue", size: "md" })}
        >
          join our team
        </Link>
        <Link
          href="/students"
          className={buttonVariants({ variant: "outline-blue", size: "md" })}
        >
          students
        </Link>
      </>
    ),
  },
] as const;

export function InterestedSection({ className }: { className?: string }) {
  return (
    <section
      aria-label="Nonprofits and students"
      className={cn(
        "bg-[var(--primary-light)] pb-8 pt-12 text-left",
        className,
      )}
    >
      <div className="grid w-full grid-cols-12 gap-0 px-8">
        <h2 className="col-span-12 text-xxl pb-4 md:pb-8 text-[var(--bp-blue)]">
          interested?
        </h2>

        <div className="col-span-12 grid grid-cols-12 items-stretch gap-0 md:pt-8 text-left">
          {PANELS.map((panel, index) => (
            <FadeUp
              key={panel.key}
              index={index}
              inView
              className="col-span-12 h-full min-[800px]:col-span-6"
            >
              <div className="relative block h-full rounded-none bg-white py-4 md:p-8 text-left shadow-none transition-colors duration-200 hover:bg-[var(--off-white)]">
                <div className="relative flex h-full flex-col text-left">
                  <div className="pb-8">
                    <h3 className="pt-4 text-md font-roobert text-[var(--primary-dark)]">
                      {panel.label}
                    </h3>

                    <div className="pt-4 text-md font-roobert text-[var(--secondary-dark)]">
                      {panel.body}
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col gap-4 min-[800px]:flex-row">
                    {panel.buttons}
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
