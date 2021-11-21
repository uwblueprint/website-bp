import React from "react";
import styled from "styled-components";

import { HowItWorksGraphic } from "components/common/landing-page/HowItWorksGraphics";
import { SectionTitle } from "components/common/Typography";
import { VStack, HStack } from "components/Layout";

const SectionLine = styled.hr`
  width: 15%;
  margin: auto;
  border-color: ${(props) => props.theme.colors.B10};
  border-style: solid;
  margin-top: 15px;
`;

const VerticalLine = styled.hr`
  height: 120px; // TODO: make not px
  border-color: ${(props) => props.theme.colors.B10};
  border-style: solid;
  margin: 30px;
`;

const HowItWorksContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 180px;
`;

const HowItWorksSubSectionTitle = styled.h3`
  color: ${(props) => props.theme.colors.B10};
  text-align: center;
`;

const HowItWorksSubtitle = styled.h6`
  color: ${(props) => props.theme.colors.B10};
  text-align: center;
  margin-top: 25px;
`;

const HowItWorksHStack = styled(HStack)`
  width: 75%;
`;

const HowItWorksParagraph = styled.p`
  color: ${(props) => props.theme.colors.C70};
  text-align: center;
  margin-top: 4px;
`;

const HowItWorksLearnMore = styled.p`
  color: ${(props) => props.theme.colors.B10};
  text-align: center;
  margin-top: 18px;
  font-weight: 800;
`;

const HowItWorksGraphicContainer = styled.div`
  margin-top: 30px;
`;

export const HowItWorks: React.FC = () => {
  return (
    <>
      <HowItWorksContainer>
        <SectionTitle>How It Works</SectionTitle>
        <SectionLine />
        <HowItWorksGraphicContainer>
          <HowItWorksGraphic />
        </HowItWorksGraphicContainer>
        <HowItWorksHStack>
          <VStack>
            <HowItWorksSubSectionTitle>
              Student Volunteers
            </HowItWorksSubSectionTitle>
            <SectionLine />
            <HowItWorksSubtitle>
              HAVE A PASSION FOR SOCIAL GOOD?
            </HowItWorksSubtitle>
            <HowItWorksParagraph>
              Volunteer and grow your skills at UW Blueprint! Join a talented
              and vibrant community while creating technological solutions that
              make a real world impact. Student applications open at the end of
              each term.
            </HowItWorksParagraph>
            <HowItWorksLearnMore>Learn More {">"}</HowItWorksLearnMore>
          </VStack>
          <VerticalLine />
          <VStack>
            <HowItWorksSubSectionTitle>
              Non Profit Partners
            </HowItWorksSubSectionTitle>
            <SectionLine />
            <HowItWorksSubtitle>LET'S BUILD SOMETHING GREAT</HowItWorksSubtitle>
            <HowItWorksParagraph>
              Whether you have a project idea or you don’t know where to start,
              our team of experienced Product Mangers, Designers, and Developers
              will be there every step of the way. Contact us to chat!
            </HowItWorksParagraph>
            <HowItWorksLearnMore>Learn More {">"}</HowItWorksLearnMore>
          </VStack>
        </HowItWorksHStack>
      </HowItWorksContainer>
    </>
  );
};
