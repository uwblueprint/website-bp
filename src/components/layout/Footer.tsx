"use client";

import TextLinkButton from "@/components/ui/TextLinkButton";
import { contactLinks, footerNavLinks } from "@/lib/site-links";

/* Column heading shared style */
function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-md mb-4"
      style={{ color: "var(--secondary-light)" }}
    >
      {children}
    </p>
  );
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--bp-blue)" }}>
      {/* Top section — flex row, each column explicitly 1/2 → 1/4 → 1/6 of the parent */}
      <div className="w-full px-8 pt-10 pb-0 mg-48">
        <div className="flex flex-row items-start gap-2">

          {/* Col 1 — NAVIGATE */}
          <div className="w-1/2 sm:w-1/4 lg:w-1/6 shrink-0">
            <ColHeading>Navigate</ColHeading>
            <ul className="flex flex-col gap-2">
              {footerNavLinks.map(({ href, label }) => (
                <li key={href}>
                  <TextLinkButton href={href} variant="light" size="md">
                    {label}
                  </TextLinkButton>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2 — GET IN TOUCH */}
          <div className="w-1/2 sm:w-1/4 lg:w-1/6 shrink-0">
            <ColHeading>Get in Touch</ColHeading>
            <ul className="flex flex-col gap-2">
              {contactLinks.map(({ label, href }) => (
                <li key={label}>
                  <TextLinkButton href={href} variant="light" size="md">
                    {label}
                  </TextLinkButton>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — link-details (hidden on mobile) */}
          <div className="hidden sm:block sm:w-1/4 lg:w-1/6 shrink-0">
            <ColHeading>&nbsp;</ColHeading>
            <ul className="flex flex-col gap-2">
              {contactLinks.map(({ value, label }) => (
                <li key={label}>
                  <span
                    className="text-md whitespace-nowrap cursor-default"
                    style={{ color: "var(--secondary-light)" }}
                  >
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Wordmark */}
      <div className="mt-10 w-full" aria-hidden="true" style={{ minHeight: "clamp(60px, 10vw, 160px)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="mt-32"
          src="/footer-bp-type.svg"
          alt=""
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    </footer>
  );
}
