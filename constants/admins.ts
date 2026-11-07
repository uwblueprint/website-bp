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
  "chunghe@uwblueprint.org",
  "nicoletang@uwblueprint.org",
  "rishabnayak@uwblueprint.org",
  "rohansane@uwblueprint.org",
  "sherrytse@uwblueprint.org",
  "ianfang@uwblueprint.org",
  "nicholassouto@uwblueprint.org",
  "tristintran@uwblueprint.org",
  "harmonychen@uwblueprint.org",
  "dhanvipandya@uwblueprint.org",
  "sarahkhandoker@uwblueprint.org",
  "jaywong@uwblueprint.org",
  "justinluu@uwblueprint.org",
  "maithilykadam@uwblueprint.org",
  "sophiejing@uwblueprint.org",
  "lennoxpee@uwblueprint.org",
  "tiaralanson@uwblueprint.org",
  "andrewlaw@uwblueprint.org",
  "sophiamao@uwblueprint.org",
  "prachishah@uwblueprint.org",
];

export const isAdminEmail = (email: string | null | undefined): boolean =>
  !!email && ADMIN_EMAILS.includes(email.toLowerCase());
