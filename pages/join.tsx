import React from "react";
import Head from "next/head";
import { JoinOurTeam } from "@components/JoinPage/JoinOurTeam";
import { WhyJoin } from "@components/JoinPage/WhyJoin";
import { WhatWeLookFor } from "@components/JoinPage/WhatWeLookFor";
import { OurProcess } from "@components/JoinPage/OurProcess";
import { FAQ } from "@components/JoinPage/FAQ";

import Image from "next/image";
import styled from "styled-components";

const joinCarousel = "/join/join-carousel-photo-2.png";

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

export default function Nonprofits(): JSX.Element {
  //Temporary inline styling. Should be changed when real code is added
  return (
    <div>
      <Head>
        <title>UW Blueprint {"|"} Join</title>
      </Head>
      <Container>
        <Section>
          <JoinOurTeam />
        </Section>
        <Section>
          <SectionContent>
            <WhyJoin />
          </SectionContent>
        </Section>
        <Section>
          <CenterImage>
            <Image src={joinCarousel} width="1081vw" height="443vh" />
          </CenterImage>
        </Section>
        <Section>
          <SectionContent>
            <WhatWeLookFor />
          </SectionContent>
        </Section>
        <Section>
          <SectionContent>
            <OurProcess />
          </SectionContent>
        </Section>
        <Section>
          <SectionContent>
            <FAQ />
          </SectionContent>
        </Section>
      </Container>
    </div>
  );
}
