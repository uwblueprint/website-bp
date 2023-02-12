/**
 * Application open datetime
 * Format: MMM DD YYYY HH:MM:SS TZ
 * Note: be mindful of day light saving time changes!
 */
export const APPLICATION_OPEN_DATETIME = "Feb 19 2023 00:00:00 EDT";

/**
 * Application close datetime
 * Format: MMM DD YYYY HH:MM:SS TZ
 * Note: be mindful of day light saving time changes!
 */
export const APPLICATION_CLOSE_DATETIME = "Mar 3 2023 23:59:59 EDT";

/**
 * Date that invites are sent out for interviews
 * Format: MMM DD
 */
export const INVITE_DATE = "Mar 19";

/**
 * Final decision date
 * Format: MMM DD
 */
export const FINAL_DECISION_DATE = "Apr 10";

// Term this application is for
export const APPLICATION_TERM = "Spring 2023";

// URL of application page
export const APPLICATION_LINK = "/apply";

// Calculate if the application is live
const _currentDate = new Date();
const _openDate = new Date(APPLICATION_OPEN_DATETIME);
const _closeDate = new Date(APPLICATION_CLOSE_DATETIME);
export const APPLICATION_IS_LIVE =
  _openDate < _currentDate && _currentDate < _closeDate;
