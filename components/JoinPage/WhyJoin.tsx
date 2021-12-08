import React from "react";
import styled from "styled-components";

import { HStack, VStack } from "@components/Layout";
import { SectionTitle } from "components/common/Typography";

const Description = styled.p`
  padding: 10px 0px;
`;

const Title = styled.h6`
  color: ${(props) => props.theme.colors.B10};
  font-weight: 600;
`;

const whyJoinData = [
  {
    title: "MAKE A MEANINGFUL IMPACT",
    description:
      "We work with NPOs on causes we are passionate about and create solutions that amplify their positive impact in our community.",
  },
  {
    title: "JOIN OUR COMMUNITY",
    description:
      "We develop meaningful relationships that extend beyond the scope of the projects we work on. We value time spent together, celebrate our differences, and have a lot of fun.",
  },
  {
    title: "LEVEL UP!",
    description:
      "We value the technical, social, and personal growth of our peers. Our strong culture of mentorship perpetuates a cycle of non-stop teaching and learning.",
  },
];

export const WhyJoin: React.FC = () => {
  return (
    <>
      <HStack>
        <VStack>
          <SectionTitle>Why join?</SectionTitle>
          {whyJoinData.map((e) => {
            return (
              <div>
                <Title>{e.title}</Title>
                <Description>{e.description}</Description>
              </div>
            );
          })}
        </VStack>
      </HStack>
    </>
  );
};
