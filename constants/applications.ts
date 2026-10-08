import dayjs from "@utils/dayjs";
import roleSpecificJson from "@constants/role-specific-questions.json";

/**
 * Application open datetime
 * Format: YYYY-MM-DD HH:MM:SS
 */
export const APPLICATION_OPEN_DATETIME = dayjs.tz(
  // "2026-07-01 18:00:00",
  "2026-10-04 12:00:00",
  "America/Toronto",
);

/**
 * Application close datetime
 * Format: YYYY-MM-DD HH:MM:SS
 */
export const APPLICATION_CLOSE_DATETIME = dayjs.tz(
  // "2026-07-16 16:50:00",
  "2026-10-12 23:59:59",
  "America/Toronto",
);

export const APPLICATION_CLOSE_DATETIME_WITH_GRACE_PERIOD =
  APPLICATION_CLOSE_DATETIME.add(5, "minute");

/**
 * Date that invites are sent out for interviews
 * Format: MMM DD
 */
export const INVITE_DATE = "the start of reading week";

/**
 * Final decision date
 * Format: MMM DD
 */
export const FINAL_DECISION_DATE = "the end of reading week";

// Term Blueprint is currently recruiting for (1 term after the current term)
export const APPLICATION_TERM = "Fall 2026";

// Roles currently accepting applications (roles without `"open": false`)
export const OPEN_ROLES = roleSpecificJson
  .filter((role) => !("open" in role) || role.open !== false)
  .map(({ role }) => role);

// Open roles as readable text, e.g. "A, B, and C"
export const OPEN_ROLES_TEXT = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
}).format(OPEN_ROLES);

// URL of application page
export const APPLICATION_LINK = "/apply";

// Calculate if the application is live
const now = dayjs();
export const APPLICATION_IS_LIVE =
  now.isAfter(APPLICATION_OPEN_DATETIME) &&
  now.isBefore(APPLICATION_CLOSE_DATETIME);
