import React from "react";
import styled from "styled-components";

import { HStack, VStack } from "components/Layout";
import { SectionTitle } from "components/common/Typography";

const Description = styled.p`
  font-size: 22px;
  padding: 12px 0px;
  line-height: 27.65px;
`;

export const MeetTheTeam: React.FC = () => {
  return (
    <>
      <HStack>
        <VStack>
          <SectionTitle>Meet the Team</SectionTitle>
          <Description>
            We are a diverse group of students specializing in a variety of
            disciplines, brought together by a common ambition to help
            non-profits with their technology needs.
          </Description>
        </VStack>
      </HStack>
    </>
  );
};
