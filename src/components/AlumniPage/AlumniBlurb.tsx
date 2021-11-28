import React from "react";
import styled from "styled-components";

import { HStack, VStack } from "components/Layout";
import { SectionTitle } from "components/common/Typography";

const Description = styled.p`
  font-size: 22px;
  padding: 12px 0px;
  line-height: 27.65px;
`;

export const AlumniBlurb: React.FC = () => {
  return (
    <>
      <HStack>
        <VStack>
          <SectionTitle>Alumni</SectionTitle>
          <Description>
            Special thanks to all of our alumni who have given their time and
            effort to our cause for social good. We couldn't have done it
            without you!
          </Description>
        </VStack>
      </HStack>
    </>
  );
};
