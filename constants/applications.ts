/**
 * Application open datetime
 * Format: MMM DD YYYY HH:MM:SS TZ
 */
export const APPLICATION_OPEN_DATETIME = "Feb 27 2022 00:00:00 EST";

/**
 * Application close datetime
 * Format: MMM DD YYYY HH:MM:SS TZ
 */
export const APPLICATION_CLOSE_DATETIME = "Mar 11 2022 23:59:59 EST";

/**
 * Date that invites are sent out for interviews
 * Format: MMM DD
 */
export const INVITE_DATE = "Mar 15";

/**
 * Final decision date
 * Format: MMM DD
 */
export const FINAL_DECISION_DATE = "Apr 1";

// URL of application page
export const APPLICATION_LINK = "https://uwblueprint.org/apply";

// Calculate if the application is live
const _currentDate = new Date();
const _openDate = new Date(APPLICATION_OPEN_DATETIME);
const _closeDate = new Date(APPLICATION_CLOSE_DATETIME);
export const APPLICATION_IS_LIVE =
  _openDate < _currentDate && _currentDate < _closeDate;
