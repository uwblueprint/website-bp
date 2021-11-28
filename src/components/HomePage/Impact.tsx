import React from "react";
import styled from "styled-components";

import { HStack } from "components/Layout";

const SectionLine = styled.hr`
  width: 15%;
  margin: auto;
  border-color: ${(props) => props.theme.colors.B10};
  border-style: solid;
  margin-top: 15px;
`;

const ImpactContainer = styled.div`
  margin-top: 95px;
`;

const ImpactStatContainer = styled(HStack)`
  justify-content: space-between;
  margin-top: 52px;
  padding-left: 10%;
  padding-right: 10%;
`;

const ImpactStat = styled.div`
  text-align: center;
  vertical-align: top;
`;

const ImpactStatBigNum = styled.h2`
  color: ${(props) => props.theme.colors.B10};
  font-size: 96px;
  line-height: 144px;
`;

const ImpactStatSmallNum = styled.h2`
  color: ${(props) => props.theme.colors.S40};
  font-size: 72px;
  line-height: 120px;
`;

const ImpactStatDescription = styled.h6`
  font-weight: 600;
`;

const SectionTitle = styled.h2`
  color: ${(props) => props.theme.colors.B10};
  text-align: center;
`;

export const Impact: React.FC = () => {
  return (
    <>
      <ImpactContainer>
        <SectionTitle>Here's how we measure our impact</SectionTitle>
        <SectionLine />
        <ImpactStatContainer>
          <ImpactStat>
            <ImpactStatSmallNum>22</ImpactStatSmallNum>
            <ImpactStatDescription>NON-PROFIT PROJECTS</ImpactStatDescription>
          </ImpactStat>
          <ImpactStat>
            <ImpactStatBigNum>70,000</ImpactStatBigNum>
            <ImpactStatDescription>
              ACCUMULATED VOLUNTEER HOURS
            </ImpactStatDescription>
          </ImpactStat>
          <ImpactStat>
            <ImpactStatSmallNum>468</ImpactStatSmallNum>
            <ImpactStatDescription>STUDENT VOLUNTEERS</ImpactStatDescription>
          </ImpactStat>
        </ImpactStatContainer>
      </ImpactContainer>
    </>
  );
};
