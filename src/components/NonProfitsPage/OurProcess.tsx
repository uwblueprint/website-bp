import React from "react";
import Image from "next/image";
import styled from "styled-components";

import { HStack, VStack } from "components/common/Layout";
import { SectionTitle } from "components/common/Typography";

const criteriaGraphic = "/nonprofits/nonprofits-criteria-graphic.svg";

const processData = [
  {
    title: "PHASE ONE",
    explanation: "Nonprofit/team lead project discussion",
    expansion:
      "We work with the nonprofit tos understand the project in great depth and scope out the minimum viable product (MVP). Once we agree on the MVP, the project lead will write up a statement of work to be shared with the nonprofit.",
  },
  {
    title: "PHASE TWO",
    explanation: "Building the Minimum Viable Product (MVP)",
    expansion:
      "During this phase, we work hard to get the MVP up and running. We will consistently stay in touch with the nonprofit to ensure that the development phase goes smoothly and to also make sure that we are always in sync with the nonprofit.",
  },
  {
    title: "PHASE THREE",
    explanation: "User Testing",
    expansion:
      "During this phase, we release the MVP to see how the product is received. Any critical problems that break the product are fixed immediately. Additionally, we will take note of any bugs, UX issues, and feature requests during this time.",
  },
  {
    title: "PHASE THREE",
    explanation: "Product polish and hand-off",
    expansion:
      "The last phase involves intensive development. We make improvements on the product based on the feedback received from user testing. This phase is designed to completely finish the product so that it is ready to be delivered to the nonprofit. Upon completion, we meet with the nonprofit to hand off the product and to figure out how maintenance of the product is to be handled.",
  },
];

const PhaseDiv = styled.div`
  padding: 20px 0 15px 0;

  transition: transform 0.3s ease;

  :hover {
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 2px;
    transform: translateY(-5px);
    cursor: pointer;
  }
`;

const InactivePhaseDiv = styled(PhaseDiv)`
  color: ${(props) => props.theme.colors.B50};
`;

const ActivePhaseDiv = styled(PhaseDiv)`
  backgroundcolor: "black";
  color: ${(props) => props.theme.colors.B10};
`;

const ProcessContent = styled.div`
  backgroundcolor: #e0f0ff;
  borderradius: 20px;
  padding: 50px;
  margin: 10px;
  width: 35vw;
`;

const ProcessContentTitle = styled.h6`
  color: ${(props) => props.theme.colors.B10};
  font-weight: 600;
`;

const ProcessContentSection = styled.div`
  width: 250px;
`;

const ProcessLeftSection = styled.div`
  width: 100%;
`;

export const OurProcess: React.FC = () => {
  const [focused, setFocused] = React.useState(0);

  return (
    <>
      <SectionTitle>Our Process</SectionTitle>
      <HStack>
        <ProcessLeftSection>
          <VStack>
            {processData.map((data, idx) => {
              return idx == focused ? (
                <ActivePhaseDiv onClick={() => setFocused(idx)}>
                  <h4>{data.title}</h4>
                  <h6>{data.explanation}</h6>
                </ActivePhaseDiv>
              ) : (
                <InactivePhaseDiv onClick={() => setFocused(idx)}>
                  <h4>{data.title}</h4>
                  <h6>{data.explanation}</h6>
                </InactivePhaseDiv>
              );
            })}
          </VStack>
        </ProcessLeftSection>
        <ProcessContent>
          <HStack>
            <ProcessContentSection>
              <ProcessContentTitle>
                {processData[focused].explanation}
              </ProcessContentTitle>
              <p>{processData[focused].expansion}</p>
            </ProcessContentSection>
            <Image
              src={criteriaGraphic}
              width="250px"
              height="250px"
              layout="fixed"
            />
          </HStack>
        </ProcessContent>
      </HStack>
    </>
  );
};
