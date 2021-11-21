import React from "react";
import Links from "components/common/Links";
import styled from "styled-components";

import { HStack, VStack } from "components/Layout";
import { SectionTitle } from "components/common/Typography";

const ColoredDate = styled.span`
  color: ${(props) => props.theme.colors.B10};
`;

const dates = {
  applicationOpen: <ColoredDate>Mar 6 2021 00:00:00 EST</ColoredDate>,
  applicationClose: <ColoredDate>Mar 19 2021 23:59:59 EDT.</ColoredDate>,
  invite: <ColoredDate>Mar 23</ColoredDate>,
  decision: <ColoredDate>Mar 19 2021 23:59:59 EDT.</ColoredDate>,
};

const DoForYouSection = styled.div`
  width: 25%;
  padding: 25px;
`;

const DoForYouTitle = styled.h6`
  fontweight: 600;
`;

const processData = [
  {
    title: "LEARN ABOUT BLUEPRINT",
    descripton: (
      <p>
        Check out our current projects and team on our {Links["Facebook"]},{" "}
        {Links["Instagram"]} and {Links["Medium"]}
        .",
      </p>
    ),
  },
  {
    title: "SUBMIT YOUR APPLICATION",
    descripton: (
      <p>
        Tell us a little bit about yourself and why you're interested in joining
        Blueprint. We make sure to go through every application thoroughly. If
        we think you might be a good fit, we will extend you an invite to a
        coffee chat! Applications open {dates["applicationOpen"]} and close{" "}
        {dates["applicationClose"]}
      </p>
    ),
  },
  {
    title: "CHAT WITH US",
    descripton: (
      <p>
        Let's chat! We'll send out invites on {dates["invite"]}, to schedule a
        time for us to connect. These chats will take place over the upcoming
        week, and will be a casual conversation between you and a couple of our
        members. We want to learn more about you, and you can also use this time
        to ask us any questions you might have!
      </p>
    ),
  },
  {
    title: "FINAL DECISION",
    descripton: (
      <p>
        We will get back to you by {dates["decision"]} to let you know our final
        decision. If we feel you’d be a good fit for the team, we would love for
        you to join! Get back to us as soon as possible regarding whether you
        would like to be part of our team next term, so we can get started with
        onboarding.
      </p>
    ),
  },
];

export const DoForYou: React.FC = () => {
  return (
    <>
      <SectionTitle>What we can do for you</SectionTitle>
      <HStack>
        {processData.map((e, idx) => {
          return (
            <DoForYouSection>
              <VStack>
                <SectionTitle>{idx + 1}</SectionTitle>
                <DoForYouTitle>{e.title}</DoForYouTitle>
                <p>{e.descripton}</p>
              </VStack>
            </DoForYouSection>
          );
        })}
      </HStack>
    </>
  );
};
