import React from "react";
import ControlledAccordions from "components/common/Accordion";
import styled from "styled-components";

import { HStack } from "@components/Layout";
import { SectionTitle } from "components/common/Typography";

const FaqAccordion = styled.div`
  float: right;
  padding: 0 0 25px 0;
  width: 50vw;
`;

const FaqHeader = styled.h6`
  color: ${(props) => props.theme.colors.B10};
  font-weight: 600;
  width: 25%;
`;

const applicationFaq = [
  {
    question: "CAN I APPLY IF I DON’T GO TO UWATERLOO?",
    ans: "If you’re a student at a university, and you will be in Waterloo, then you’re welcome to apply! However, we do give priority to UW students.",
  },
  {
    question: "CAN I BE A PART OF BLUEPRINT WHILE ON A WORK TERM?",
    ans: "Yes, we are happy to take students on both academic and work terms.",
  },
  {
    question:
      "I DON’T HAVE A LOT OF DEV OR DESIGN EXPERIENCE, SHOULD I STILL APPLY?",
    ans: "Yes! Blueprint is a great way to gain more experience as you will be surrounded by a community of peers with varying expertise in different fields, who can support you with mentorship. We care more about your drive to learn, and your passion for social good.",
  },
  {
    question: "CAN I BE A PART OF BLUEPRINT IF I’M NOT IN WATERLOO?",
    ans: "UW Blueprint will be operating on a remote first mindset in Winter 2022 so we're open to students joining our team from anywhere in the world. That being said, our meetings will usually be scheduled to accommodate people based in Waterloo (EST) and we will have occasional in-person events.",
  },
];

const aboutOurTeam = [
  {
    question: "HOW DO YOU CHOOSE PROJECTS?",
    ans: "We have an application portal on our website for nonprofits, and in addition, we also reach out to nonprofits chosen by our members. We set up calls with nonprofits and figure out whether their proposed project is a good fit for our team. Read more on our nonprofit page",
  },
  {
    question: "DO I GET TO CHOOSE WHAT PROJECT I WORK ON?",
    ans: "Before the term begins, our designers and developers have a chance to get to know the upcoming projects. They then fill out information about their skill set and preferences in our selection form so that Project Leads and Project Managers will choose their team accordingly. We try to make sure that most people get their first choice, but no guarantees can be made.",
  },
  {
    question: "HOW DOES MENTORSHIP WORK IN BLUEPRINT?",
    ans: "In our project teams, we look to ensure there is a good distribution in development experience. If you’re just starting out, you’ll always have someone you can turn to for help! We also have design meetings where designers can ask each other and the VP Design for feedback.",
  },
  {
    question: "WHAT'S THE TIME COMMITMENT? HOW MANY HOURS PER WEEK?",
    ans: "We would like Blueprint members to contribute around 10 hours per week. This is to ensure that we can deliver high-quality products to the organizations we partner with. We understand that it’s a big time commitment, and we would like you to make sure that your course load and extracurriculars allow for this type of commitment.",
  },
];

export const FAQ: React.FC = () => {
  return (
    <>
      <SectionTitle>FAQ</SectionTitle>
      <HStack>
        <FaqHeader>APPLICATION PROCESS</FaqHeader>
        <FaqAccordion>
          <ControlledAccordions data={applicationFaq} />
        </FaqAccordion>
      </HStack>
      <HStack>
        <FaqHeader>ABOUT OUR TEAM</FaqHeader>
        <FaqAccordion>
          <ControlledAccordions data={aboutOurTeam} />
        </FaqAccordion>
      </HStack>
    </>
  );
};
