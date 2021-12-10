import React from "react";
import Image from "next/image";
import styled from "styled-components";

import { HStack } from "components/Layout";

const landingSplashBackground = "/students/students-landing-bg.svg";
const landingGraphic = "/students/students-landing-graphic.svg";

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

export const StudentsLanding: React.FC = () => {
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
        <Image
          src={landingSplashBackground}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <HStack>
        <LandingContent>
          <LandingTitle>Students</LandingTitle>
          <LandingText>
            Meet Blueprint - we're a diverse group of friendly folks at the
            University of Waterloo dedicated to building tech for social good.
          </LandingText>
        </LandingContent>
        <Image src={landingGraphic} width="800vw" height="600vh" />
      </HStack>
    </>
  );
};
