import dayjs from "@utils/dayjs";

/**
 * Application open datetime
 * Format: YYYY-MM-DD HH:MM:SS
 */
export const APPLICATION_OPEN_DATETIME = dayjs.tz(
  "2026-07-01 18:00:00",
  "America/Toronto",
);

/**
 * Application close datetime
 * Format: YYYY-MM-DD HH:MM:SS
 */
export const APPLICATION_CLOSE_DATETIME = dayjs.tz(
  // normally should be 23:59:59, but i felt nice and let someone apply
  "2026-07-16 00:30:00",
  "America/Toronto",
);

export const APPLICATION_CLOSE_DATETIME_WITH_GRACE_PERIOD =
  APPLICATION_CLOSE_DATETIME.add(5, "minute");

/**
 * Date that invites are sent out for interviews
 * Format: MMM DD
 */
export const INVITE_DATE = "the end of July";

/**
 * Final decision date
 * Format: MMM DD
 */
export const FINAL_DECISION_DATE = "the start of August";

// Term Blueprint is currently recruiting for (1 term after the current term)
export const APPLICATION_TERM = "Fall 2026";

// URL of application page
export const APPLICATION_LINK = "/apply";

// Calculate if the application is live
const now = dayjs();
export const APPLICATION_IS_LIVE =
  now.isAfter(APPLICATION_OPEN_DATETIME) &&
  now.isBefore(APPLICATION_CLOSE_DATETIME);

/** How long before the close datetime the countdown toolbar starts showing. */
export const APPLICATION_COUNTDOWN_LEAD_MS = 60 * 60 * 1000;

/**
 * Where the current moment sits relative to the application deadline.
 *
 * - `quiet`   — more than an hour out; no countdown shown.
 * - `closing` — final hour before the deadline; submissions accepted.
 * - `grace`   — past the deadline, inside the grace period; still accepted.
 * - `closed`  — past the grace period; submissions rejected outright.
 */
export type ApplicationPhase = "quiet" | "closing" | "grace" | "closed";

/**
 * Resolve the deadline phase for a moment in time. Takes `now` as an argument
 * so callers tick it themselves — a module-level value would freeze at load.
 */
export const getApplicationPhase = (now: number): ApplicationPhase => {
  if (now >= +APPLICATION_CLOSE_DATETIME_WITH_GRACE_PERIOD) return "closed";
  if (now >= +APPLICATION_CLOSE_DATETIME) return "grace";
  if (now >= +APPLICATION_CLOSE_DATETIME - APPLICATION_COUNTDOWN_LEAD_MS)
    return "closing";
  return "quiet";
};

/** Milliseconds until the deadline (`closing`) or the grace cutoff (`grace`). */
export const getMsUntilPhaseEnd = (now: number): number => {
  const target =
    now >= +APPLICATION_CLOSE_DATETIME
      ? +APPLICATION_CLOSE_DATETIME_WITH_GRACE_PERIOD
      : +APPLICATION_CLOSE_DATETIME;
  return Math.max(0, target - now);
};
