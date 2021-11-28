import React from "react";
import Image from "next/image";
import styled from "styled-components";

import { HStack, VStack } from "components/common/Layout";
import { SectionTitle } from "components/common/Typography";

const criteriaGraphic = "/nonprofits/nonprofits-criteria-graphic.svg";

const criterion = [
  {
    title: "1. IMPACT",
    explanation:
      "How much will the project impact the community? We prefer projects that will provide the maximal benefit to the target community.",
  },
  {
    title: "2. NECESSITY",
    explanation:
      "How vital is the project to the non-profit organization, and does the organization have other means to complete the project? We want to ensure that we are helping organizations that truly need our services.",
  },
  {
    title: "3. SCOPE",
    explanation:
      "Is completing the project feasible within our timeline? We want to ensure that we can finish the project and deliver quality results within a reasonable time.",
  },
  {
    title: "4. TECHNICAL FIT",
    explanation:
      "Does your project use the capabilities of technology? Does it fit well with our team's areas of expertise?",
  },
  {
    title: "5. CREDIBILITY",
    explanation:
      "Is it clear that the project will have an impact? We like to see evidence that supports this! We also prefer to work with non-profits that have a proven track record of doing good.",
  },
];

const DecisionCriteriaDescription = styled.p`
  padding: 10px 0px;
`;

const DecisionCriteriaTitle = styled.h6`
  color: ${(props) => props.theme.colors.B10};
  font-weight: 600;
`;

const DecisionCriteriaExplanation = styled.p`
  padding: 5px 0px 10px 0px;
  width: 75%;
`;

export const DecisionCriteria: React.FC = () => {
  return (
    <>
      <SectionTitle>Decision Criteria</SectionTitle>
      <HStack>
        {/* <div style={{position: "relative"}}> Figure out how to do this image */}
        <Image
          src={criteriaGraphic}
          width="1200vw"
          height="500vh"
          layout="fixed"
        />
        {/* </div> */}
        <VStack>
          <DecisionCriteriaDescription>
            These are the primary criteria we use to determine project fit:
          </DecisionCriteriaDescription>
          {criterion.map((data) => {
            return (
              <div>
                <DecisionCriteriaTitle>{data.title}</DecisionCriteriaTitle>
                <DecisionCriteriaExplanation>
                  {data.explanation}
                </DecisionCriteriaExplanation>
              </div>
            );
          })}
        </VStack>
      </HStack>
    </>
  );
};
