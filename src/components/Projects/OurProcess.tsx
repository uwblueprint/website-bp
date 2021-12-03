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
  },
  {
    title: "PHASE TWO",
    explanation: "Building the Minimum Viable Product (MVP)",
  },
  {
    title: "PHASE THREE",
    explanation: "User Testing",
  },
  {
    title: "PHASE THREE",
    explanation: "Product polish and hand-off",
  },
];

const InactivePhaseDiv = styled.div`
  padding: 20px 0 15px 0;
  color: ${(props) => props.theme.colors.B50};
`;

const ActivePhaseDiv = styled.div`
  backgroundcolor: "black";
  padding: 20px 0 15px 0;
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
  return (
    <>
      <SectionTitle>Our Process</SectionTitle>
      <HStack>
        <ProcessLeftSection>
          <VStack>
            {processData.map((data, idx) => {
              return idx < 3 ? (
                <InactivePhaseDiv>
                  <h4>{data.title}</h4>
                  <h6>{data.explanation}</h6>
                </InactivePhaseDiv>
              ) : (
                <ActivePhaseDiv>
                  <h4>{data.title}</h4>
                  <h6>{data.explanation}</h6>
                </ActivePhaseDiv>
              );
            })}
          </VStack>
        </ProcessLeftSection>
        <ProcessContent>
          <HStack>
            <ProcessContentSection>
              <ProcessContentTitle>
                Product polish and hand-off
              </ProcessContentTitle>
              <p>
                The last phase involves intensive development. We make
                improvements on the product based on the feedback received from
                user testing. This phase is designed to completely finish the
                product so that it is ready to be delivered to the nonprofit.
                Upon completion, we meet with the nonprofit to hand off the
                product and to figure out how maintenance of the product is to
                be handled.
              </p>
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
