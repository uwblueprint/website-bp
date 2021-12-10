import React from "react";
import Head from "next/head";
import { StudentsLanding } from "@components/StudentsPage/StudentsLanding";
import { MeetTheTeam } from "@components/StudentsPage/MeetTheTeam";

import Image from "next/image";

import styled from "styled-components";
import { AlumniButton } from "@components/StudentsPage/AlumniButton";

const teamLeftLines = "/students/students-team-bgleft.svg";
const teamLeftLightBulb = "/students/students-team-bgleftlow.svg";
const teamRightCircle = "/students/students-team-bgright.svg";

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

export default function Students(): JSX.Element {
  //Temporary inline styling. Should be changed when real code is added
  return (
    <div>
      <Head>
        <title>UW Blueprint {"|"} Students</title>
      </Head>
      <Container>
        <Section>
          <StudentsLanding />
        </Section>
        <Section>
          <SectionContent>
            <MeetTheTeam />
          </SectionContent>
        </Section>
        <Section>
          <SectionContent>
            <AlumniButton />
          </SectionContent>
        </Section>
        {/* <Section>
            <CenterImage>
              <Image src={joinCarousel} width="1081vw" height="443vh" />
            </CenterImage>
          </Section> */}
      </Container>
    </div>
  );
}
