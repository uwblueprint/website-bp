/**
 * Application open datetime
 * Format: MMM DD YYYY [HH, MM, SS] EST
 * Make sure the timezone is set to "EST"!
 */
const APPLICATION_OPEN_DATE = "Feb 20 2023 EST";
const APPLICATION_OPEN_TIME = [0, 0, 0];

/**
 * Application close datetime
 * Format: MMM DD YYYY [HH, MM, SS] EST
 * Make sure the timezone is set to "EST"!
 */
const APPLICATION_CLOSE_DATE = "Mar 6 2023 EST";
const APPLICATION_CLOSE_TIME = [23, 59, 59];

/**
 * Date that invites are sent out for interviews
 * Format: MMM DD
 */
export const INVITE_DATE = "Mar 19";

/**
 * Final decision date
 * Format: MMM DD
 */
export const FINAL_DECISION_DATE = "Apr 3";

// Term this application is for
export const APPLICATION_TERM = "Spring 2023";

// URL of application page
export const APPLICATION_LINK = "/apply";

// Export dates and strings with the DST-adjusted time.
const DATE_FORMAT_OPTIONS = {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

// Application open date
const _openDate = new Date(APPLICATION_OPEN_DATE);
_openDate.setHours(...APPLICATION_OPEN_TIME);
export const APPLICATION_OPEN_DATETIME = _openDate;
export const APPLICATION_OPEN_STRING = APPLICATION_OPEN_DATETIME.toLocaleString(
  undefined,
  DATE_FORMAT_OPTIONS,
);

// Application close date
const _closeDate = new Date(APPLICATION_CLOSE_DATE);
_closeDate.setHours(...APPLICATION_CLOSE_TIME);
export const APPLICATION_CLOSE_DATETIME = _closeDate;
export const APPLICATION_CLOSE_STRING =
  APPLICATION_CLOSE_DATETIME.toLocaleString(undefined, DATE_FORMAT_OPTIONS);

// Calculate if the application is live
const _currentDate = new Date();
export const APPLICATION_IS_LIVE =
  _openDate < _currentDate && _currentDate < _closeDate;
