import dayjs from "@utils/dayjs";

/**
 * Application open datetime
 * Format: YYYY-MM-DD HH:MM:SS
 */
export const APPLICATION_OPEN_DATETIME = dayjs.tz(
  "2024-02-22 00:00:00",
  "America/Toronto",
);

/**
 * Application close datetime
 * Format: YYYY-MM-DD HH:MM:SS
 */
export const APPLICATION_CLOSE_DATETIME = dayjs.tz(
  "2024-03-09 23:59:59",
  "America/Toronto",
);

export const APPLICATION_CLOSE_DATETIME_WITH_GRACE_PERIOD =
  APPLICATION_CLOSE_DATETIME.add(5, "minute");

/**
 * Date that invites are sent out for interviews
 * Format: MMM DD
 */
export const INVITE_DATE = "March 18th - 20th";

/**
 * Final decision date
 * Format: MMM DD
 */
export const FINAL_DECISION_DATE = "April 13th";

// Term Blueprint is currently recruiting for (1 term after the current term)
export const APPLICATION_TERM = "Summer 2024";

// URL of application page
export const APPLICATION_LINK = "/apply";

// Calculate if the application is live
const now = dayjs();
export const APPLICATION_IS_LIVE =
  now.isAfter(APPLICATION_OPEN_DATETIME) &&
  now.isBefore(APPLICATION_CLOSE_DATETIME);
