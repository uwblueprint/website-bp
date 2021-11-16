import React from "react";
import Head from "next/head";
import Image from "next/image";
import Button from "../components/button/Button";
import ReactPlayer from "react-player";
import { VStack, HStack } from "../components/Layout";
import resource from "common/resource";

import styled from "styled-components";

// import { Header, Main, Cards, Footer } from "@components/css";
import { Logo, Name } from "../components/common/blueprint-logo/BlueprintLogo";
import {
    ImpactLeftGear,
    ImpactRightGear,
} from "components/common/landing-page/ImpactGraphics";
import {
    HowItWorksGraphic,
    HowItWorksBg1,
    HowItWorksBg2,
} from "components/common/landing-page/HowItWorksGraphics";
import {
    DemoLeftGear,
    DemoRightGear,
} from "../components/common/landing-page/DemoGraphics";
const landingSplash = "/home/home-landing-graphic.svg";
const landingWave = "/home/home-landing-wave.svg";

/* Styling */

const Container = styled.div`
    width: 100%;
    & > div.landingGraphicWrapper {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1024px;
        background-color: ${(props) => props.theme.colors.B10};
        z-index: -1;
    }

    & > div.impactLeftGearWrapper {
        position: absolute;
        top: 1024px;
        z-index: -1;
    }

    & > div.impactRightGearWrapper {
        position: absolute;
        top: 1225px;
        right: 0;
        z-index: -1;
    }

    & > div.howItWorksBg1Wrapper {
        position: absolute;
        top: 1800px;
        z-index: -1;
    }

    & > div.howItWorksBg2Wrapper {
        position: absolute;
        top: 2180px;
        z-index: -1;
    }

    & > div.demoLeftGearWrapper {
        position: absolute;
        top: 2700px;
        z-index: -1;
    }

    & > div.demoRightGearWrapper {
        position: absolute;
        top: 2330px;
        right: 0;
        z-index: -1;
    }
`;

const SectionTitle = styled.h2`
    color: ${(props) => props.theme.colors.B10};
    text-align: center;
`;

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

const LandingContainer = styled.div`
    height: 1024px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const LandingButton = styled(Button)`
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 25px;
    padding-right: 25px;
    margin-right: 10px;
    margin-left: 10px;
    font-size: 14px;
    font-weight: 500;

    :hover {
        text-decoration: underline;
        text-underline-offset: 4px;
        text-decoration-thickness: 2px;
    }
`;

const LandingLogo = styled(Logo)`
    width: 57px; !important
    height: 59px; !important
`;

const LandingTitle = styled.h2`
    color: ${(props) => props.theme.colors.C00};
    font-weight: 600;
    font-size: 58px;
`;

const LandingText = styled.h4`
    color: ${(props) => props.theme.colors.C00};
    font-weight: 400;
    font-family: Source Sans Pro;
    margin-bottom: 20px;
`;

const MissionContainer = styled.div`
    height: 270px;
    position: relative;
    display: flex;
    justify-content: center;
    & > div.landingWaveWrapper {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
        z-index: -1;
    }
`;

const MissionDescription = styled.h3`
    color: ${(props) => props.theme.colors.B10};
    text-align: center;
    width: 75%;
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
    color: #000000;
    text-align: center;
    margin-top: 4px;
`;

const HowItWorksLearnMore = styled.p`
    color: ${(props) => props.theme.colors.B10};
    text-align: center;
    margin-top: 18px;
    font-weight: 800;
`;

const DemoContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
    margin-bottom: 110px;
`;

const Home: React.FC = () => {
    return (
        <div>
            <Head>
                <title>{resource.HOME_TITLE}</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>
            <Container>
                <div className="landingGraphicWrapper">
                    <Image
                        src={landingSplash}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <LandingContainer>
                    <LandingTitle>
                        {" "}
                        <LandingLogo /> {resource.HOME_LANDING_TITLE}
                    </LandingTitle>
                    <LandingText>{resource.HOME_LANDING_TEXT}</LandingText>
                    <HStack>
                        <LandingButton type="secondaryLight" to="/join">
                            {resource.HOME_LANDING_SEE_OUR_WORK}
                        </LandingButton>
                        <LandingButton type="secondaryLight" to="/join">
                            {resource.HOME_LANDING_JOIN_OUR_TEAM}
                        </LandingButton>
                    </HStack>
                </LandingContainer>
                <div className="impactLeftGearWrapper">
                    <ImpactLeftGear />
                </div>
                <div className="impactRightGearWrapper">
                    <ImpactRightGear />
                </div>
                <MissionContainer>
                    <div className="landingWaveWrapper">
                        <Image
                            src={landingWave}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <MissionDescription>
                        {resource.HOME_MISSION_DESCRIPTION}
                    </MissionDescription>
                </MissionContainer>
                <ImpactContainer>
                    <SectionTitle>{resource.HOME_IMPACT_TITLE}</SectionTitle>
                    <SectionLine />
                    <ImpactStatContainer>
                        <ImpactStat>
                            <ImpactStatSmallNum>
                                {
                                    resource.HOME_IMPACT_NON_PROFIT_PROJECTS_NUMBER
                                }
                            </ImpactStatSmallNum>
                            <ImpactStatDescription>
                                {resource.HOME_IMPACT_NON_PROFIT_PROJECTS_TITLE}
                            </ImpactStatDescription>
                        </ImpactStat>
                        <ImpactStat>
                            <ImpactStatBigNum>
                                {resource.HOME_IMPACT_VOLUNTEER_HOURS_NUMBER}
                            </ImpactStatBigNum>
                            <ImpactStatDescription>
                                {resource.HOME_IMPACT_VOLUNTEER_HOURS_TITLE}
                            </ImpactStatDescription>
                        </ImpactStat>
                        <ImpactStat>
                            <ImpactStatSmallNum>
                                {resource.HOME_IMPACT_STUDENT_VOLUNTEERS_NUMBER}
                            </ImpactStatSmallNum>
                            <ImpactStatDescription>
                                {resource.HOME_IMPACT_STUDENT_VOLUNTEERS_TITLE}
                            </ImpactStatDescription>
                        </ImpactStat>
                    </ImpactStatContainer>
                </ImpactContainer>
                <div className="howItWorksBg1Wrapper">
                    <HowItWorksBg1 />
                </div>
                <div className="howItWorksBg2Wrapper">
                    <HowItWorksBg2 />
                </div>
                <HowItWorksContainer>
                    <SectionTitle>
                        {resource.HOME_HOW_IT_WORKS_TITLE}
                    </SectionTitle>
                    <SectionLine />
                    <div
                        style={{
                            marginTop: "30px",
                        }}
                    >
                        <HowItWorksGraphic />
                    </div>
                    <HowItWorksHStack>
                        <VStack>
                            <HowItWorksSubSectionTitle>
                                {resource.HOME_HOW_IT_WORKS_TEAM_TITLE}
                            </HowItWorksSubSectionTitle>
                            <SectionLine />
                            <HowItWorksSubtitle>
                                {resource.HOME_HOW_IT_WORKS_TEAM_SUBTITLE}
                            </HowItWorksSubtitle>
                            <HowItWorksParagraph>
                                {resource.HOME_HOW_IT_WORKS_TEAM_PARAGRAPH}
                            </HowItWorksParagraph>
                            <HowItWorksLearnMore>
                                {resource.HOME_HOW_LEARN_MORE}
                            </HowItWorksLearnMore>
                        </VStack>
                        <VerticalLine />
                        <VStack>
                            <HowItWorksSubSectionTitle>
                                {resource.HOME_HOW_IT_WORKS_NON_PROFIT_TITLE}
                            </HowItWorksSubSectionTitle>
                            <SectionLine />
                            <HowItWorksSubtitle>
                                {resource.HOME_HOW_IT_WORKS_NON_PROFIT_SUBTITLE}
                            </HowItWorksSubtitle>
                            <HowItWorksParagraph>
                                {
                                    resource.HOME_HOW_IT_WORKS_NON_PROFIT_PARAGRAPH
                                }
                            </HowItWorksParagraph>
                            <HowItWorksLearnMore>
                                {resource.HOME_HOW_LEARN_MORE}
                            </HowItWorksLearnMore>
                        </VStack>
                    </HowItWorksHStack>
                </HowItWorksContainer>
                <div className="demoLeftGearWrapper">
                    <DemoLeftGear />
                </div>
                <div className="demoRightGearWrapper">
                    <DemoRightGear />
                </div>
                <DemoContainer>
                    <ReactPlayer url="https://www.youtube.com/watch?v=Dunh20k7gYA" />
                </DemoContainer>
            </Container>
        </div>
    );
};

export default Home;
