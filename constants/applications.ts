import dayjs from "@utils/dayjs";

/**
 * Application open datetime
 * Format: YYYY-MM-DD HH:MM:SS
 */
export const APPLICATION_OPEN_DATETIME = dayjs.tz(
  "2023-10-25 00:00:00",
  "America/Toronto",
);

/**
 * Application close datetime
 * Format: YYYY-MM-DD HH:MM:SS
 */
export const APPLICATION_CLOSE_DATETIME = dayjs.tz(
  "2023-11-11 23:59:59",
  "America/Toronto",
);

export const APPLICATION_CLOSE_DATETIME_WITH_GRACE_PERIOD =
  APPLICATION_CLOSE_DATETIME.add(5, "minute");

/**
 * Date that invites are sent out for interviews
 * Format: MMM DD
 */
export const INVITE_DATE = "November 23rd";

/**
 * Final decision date
 * Format: MMM DD
 */
export const FINAL_DECISION_DATE = "December 9th";

// Term Blueprint is currently recruiting for (1 term after the current term)
export const APPLICATION_TERM = "Winter 2023";

// URL of application page
export const APPLICATION_LINK = "/apply";

// Calculate if the application is live
const now = dayjs();
export const APPLICATION_IS_LIVE =
  now.isAfter(APPLICATION_OPEN_DATETIME) &&
  now.isBefore(APPLICATION_CLOSE_DATETIME);
