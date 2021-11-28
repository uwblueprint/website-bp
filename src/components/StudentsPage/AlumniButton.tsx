import React from "react";
import { HStack, VStack } from "components/common/Layout";
import styled from "styled-components";
import Button from "components/common/Button";
import { SectionTitle } from "components/common/Typography";

const Description = styled.p`
  font-size: 22px;
  padding: 12px 0px;
  line-height: 27.65px;
`;

const ButtonContainer = styled.div`
  padding: 25px 0;
`;

export const AlumniButton: React.FC = () => {
  return (
    <HStack>
      <VStack>
        <SectionTitle>Alumni</SectionTitle>
        <Description>
          Special thanks to all of our alumni who have given their time and
          effort to our cause for social good. We couldn't have done it without
          you!
        </Description>
        <ButtonContainer>
          <Button type="primaryDark" to="/alumni">
            View Blueprint Alumni
          </Button>
        </ButtonContainer>
      </VStack>
    </HStack>
  );
};
