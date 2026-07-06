/** Shared URLs and labels for Footer + Navbar (single source of truth). */

export const contactEmail = "info@uwblueprint.org";

export const contactLinks = [
  {
    label: "Email",
    value: contactEmail,
    href: `mailto:${contactEmail}`,
    /** Clicking copies this value to clipboard instead of navigating. */
    copyValue: contactEmail,
  },
  {
    label: "Instagram",
    value: "@uwblueprint",
    href: "https://instagram.com/uwblueprint",
  },
  {
    label: "LinkedIn",
    value: "/company/uw-blueprint",
    href: "https://linkedin.com/company/uw-blueprint",
  },
  {
    label: "Medium",
    value: "uwblueprint.medium",
    href: "https://uwblueprint.medium.com",
  },
] as const;

/** Primary site navigation — same items and order in Navbar and Footer. */
export const mainNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/nonprofits", label: "Nonprofits" },
  { href: "/students", label: "Students" },
  { href: "/join-us", label: "Join our team" },
  { href: "/roles", label: "Roles" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerNavLinks = mainNavLinks;
export const navbarNavLinks = mainNavLinks;
