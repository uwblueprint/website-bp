"use client";

import { Minus, Plus } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import * as React from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How often do project teams meet with the nonprofit?",
    answer:
      "Depending on the flexibility of both parties, our project team leads will set up either a weekly or biweekly cadence with the nonprofit to check in and discuss progress.",
  },
  {
    question: "What does the nonprofit-project team interaction look like?",
    answer:
      "Each project team is led by a pairing of technical lead(s) and product manager(s) who serve as the main point of contact between the nonprofit and Blueprint. Regular check-ins include progress updates, design reviews, and feedback sessions to ensure we're building exactly what you need.",
  },
  {
    question: "How does UW Blueprint ensure success?",
    answer:
      "We follow a structured development process with clearly defined milestones, regular stakeholder check-ins, and thorough quality assurance. Our scoping process helps us set realistic goals, and our experienced technical leads keep teams on track throughout the term.",
  },
  {
    question: "What type of services does UW Blueprint provide?",
    answer:
      "We primarily build custom web and mobile applications tailored to your nonprofit's needs. This includes full-stack development, UI/UX design, and deployment. We focus on creating tools that streamline your operations and amplify your impact.",
  },
  {
    question: "Do you need a project idea to work with Blueprint?",
    answer:
      "Not at all. You do not need a fully-formed project proposal before reaching out. Our scoping process is designed to help your team identify pain points, define a practical MVP, and shape the right project together.",
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
        <div id={id} className="md:px-6 pb-6">
          <p className="text-md text-[var(--secondary-dark)]">{item.answer}</p>
        </div>
      ) : null}
    </div>
  );
}

export function NonprofitsFAQ({ className }: { className?: string }) {
  return (
    <section
      id="nonprofits-faq"
      aria-label="Frequently asked questions"
      className={cn("bg-[var(--primary-light)] px-8 pt-24 md:pb-24", className)}
    >
      <div className="grid w-full grid-cols-12 gap-0">
        <h2 className="col-span-12 text-xxl lowercase text-[var(--bp-blue)] pb-8 md:pb-12">
          FAQ
        </h2>

        <div className="col-span-12 md:col-span-8">
          {FAQ_ITEMS.map((item) => (
            <FAQItemRow key={item.question} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
