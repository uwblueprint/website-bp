"use client";

import { Minus, Plus } from "@/components/ui/icons";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";
import * as React from "react";

export type RoleItem = {
  title: string;
  // Short line shown above the description.
  tagline?: string;
  // A single paragraph, or several paragraphs as an array.
  description: string | string[];
  responsibilities?: string[];
  // Defaults to "Responsibilities".
  responsibilitiesHeading?: string;
  // Paragraphs shown after the responsibilities list.
  closing?: string[];
  keyTraits?: string[];
  link?: { href: string; label: string };
  note?: string;
};

function RoleRow({ role }: { role: RoleItem }) {
  const id = React.useId();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="group transition-colors duration-200 hover:bg-black/5">
      <button
        type="button"
        className="flex w-full items-start justify-between gap-6 pt-8 md:px-6 md:py-6 text-left"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-md text-[var(--primary-dark)]">{role.title}</span>
        <span className="mt-0.5 shrink-0 text-[var(--primary-dark)]">
          {open ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>

      {open ? (
        <div id={id} className="pt-2 md:pt-0 md:px-6 pb-6 flex flex-col gap-4">
          {role.tagline ? <Tag size="sm">{role.tagline}</Tag> : null}

          {(Array.isArray(role.description)
            ? role.description
            : [role.description]
          ).map((paragraph) => (
            <p key={paragraph} className="text-md text-[var(--secondary-dark)]">
              {paragraph}
            </p>
          ))}

          {role.responsibilities && role.responsibilities.length > 0 ? (
            <div className="flex flex-col gap-4 pt-2">
              <Tag size="sm">
                {role.responsibilitiesHeading ?? "Responsibilities"}
              </Tag>
              <ul className="flex flex-col gap-1 list-disc list-outside ml-5">
                {role.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="text-md text-[var(--secondary-dark)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {role.closing?.map((paragraph) => (
            <p key={paragraph} className="text-md text-[var(--secondary-dark)]">
              {paragraph}
            </p>
          ))}

          {role.keyTraits && role.keyTraits.length > 0 ? (
            <div className="flex flex-col gap-4 pt-2">
              <Tag size="sm">Key traits</Tag>
              <ul className="flex flex-col gap-1 list-disc list-outside ml-5">
                {role.keyTraits.map((trait) => (
                  <li
                    key={trait}
                    className="text-md text-[var(--secondary-dark)]"
                  >
                    {trait}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {role.link ? (
            <a
              href={role.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-md text-[var(--bp-blue)] underline decoration-from-font underline-offset-[0.2em] transition-opacity hover:opacity-70 w-fit"
            >
              {role.link.label}
            </a>
          ) : null}

          {role.note ? (
            <p className="text-md text-[var(--secondary-dark)] italic">
              {role.note}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function RolesSection({
  groupName,
  roles,
  className,
  id,
}: {
  groupName: string;
  roles: RoleItem[];
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      aria-label={groupName}
      className={cn("bg-[var(--primary-light)] px-8 pt-24 pb-16", className)}
    >
      <div className="grid w-full grid-cols-12 gap-0">
        <h2 className="col-span-12 text-xxl lowercase text-[var(--bp-blue)] pb-12">
          {groupName}
        </h2>

        <div className="col-span-12 md:col-span-8">
          {roles.map((role) => (
            <RoleRow key={role.title} role={role} />
          ))}
        </div>
      </div>
    </section>
  );
}
