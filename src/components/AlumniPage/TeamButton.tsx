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

export const TeamButton: React.FC = () => {
  return (
    <HStack>
      <VStack>
        <SectionTitle>Team</SectionTitle>
        <Description>Go back to our current members page.</Description>
        <ButtonContainer>
          <Button type="primaryDark" to="/students">
            View Blueprint team
          </Button>
        </ButtonContainer>
      </VStack>
    </HStack>
  );
};
