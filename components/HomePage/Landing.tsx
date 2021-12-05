import React from "react";
import Button from "@components/common/Button";
import styled from "styled-components";

import { HStack } from "components/Layout";
import { Logo } from "components/common/blueprint-logo/BlueprintLogo";

const LandingContainer = styled.div`
  height: 1024px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LandingLogo = styled(Logo)`
    width: 57px; !important
    height: 59px; !important
`;

const LandingTitle = styled.h2`
  color: ${(props) => props.theme.colors.C00};
  font-weight: 600;
  font-size: 58px;
`;

const LandingText = styled.h4`
  color: ${(props) => props.theme.colors.C00};
  font-weight: 400;
  font-family: Source Sans Pro;
  margin-bottom: 20px;
`;

export const Landing: React.FC = () => {
  return (
    <>
      <LandingContainer>
        <LandingTitle>
          {" "}
          <LandingLogo /> blueprint
        </LandingTitle>
        <LandingText>tech for social good. built by students.</LandingText>
        <HStack>
          <Button variant="secondary" invert>
            See our work
          </Button>
          <Button variant="secondary" invert href="/join">
            Join our team
          </Button>
        </HStack>
      </LandingContainer>
    </>
  );
};
