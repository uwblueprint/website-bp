import React from "react";
import Button from "components/common/Button";
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

const LandingButton = styled(Button)`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 25px;
  padding-right: 25px;
  margin-right: 10px;
  margin-left: 10px;
  font-size: 14px;
  font-weight: 500;

  :hover {
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 2px;
  }
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
          <LandingButton type="secondaryLight" to="/join">
            See our work
          </LandingButton>
          <LandingButton type="secondaryLight" to="/join">
            Join our team
          </LandingButton>
        </HStack>
      </LandingContainer>
    </>
  );
};
