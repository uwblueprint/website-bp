import React from "react";
import Head from "next/head";
import { AlumniLanding } from "@components/AlumniPage/AlumniLanding";
import { AlumniBlurb } from "@components/AlumniPage/AlumniBlurb";

import Image from "next/image";

import styled from "styled-components";
import { TeamButton } from "@components/AlumniPage/TeamButton";

const teamLeftGear = "/alumni/alumni-team-bgleft.svg";
const teamRightLines = "/alumni/alumni-team-bgright.svg";

const CenterImage = styled.div`
  // width: 50%;
  text-align: center;
  margin: 0 auto;
`;

const Container = styled.div`
  width: 100vw;
  // display: flex;
  // flex-direction: column;
`;

const Section = styled.div`
  // position: relative;
  // margin: auto;
  // box-sizing: border-box;
  // overflow-x: hidden;
  width: 100%;
  height: 100vh;
`;

const SectionContent = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 225px;
`;

export default function Alumni(): JSX.Element {
  //Temporary inline styling. Should be changed when real code is added
  return (
    <div>
      <Head>
        <title>UW Blueprint {"|"} Alumni</title>
      </Head>
      <Container>
        <Section>
          <AlumniLanding />
        </Section>
        <Section>
          <SectionContent>
            <AlumniBlurb />
          </SectionContent>
        </Section>
        <Section>
          <SectionContent>
            <TeamButton />
          </SectionContent>
        </Section>
        {/*<Section>
            <CenterImage>
              <Image src={joinCarousel} width="1081vw" height="443vh" />
            </CenterImage>
          </Section>
          <Section>
            <SectionContent>
              <FAQ />
            </SectionContent>
          </Section> */}
      </Container>
    </div>
  );
}
