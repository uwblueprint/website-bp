import {
  APPLICATION_CLOSE_DATETIME,
  APPLICATION_CLOSE_DATETIME_WITH_GRACE_PERIOD,
  APPLICATION_OPEN_DATETIME,
  APPLICATION_TERM,
} from "@constants/applications";

// session storage for app page access
const STORAGE_KEY = "uwbp:application-in-progress";

const rememberApplicationStarted = () => {
  window.sessionStorage.setItem(STORAGE_KEY, APPLICATION_TERM);
};

const hasApplicationStarted = () => {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === APPLICATION_TERM;
  } catch {
    return false;
  }
};

export type ApplyAccess = "granted" | "denied";

// determines if the user can still access their app during the grace period (if they already started it)
export const resolveApplyAccess = (now: number): ApplyAccess => {
  if (now >= +APPLICATION_CLOSE_DATETIME_WITH_GRACE_PERIOD) return "denied";

  if (now < +APPLICATION_OPEN_DATETIME) return "denied";

  if (now < +APPLICATION_CLOSE_DATETIME) {
    rememberApplicationStarted();
    return "granted";
  }

  return hasApplicationStarted() ? "granted" : "denied";
};
