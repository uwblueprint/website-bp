"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect, useState } from "react";

import { FadeUp } from "@/components/ui/FadeUp";
import { buttonVariants } from "@/components/ui/button-variants";

/**
 * A single Luma event. `eventId` is the `evt-...` id from the event page and
 * powers the in-page RSVP modal via Luma's checkout button. `href` is the
 * public event URL, used as a graceful fallback if the script can't load.
 * `iso` is the day it happens (YYYY-MM-DD), used for the "Today" tag. `cutoff`
 * is the absolute instant (with timezone offset) the RSVP link disappears —
 * set to the event start so people can't register once it's underway. Without
 * a `cutoff` the item just hides at the end of its `iso` day.
 */
type LumaEvent = {
  label: string;
  date: string;
  iso: string;
  cutoff?: string;
  eventId: string;
  href: string;
};

const BP_NIGHTS: LumaEvent[] = [
  {
    label: "Design Night",
    date: "Jul 6",
    iso: "2026-07-06",
    cutoff: "2026-07-06T18:00:00-04:00",
    eventId: "evt-4u1Fj6uFRO8Ew0r",
    href: "https://luma.com/9fgpo0oi",
  },
  {
    label: "Product Night",
    date: "Jul 7",
    iso: "2026-07-07",
    cutoff: "2026-07-07T18:00:00-04:00",
    eventId: "evt-nY4n5wL2MidsxDw",
    href: "https://luma.com/hqa9683h",
  },
  {
    label: "Dev Night",
    date: "Jul 8",
    iso: "2026-07-08",
    cutoff: "2026-07-08T18:00:00-04:00",
    eventId: "evt-fHM6DaQHCV3yo5i",
    href: "https://luma.com/yj5177ng",
  },
];

const IMPACT_A_THON: LumaEvent = {
  label: "RSVP",
  date: "Jul 11",
  iso: "2026-07-11",
  cutoff: "2026-07-11T10:00:00-04:00",
  eventId: "evt-rTd5DHtEbyOXQhT",
  href: "https://luma.com/rr207zr8",
};

const MERCH_FORM = "https://forms.gle/JZTY9X249hNTTX3N9";
const CONTACT_EMAIL = "info@uwblueprint.org";

// Applications close July 13 at 11:59pm ET; the card hides right after.
const JOIN_CLOSE_ISO = "2026-07-13";
const JOIN_CUTOFF = "2026-07-13T23:59:00-04:00";
/** Last day merch is available. Passed dates are hidden from the page. */
const MERCH_CLOSE_ISO = "2026-07-03";

type DayStatus = "upcoming" | "today" | "past";

/** Local-midnight timestamp (ms) for a Date. */
function startOfDayMs(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

/** Local-midnight timestamp (ms) for a YYYY-MM-DD string. */
function isoDayMs(iso: string): number {
  return startOfDayMs(new Date(`${iso}T00:00:00`));
}

/**
 * Compares a close/event date against today. Returns "upcoming" while `today`
 * is null (server render + first client render) so hydration stays stable; the
 * real status resolves in an effect after mount.
 */
function dayStatus(iso: string, today: Date | null): DayStatus {
  if (!today) return "upcoming";
  const t = startOfDayMs(today);
  const day = isoDayMs(iso);
  if (day < t) return "past";
  if (day === t) return "today";
  return "upcoming";
}

/**
 * Whether an event's RSVP link should be gone. Uses the absolute `cutoff`
 * instant when present (e.g. hide at 6pm event start), otherwise falls back to
 * hiding at the end of the event's calendar day.
 */
function eventPast(event: LumaEvent, now: Date | null): boolean {
  if (!now) return false;
  if (event.cutoff) return now.getTime() >= new Date(event.cutoff).getTime();
  return dayStatus(event.iso, now) === "past";
}

/** "Today" / "Tomorrow" for the day an event lands on, else null (show date). */
function relativeDayLabel(iso: string, now: Date | null): string | null {
  if (!now) return null;
  const diffDays = Math.round((isoDayMs(iso) - startOfDayMs(now)) / 86400000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  return null;
}

const ROW_CLASS =
  "group flex w-full items-center justify-between gap-4 rounded-none bg-white px-6 py-5 text-left text-[var(--primary-dark)] shadow-[inset_0_0_0_1px_rgba(15,23,70,0.14)] transition-colors duration-200 hover:bg-black/[0.04]";

// Luma's checkout-button.js injects its own styles onto `.luma-checkout--button`,
// so every visual property is forced with `!` to keep parity with ROW_CLASS.
const LUMA_ROW_CLASS =
  "luma-checkout--button group flex !h-auto !min-h-0 !w-full items-center justify-between gap-4 !rounded-none !border-0 !bg-white !px-6 !py-5 text-left !text-[var(--primary-dark)] !shadow-[inset_0_0_0_1px_rgba(15,23,70,0.14)] transition-colors duration-200 hover:!bg-black/[0.04]";

const TAG_CLASS =
  "rounded-none bg-[var(--bp-blue)]/10 px-2.5 py-1 text-sm text-[var(--bp-blue)]";

/** Luma RSVP button — opens the checkout modal in-page (falls back to href). */
function LumaRow({
  event,
  relative,
}: {
  event: LumaEvent;
  relative: string | null;
}) {
  return (
    <a
      href={event.href}
      className={LUMA_ROW_CLASS}
      data-luma-action="checkout"
      data-luma-event-id={event.eventId}
    >
      <span className="text-md">{event.label}</span>
      <span className="flex items-center gap-3">
        <span
          className={`text-md ${
            relative ? "text-[var(--bp-blue)]" : "text-[var(--secondary-dark)]"
          }`}
        >
          {relative ?? event.date}
        </span>
        <span
          aria-hidden
          className="text-[var(--bp-blue)] transition-transform duration-200 group-hover:translate-x-0.5"
        >
          &rarr;
        </span>
      </span>
    </a>
  );
}

/** Section heading with the date range it covers. */
function SectionHead({ title, dates }: { title: string; dates: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h2 className="text-lg text-[var(--primary-dark)]">{title}</h2>
      <span className="text-sm text-[var(--secondary-dark)]">{dates}</span>
    </div>
  );
}

export function LinkHub() {
  // Resolved after mount so date logic never diverges between server and client.
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => setToday(new Date()), []);

  const joinPast =
    !!today && today.getTime() >= new Date(JOIN_CUTOFF).getTime();
  const joinToday = dayStatus(JOIN_CLOSE_ISO, today) === "today";
  const merchStatus = dayStatus(MERCH_CLOSE_ISO, today);
  const impactPast = eventPast(IMPACT_A_THON, today);
  const nights = BP_NIGHTS.filter((e) => !eventPast(e, today)).map((e) => ({
    event: e,
    relative: relativeDayLabel(e.iso, today),
  }));

  // Once everything has passed, show a friendly empty state instead of a bare
  // page. `today` is null pre-mount, so this never flashes on first paint.
  const nothingLeft =
    !!today &&
    joinPast &&
    impactPast &&
    merchStatus === "past" &&
    nights.length === 0;

  return (
    <main className="flex min-h-screen justify-center bg-[var(--primary-light)] px-6 pt-10 pb-20 md:pt-14 md:pb-28">
      <Script
        id="luma-checkout"
        src="https://embed.lu.ma/checkout-button.js"
        strategy="afterInteractive"
      />

      <div className="flex w-full max-w-md flex-col gap-14 md:max-w-lg">
        {/* Header: who this is and what you can do here */}
        <FadeUp>
          <header className="flex flex-col items-start gap-5 text-left">
            <Image
              src="/bp-logo-blue.svg"
              alt="UW Blueprint"
              width={36}
              height={36}
              className="h-9 w-9"
              priority
            />
            <h1 className="text-xl lowercase text-[var(--primary-dark)]">
              get involved
            </h1>
          </header>
        </FadeUp>

        {/* Primary CTA: hiring is the highest-stakes action, so it leads */}
        {!joinPast && (
          <FadeUp index={0} inView>
            <div className="flex flex-col items-start rounded-none bg-white px-6 py-6 shadow-[inset_0_0_0_1px_rgba(15,23,70,0.14)]">
              <span className={TAG_CLASS}>
                {joinToday ? "Closes today" : "Ends July 13"}
              </span>
              <h2 className="pt-4 text-lg text-[var(--primary-dark)]">
                Join the Fall 2026 team
              </h2>
              <p className="pt-2 text-sm text-[var(--secondary-dark)]">
                We&apos;re hiring technical and community roles to build
                software for non profits.
              </p>
              <a
                href="https://uwblueprint.org/apply"
                className={`${buttonVariants({
                  variant: "filled-blue",
                  size: "md",
                })} mt-5`}
              >
                Apply
              </a>
            </div>
          </FadeUp>
        )}

        {/* Blueprint Nights */}
        {nights.length > 0 && (
          <FadeUp index={1} inView>
            <section
              aria-label="Blueprint Nights"
              className="flex flex-col gap-4"
            >
              <SectionHead title="Blueprint Nights" dates="Jul 6 to 8" />
              <p className="text-sm text-[var(--secondary-dark)]">
                Talks and people across three nights, one for each craft.
              </p>
              <div className="flex flex-col gap-3 pt-1">
                {nights.map(({ event, relative }) => (
                  <LumaRow
                    key={event.label}
                    event={event}
                    relative={relative}
                  />
                ))}
              </div>
            </section>
          </FadeUp>
        )}

        {/* Impact-A-thon */}
        {!impactPast && (
          <FadeUp index={2} inView>
            <section aria-label="Impact-A-thon" className="flex flex-col gap-4">
              <SectionHead title="Impact-A-thon" dates="Jul 11" />
              <p className="text-sm text-[var(--secondary-dark)]">
                Build a real solution to a nonprofit challenge in one day. Food
                provided, no experience needed.
              </p>
              <div className="pt-1">
                <LumaRow
                  event={IMPACT_A_THON}
                  relative={relativeDayLabel(IMPACT_A_THON.iso, today)}
                />
              </div>
            </section>
          </FadeUp>
        )}

        {/* Merch: no deadline once open, so it anchors the bottom */}
        {merchStatus !== "past" && (
          <FadeUp index={3} inView>
            <section
              aria-label="Blueprint Merch"
              className="flex flex-col gap-4"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-lg text-[var(--primary-dark)]">
                  Blueprint Merch
                </h2>
                {merchStatus === "today" && (
                  <span className={TAG_CLASS}>Closes today</span>
                )}
              </div>
              <p className="text-sm text-[var(--secondary-dark)]">
                Custom Blueprint oversized hoodies. For past and present
                Blueprint members.
              </p>
              <a
                href={MERCH_FORM}
                target="_blank"
                rel="noopener noreferrer"
                className={`${ROW_CLASS} mt-1`}
              >
                <span className="text-md">Order merch</span>
                <span
                  aria-hidden
                  className="text-[var(--bp-blue)] transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  &#8599;
                </span>
              </a>
            </section>
          </FadeUp>
        )}

        {/* Empty state: shown only once everything above has passed */}
        {nothingLeft && (
          <FadeUp index={0} inView>
            <div className="flex flex-col items-start rounded-none bg-white px-6 py-8 shadow-[inset_0_0_0_1px_rgba(15,23,70,0.14)]">
              <h2 className="text-lg text-[var(--primary-dark)]">
                More things coming soon
              </h2>
              <p className="pt-2 text-sm text-[var(--secondary-dark)]">
                Check back here later for events and ways to get involved.
                Questions? Reach us at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-[var(--bp-blue)] underline"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </div>
          </FadeUp>
        )}
      </div>
    </main>
  );
}
