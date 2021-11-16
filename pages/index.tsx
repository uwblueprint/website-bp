import React from "react";
import Head from "next/head";
import Image from "next/image";
import Button from "../components/button/Button";
import ReactPlayer from "react-player";
import { VStack, HStack } from "../components/Layout";

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
                <title>UW Blueprint</title>
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
                        <LandingLogo /> blueprint
                    </LandingTitle>
                    <LandingText>
                        tech for social good. built by students.
                    </LandingText>
                    <HStack>
                        <LandingButton type="secondaryLight" to="/join">
                            See our work
                        </LandingButton>
                        <LandingButton type="secondaryLight" to="/join">
                            Join our team
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
                        Blueprint strives to make technology accessible and
                        useful for those who create communities and promote
                        social good.
                    </MissionDescription>
                </MissionContainer>
                <ImpactContainer>
                    <SectionTitle>
                        Here's how we measure our impact
                    </SectionTitle>
                    <SectionLine />
                    <ImpactStatContainer>
                        <ImpactStat>
                            <ImpactStatSmallNum>22</ImpactStatSmallNum>
                            <ImpactStatDescription>
                                NON-PROFIT PROJECTS
                            </ImpactStatDescription>
                        </ImpactStat>
                        <ImpactStat>
                            <ImpactStatBigNum>70,000</ImpactStatBigNum>
                            <ImpactStatDescription>
                                ACCUMULATED VOLUNTEER HOURS
                            </ImpactStatDescription>
                        </ImpactStat>
                        <ImpactStat>
                            <ImpactStatSmallNum>468</ImpactStatSmallNum>
                            <ImpactStatDescription>
                                STUDENT VOLUNTEERS
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
                    <SectionTitle>How It Works</SectionTitle>
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
                                Student Volunteers
                            </HowItWorksSubSectionTitle>
                            <SectionLine />
                            <HowItWorksSubtitle>
                                HAVE A PASSION FOR SOCIAL GOOD?
                            </HowItWorksSubtitle>
                            <HowItWorksParagraph>
                                Volunteer and grow your skills at UW Blueprint!
                                Join a talented and vibrant community while
                                creating technological solutions that make a
                                real world impact. Student applications open at
                                the end of each term.
                            </HowItWorksParagraph>
                            <HowItWorksLearnMore>
                                Learn More {">"}
                            </HowItWorksLearnMore>
                        </VStack>
                        <VerticalLine />
                        <VStack>
                            <HowItWorksSubSectionTitle>
                                Non Profit Partners
                            </HowItWorksSubSectionTitle>
                            <SectionLine />
                            <HowItWorksSubtitle>
                                LET'S BUILD SOMETHING GREAT
                            </HowItWorksSubtitle>
                            <HowItWorksParagraph>
                                Whether you have a project idea or you don’t
                                know where to start, our team of experienced
                                Product Mangers, Designers, and Developers will
                                be there every step of the way. Contact us to
                                chat!
                            </HowItWorksParagraph>
                            <HowItWorksLearnMore>
                                Learn More {">"}
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
