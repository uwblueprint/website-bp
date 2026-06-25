"use client";

import { useEffect, useState } from "react";

import { FadeUp } from "@/components/ui/FadeUp";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Applications open July 1, 2026 at 12:00 AM (America/Toronto, UTC-4 in July).
const APPLICATIONS_OPEN = new Date("2026-07-01T00:00:00-04:00");

// Application window: July 1 – July 10, 2026.
const APPLY_BY = new Date("2026-07-10T23:59:00-04:00");

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOpen: boolean;
};

function getTimeLeft(): TimeLeft {
  const diff = APPLICATIONS_OPEN.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOpen: true };
  }
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isOpen: false,
  };
}

// Format a Date as an iCalendar UTC timestamp: YYYYMMDDTHHMMSSZ
function toICalUTC(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

function downloadCalendarInvite() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//UW Blueprint//Applications//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:applications-2026-summer@uwblueprint.org",
    `DTSTAMP:${toICalUTC(new Date())}`,
    `DTSTART:${toICalUTC(APPLICATIONS_OPEN)}`,
    `DTEND:${toICalUTC(APPLY_BY)}`,
    "SUMMARY:Apply to UW Blueprint",
    "DESCRIPTION:Applications to join UW Blueprint are open from July 1 to July 10\\, 2026. Come build real things with us! Apply at https://uwblueprint.org/build",
    "URL:https://uwblueprint.org/build",
    "BEGIN:VALARM",
    "TRIGGER:-PT0M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Applications to UW Blueprint are now open",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "uw-blueprint-applications.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const UNITS: { key: keyof Omit<TimeLeft, "isOpen">; label: string }[] = [
  { key: "days", label: "days" },
  { key: "hours", label: "hours" },
  { key: "minutes", label: "minutes" },
  { key: "seconds", label: "seconds" },
];

export function ApplicationsCountdown({ className }: { className?: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const isOpen = timeLeft?.isOpen ?? false;

  return (
    <section
      aria-label="Applications countdown"
      className={cn("bg-[#121D5D] px-8 py-8 md:py-24 text-left", className)}
    >
      <FadeUp inView>
        <div className="grid w-full grid-cols-12 gap-0">
          <h2
            lang="en"
            className="col-span-12 max-w-3xl text-lg text-[var(--primary-light)] [hyphens:auto] break-words pb-10"
          >
            {isOpen
              ? "Applications are open until July 10th"
              : "Applications open on July 1st"}
          </h2>

          {!isOpen && (
            <div
              className="col-span-12 flex flex-wrap gap-x-8 gap-y-6 pb-12"
              aria-live="polite"
            >
              {UNITS.map(({ key, label }) => (
                <div key={key} className="flex flex-col">
                  <span
                    className="text-xl text-[var(--primary-light)] tabular-nums"
                    style={{ lineHeight: 0.9 }}
                  >
                    {timeLeft ? String(timeLeft[key]).padStart(2, "0") : "--"}
                  </span>
                  <span className="text-md lowercase text-[var(--secondary-light)]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="col-span-12">
            <Button
              type="button"
              variant="filled-light"
              size="md"
              className="text-[#121D5D]"
              onClick={downloadCalendarInvite}
            >
              save to calendar
            </Button>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
