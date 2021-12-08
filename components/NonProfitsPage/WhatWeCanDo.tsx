import React from "react";
import styled from "styled-components";

import { HStack, VStack } from "components/Layout";
import { SectionTitle } from "components/common/Typography";

const whatWeCanDoData = [
  {
    title: "HELP YOU DETERMINE WHERE YOU CAN USE OUR SERVICES",
    explanation:
      "We understand that sometimes it’s challenging to identify where you can make the best use of a technology solution. Our process begins with several scoping calls to determine what the best solution for your organization.",
  },
  {
    title: "SPEARHEAD THE PROJECT WITH CLEAR COMMUNICATION",
    explanation:
      "Our skillful students have experience as Product Managers, developers, designers, and technical leaders at companies including Facebook, Google and Shopify. Our team will get the job done with minimal hand holding, so you can focus on doing what you do best: serving your clients.",
  },
  {
    title: "DELIVER HIGH QUALITY SOFTWARE SOLUTIONS",
    explanation:
      "Whether an application, website redesign or designing a more efficient system, our team delivers innovative and high quality products. We also ensure that your team is provided with the necessary training to maintain the solutions we build with you.",
  },
];

const Title = styled.h2`
  color: ${(props) => props.theme.colors.B10};
`;

const SectionBox = styled.div`
  padding: 25px;
`;

const Subtitle = styled.h6`
  fontweight: 600;
`;

const Description = styled.p`
  width: 75%;
`;

export const WhatWeCanDo: React.FC = () => {
  return (
    <>
      <SectionTitle>What we can do for you</SectionTitle>
      <HStack>
        <VStack>
          {whatWeCanDoData.map((data, idx) => {
            return (
              <HStack>
                <SectionBox>
                  <Title>{idx + 1}</Title>
                </SectionBox>
                <SectionBox>
                  <Subtitle>{data.title}</Subtitle>
                  <Description>{data.explanation}</Description>
                </SectionBox>
              </HStack>
            );
          })}
        </VStack>
      </HStack>
    </>
  );
};
