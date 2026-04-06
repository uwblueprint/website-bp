"use client";

import { Minus, Plus } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import * as React from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const APPLICATION_FAQ: FAQItem[] = [
  {
    question: "Can I apply if I don't go to UWaterloo?",
    answer:
      "Unfortunately, UW Blueprint is only open to students currently enrolled at the University of Waterloo. We hope to inspire similar organizations at other schools!",
  },
  {
    question: "Can I be a part of Blueprint while on a work term?",
    answer:
      "Yes! Many of our members participate while on co-op. We understand that balancing work and Blueprint requires flexibility, and we do our best to accommodate different schedules.",
  },
  {
    question:
      "I don't have a lot of dev or design experience, should I still apply?",
    answer:
      "Absolutely. We look for passion, drive, and a willingness to learn above all else. Many of our strongest members joined with limited technical experience and grew tremendously through mentorship and hands-on project work.",
  },
];

const TEAM_FAQ: FAQItem[] = [
  {
    question: "How do you choose projects?",
    answer:
      "Our scoping team evaluates nonprofit applications based on community impact, technical feasibility, and alignment with our team's skills. We look for projects where technology can meaningfully improve operations or outreach for the organization.",
  },
  {
    question: "Do I get to choose which project I work on?",
    answer:
      "We do our best to match members with projects that align with their interests and growth goals. During onboarding, you'll have the chance to express your preferences, and we take those into account when forming teams.",
  },
  {
    question: "How does mentorship work in Blueprint?",
    answer:
      "Every new member is paired with a more experienced member who provides guidance on technical skills, project work, and navigating the Blueprint experience. Mentors check in regularly and are always available for questions or support.",
  },
  {
    question:
      "What's the time commitment? How many hours per week will I spend on Blueprint?",
    answer:
      "Members typically spend around 5–10 hours per week on Blueprint, including team meetings, project work, and socials. The exact commitment can vary depending on your role and the phase of the project.",
  },
];

function FAQItemRow({ item }: { item: FAQItem }) {
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
        <span className="text-md text-[var(--primary-dark)]">
          {item.question}
        </span>
        <span className="mt-0.5 shrink-0 text-[var(--primary-dark)]">
          {open ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>

      {open ? (
        <div id={id} className="pt-6 md:pt-0 md:px-6 pb-6">
          <p className="text-md text-[var(--secondary-dark)]">{item.answer}</p>
        </div>
      ) : null}
    </div>
  );
}

function FAQGroup({ label, items }: { label: string; items: FAQItem[] }) {
  return (
    <div className="pb-16">
      <h3 className="text-md text-[var(--secondary-dark)] md:pb-6 md:px-6">
        {label}
      </h3>
      <div>
        {items.map((item) => (
          <FAQItemRow key={item.question} item={item} />
        ))}
      </div>
    </div>
  );
}

export function JoinUsFAQ({ className }: { className?: string }) {
  return (
    <section
      id="join-us-faq"
      aria-label="Frequently asked questions"
      className={cn(
        "bg-[var(--background)] -mb-8 md:mb-0 px-8 pt-24 md:pb-24",
        className,
      )}
    >
      <div className="grid w-full grid-cols-12 gap-0">
        <h2 className="col-span-12 text-xxl lowercase text-[var(--bp-blue)] pb-12">
          FAQ
        </h2>

        <div className="col-span-12 md:col-span-8">
          <FAQGroup label="Application process" items={APPLICATION_FAQ} />
          <FAQGroup label="About our team" items={TEAM_FAQ} />
        </div>
      </div>
    </section>
  );
}
