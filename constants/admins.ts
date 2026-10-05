/**
 * Emails allowed to sign in to the admin dashboard (/admin).
 * Must be lowercase. Anyone not on this list is signed out immediately.
 */
export const ADMIN_EMAILS: string[] = [
  // TODO: add admin emails, e.g. "someone@uwblueprint.org"
  "wilsonli@uwblueprint.org",
  "kenzysoror@uwblueprint.org",
  "isabellegan@uwblueprint.org",
  "rohansaha@uwblueprint.org",
  "stephenchen@uwblueprint.org",
  "madisonhan@uwblueprint.org",
];

export const isAdminEmail = (email: string | null | undefined): boolean =>
  !!email && ADMIN_EMAILS.includes(email.toLowerCase());
