import type { Metadata } from "next";

import { JoinUsFAQ } from "@/components/sections/JoinUsFAQ";
import { JoinUsHero } from "@/components/sections/JoinUsHero";
import { OurProcess, type ProcessStep } from "@/components/sections/OurProcess";
import { TeamPhotos } from "@/components/sections/TeamPhotos";
import { WhatWeLookFor } from "@/components/sections/WhatWeLookFor";
import { WhyJoin } from "@/components/sections/WhyJoin";
import { SlimBanner } from "@/components/ui/SlimBanner";
import { APPLICATION_CLOSE_DATETIME, APPLICATION_OPEN_DATETIME, APPLICATION_TERM, FINAL_DECISION_DATE, INVITE_DATE } from "@constants/applications";

export const metadata: Metadata = {
  title: "Join our team",
};

const JOIN_PROCESS_STEPS: ProcessStep[] = [
  {
    index: "01",
    title: "Learn about Blueprint",
    description:
      "Check out our projects, come to events, talk with the team and view our open ",
    descriptionLink: {
      href: "/roles",
      label: "roles",
      suffix: ".",
    },
  },
  {
    index: "02",
    title: "Submit your application",
    description:
      `Tell us about yourself and why you're interested in joining Blueprint. We take a great amount of care to review every application, so please be as detailed as possible. If we think you might be a good fit, we will send you an invite to have a coffee chat with us! Applications open ${APPLICATION_OPEN_DATETIME.format("MMM D, YYYY h:mm A")} and close ${APPLICATION_CLOSE_DATETIME.format("MMM D, YYYY h:mm A")}.`,
  },
  {
    index: "03",
    title: "Interview with us",
    description:
      `Let's talk! Invites will be sent out by ${INVITE_DATE} to schedule a time in the following week for us to connect. During these chats, you'll have a casual conversation with a couple of our members. You can use this time to ask us any questions you might have, and we can get to know each other better! We'll also use some of this time for role-specific technical questions.`,
  },
  {
    index: "04",
    title: "Final decision",
    description:
      `We'll let you know our final decision around ${FINAL_DECISION_DATE}. If you get an offer to join us for ${APPLICATION_TERM}, we'd appreciate it if you replied as soon as possible to let us know if you'd like to accept! Once you've confirmed, we'll get you started with onboarding just before the term officially begins.`,
  },
];

export default function JoinUsPage() {
  return (
    <main>
      <JoinUsHero />
      <WhyJoin />
      <TeamPhotos />
      <WhatWeLookFor />

      <SlimBanner
        mode="light"
        text="psst... we receive a lot of applications. Being authentic, engaging and showing a history of commitment is a great way to stand out."
      />

      <OurProcess
        id="join-us-process"
        ariaLabel="Our application process"
        heading="our process"
        topRightDecoration={
          <div className="hidden xl:block w-[min(46vw,504px)] max-w-[90%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/illos/book.svg"
              alt=""
              className="h-auto w-full object-contain opacity-90"
              aria-hidden
              decoding="async"
            />
          </div>
        }
        steps={JOIN_PROCESS_STEPS}
      />
      <JoinUsFAQ />
    </main>
  );
}
