import React from "react";
import Head from "next/head";

import styled from "styled-components";

import { Landing } from "@components/Projects/Landing";
import { HighlightedProjects } from "@components/Projects/HighlightedProjects";

const Container = styled.div`
  width: 100vw;
`;

const Section = styled.div`
  width: 100%;
  height: 100vh;
`;

const LandingSection = styled(Section)`
  background: ${(p) => p.theme.colors.B10};
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
        <LandingSection>
          <Landing />
        </LandingSection>
        <Section>
          <HighlightedProjects />
        </Section>
      </Container>
    </div>
  );
}
