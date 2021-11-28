import React from "react";
import Head from "next/head";

import styled from "styled-components";

import { Landing } from "@components/NonProfitsPage/Landing";
import { WhatWeCanDo } from "@components/NonProfitsPage/WhatWeCanDo";
import { OurProcess } from "@components/NonProfitsPage/OurProcess";
import { DecisionCriteria } from "@components/NonProfitsPage/DecisionCriteria";
import { NeedHelp } from "@components/NonProfitsPage/NeedHelp";
import { FAQ } from "@components/NonProfitsPage/FAQ";

const Container = styled.div`
  width: 100vw;
`;

const Section = styled.div`
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
  return (
    <div>
      <Head>
        <title>UW Blueprint {"|"} Non-profits</title>
      </Head>
      <Container>
        <Section>
          <Landing />
        </Section>
        <Section>
          <SectionContent>
            <WhatWeCanDo />
          </SectionContent>
        </Section>
        <Section>
          <SectionContent>
            <OurProcess />
          </SectionContent>
        </Section>
        <Section>
          <SectionContent>
            <DecisionCriteria />
          </SectionContent>
        </Section>
        <Section>
          <SectionContent>
            <NeedHelp />
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
