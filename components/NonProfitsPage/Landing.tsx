import React from "react";
import Image from "next/image";
import { HStack } from "components/common/Layout";
import styled from "styled-components";
import Button from "@components/common/Button";

const landingSplash = "/nonprofits/nonprofits-landing-bg.svg";
const landingHeroes = "/nonprofits/nonprofits-landing-graphic.svg";

const LandingContent = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 225px;
`;

const LandingTitle = styled.h2`
  color: ${(props) => props.theme.colors.B10};
`;

const LandingText = styled.h5`
  color: ${(props) => props.theme.colors.B10};
  width: 25vw;
`;

const ButtonContainer = styled.div`
  padding: 25px 0;
`;

export const Landing: React.FC = () => {
  return (
    <>
      {/*  Unable to use styled component as it removes the image being wrapped */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          // TODO: Look into sizes prop to change width depending on screen size
          height: 509,
          zIndex: -1,
        }}
      >
        <Image src={landingSplash} layout="fill" objectFit="cover" priority />
      </div>
      <HStack>
        <LandingContent>
          <LandingTitle>For Nonprofits</LandingTitle>
          <LandingText>
            We're a group of University of Waterloo students that solve
            technical problems for nonprofit organizations - all free of charge.
          </LandingText>
          <ButtonContainer>
            <Button href="/contact">Contact us!</Button>
          </ButtonContainer>
        </LandingContent>
        <Image src={landingHeroes} width="2000vw" height="1000vh" />
      </HStack>
    </>
  );
};
