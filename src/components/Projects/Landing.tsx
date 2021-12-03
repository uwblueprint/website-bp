import React from "react";
import Image from "next/image";
import { CenteredHStack, HStack } from "components/common/Layout";
import styled from "styled-components";
import Button from "components/common/Button";

const landingGraphic = "/projects/projects-landing-graphics.svg";

const LandingContent = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 225px;
`;

const LandingTitle = styled.h2`
  color: ${(props) => props.theme.colors.C00};
`;

const LandingText = styled.h5`
  color: ${(props) => props.theme.colors.C00};
  font-family: Source Sans Pro; // TODO: is it bad to set it specifically like this
  width: 25vw;
`;

const ButtonContainer = styled.div`
  padding: 25px 0;
`;

const ButtonText = styled.p`
  color: ${(props) => props.theme.colors.B10};
`;

export const Landing: React.FC = () => {
  return (
    <>
      <HStack>
        <LandingContent>
          <LandingTitle>Projects</LandingTitle>
          <LandingText>
            All of Blueprint's work is open source because we believe in
            building technology that makes us more open and connected.
          </LandingText>
          <ButtonContainer>
            {/* TODO: Change text to blue */}
            <Button type="primaryLight" to="/contact">
              Apply to be our next Nonprofit partner!
            </Button>
          </ButtonContainer>
        </LandingContent>
        <Image src={landingGraphic} width="2000vw" height="1000vh" />
      </HStack>
    </>
  );
};
