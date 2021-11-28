import React from "react";
import Image from "next/image";
import Button from "components/common/Button";
import styled from "styled-components";

import { HStack } from "components/Layout";

const landingSplash = "/join/join-landing-background.svg";
const landingGraphic = "/join/join-landing-graphic.svg";

const LandingContent = styled.div`
  width: 50%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 225px 0 225px 225px;
`;

const LandingTitle = styled.h2`
  color: ${(props) => props.theme.colors.C00};
`;

const LandingText = styled.h5`
  color: ${(props) => props.theme.colors.C00};
  width: 25vw;
`;

const ButtonContainer = styled.div`
  padding: 25px 0;
`;

export const JoinOurTeam: React.FC = () => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 658,
          zIndex: -1,
        }}
      >
        <Image src={landingSplash} layout="fill" objectFit="cover" priority />
      </div>
      <HStack>
        <LandingContent>
          <LandingTitle>Join our Team</LandingTitle>
          <LandingText>
            We are a group of friendly folks at the University of Waterloo
            dedicated to building technology for social good.
          </LandingText>
          <ButtonContainer>
            <Button type="secondaryLight" to="/contact">
              Apply Now
            </Button>
          </ButtonContainer>
        </LandingContent>
        <Image src={landingGraphic} width="1000vw" height="750vh" />
      </HStack>
    </>
  );
};
