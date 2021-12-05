import React from "react";

import ControlledAccordions from "components/common/Accordion";
import { SectionTitle } from "components/common/Typography";

const faq = [
  {
    question: "HOW OFTEN DO PROJECT TEAMS AND NONPROFITS MEET?",
    ans: "We plan to have our project lead and the nonprofit meet on a weekly or biweekly basis, depending on the flexibility of both parties, to sync up and discuss progress.",
  },
  {
    question: "WHAT IS THE CLIENT-TEAM INTERACTION LIKE?",
    ans: "The team works alongside the client's vision for the organization. We hope that our project has significant impact on the organization's efficiency and reach, so the alignment of goals is crucial. At our meetings, we discuss updates on project features, check the timeline, and have discussion on the progress of the project and the nonprofit itself.",
  },
  {
    question: "HOW DOES BLUEPRINT ENSURE SUCCESS?",
    ans: "We recruit the brightest and most hard-working students at the University of Waterloo to work with nonprofits and deliver high quality products. Everyone is dedicated to helping nonprofit organizations and motivated by the impact of their work. We make a commitment to excellence and deliver our best work when it comes to working with nonprofits and their projects. We are supported by Techyon and Cal Blueprint.",
  },
];

export const FAQ: React.FC = () => {
  return (
    <>
      <SectionTitle>FAQ</SectionTitle>
      <ControlledAccordions data={faq} />
    </>
  );
};
