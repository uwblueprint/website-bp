import React from "react";

import resource from "../common/resource";

import { HStack, VStack } from "../components/common/Layout";
import Button from "../components/common/Button";
import ControlledAccordions from "../components/common/Accordion";
import Links from "../components/common/Links";

import Image from "next/image";
import styled from "styled-components";

const landingSplash = "/join/join-landing-background.svg";
const lookGraphic = "/join/join-look-graphic.svg";
const landingGraphic = "/join/join-landing-graphic.svg";
const joinCarousel = "/join/join-carousel-photo-2.png";

const whyJoinData = [
    {
        title: resource.JOIN_WHY_JOIN_T1,
        description: resource.JOIN_WHY_JOIN_D1,
    },
    {
        title: resource.JOIN_WHY_JOIN_T2,
        description: resource.JOIN_WHY_JOIN_D2,
    },
    {
        title: resource.JOIN_WHY_JOIN_T3,
        description: resource.JOIN_WHY_JOIN_D3,
    },
];

const applicationFaq = [
    {
        question: resource.JOIN_APP_PROCESS_Q1,
        ans: resource.JOIN_ABOUT_OUR_TEAM_A1,
    },
    {
        question: resource.JOIN_ABOUT_OUR_TEAM_Q2,
        ans: resource.JOIN_ABOUT_OUR_TEAM_A2,
    },
    {
        question: resource.JOIN_ABOUT_OUR_TEAM_Q3,
        ans: resource.JOIN_ABOUT_OUR_TEAM_A3,
    },
    {
        question: resource.JOIN_ABOUT_OUR_TEAM_Q4,
        ans: resource.JOIN_ABOUT_OUR_TEAM_A4,
    },
];

const aboutOurTeam = [
    {
        question: resource.JOIN_ABOUT_OUR_TEAM_Q1,
        ans: resource.JOIN_ABOUT_OUR_TEAM_A1,
    },
    {
        question: resource.JOIN_ABOUT_OUR_TEAM_Q2,
        ans: resource.JOIN_ABOUT_OUR_TEAM_A2,
    },
    {
        question: resource.JOIN_ABOUT_OUR_TEAM_Q3,
        ans: resource.JOIN_ABOUT_OUR_TEAM_A3,
    },
    {
        question: resource.JOIN_ABOUT_OUR_TEAM_Q4,
        ans: resource.JOIN_ABOUT_OUR_TEAM_A4,
    },
];

const ColoredDate = styled.span`
    color: ${(props) => props.theme.colors.B10};
`;

const dates = {
    applicationOpen: <ColoredDate>Mar 6 2021 00:00:00 EST</ColoredDate>,
    applicationClose: <ColoredDate>Mar 19 2021 23:59:59 EDT.</ColoredDate>,
    invite: <ColoredDate>Mar 23</ColoredDate>,
    decision: <ColoredDate>Mar 19 2021 23:59:59 EDT.</ColoredDate>,
};

const teamFitData = [
    {
        title: resource.JOIN_WHAT_WE_LOOK_FOR_T1,
        description: <p>{resource.JOIN_WHAT_WE_LOOK_FOR_D1}</p>,
    },
    {
        title: resource.JOIN_WHAT_WE_LOOK_FOR_T2,
        description: <p>{resource.JOIN_WHAT_WE_LOOK_FOR_D2}</p>,
    },
    {
        title: resource.JOIN_WHAT_WE_LOOK_FOR_T3,
        description: <p>{resource.JOIN_WHAT_WE_LOOK_FOR_D3}</p>,
    },
    {
        title: resource.JOIN_WHAT_WE_LOOK_FOR_T4,
        description: <p>{resource.JOIN_WHAT_WE_LOOK_FOR_D4}</p>,
    },
];

const processData = [
    {
        title: resource.JOIN_PROCESS_DATA_T1,
        descripton: (
            <p>
                Check out our current projects and team on our{" "}
                {Links["Facebook"]}, {Links["Instagram"]} and {Links["Medium"]}
                .",
            </p>
        ),
    },
    {
        title: resource.JOIN_PROCESS_DATA_T2,
        descripton: (
            <p>
                Tell us a little bit about yourself and why you're interested in
                joining Blueprint. We make sure to go through every application
                thoroughly. If we think you might be a good fit, we will extend
                you an invite to a coffee chat! Applications open{" "}
                {dates["applicationOpen"]} and close {dates["applicationClose"]}
            </p>
        ),
    },
    {
        title: resource.JOIN_PROCESS_DATA_T3,
        descripton: (
            <p>
                Let's chat! We'll send out invites on {dates["invite"]}, to
                schedule a time for us to connect. These chats will take place
                over the upcoming week, and will be a casual conversation
                between you and a couple of our members. We want to learn more
                about you, and you can also use this time to ask us any
                questions you might have!
            </p>
        ),
    },
    {
        title: resource.JOIN_PROCESS_DATA_T4,
        descripton: (
            <p>
                We will get back to you by {dates["decision"]} to let you know
                our final decision. If we feel you’d be a good fit for the team,
                we would love for you to join! Get back to us as soon as
                possible regarding whether you would like to be part of our team
                next term, so we can get started with onboarding.
            </p>
        ),
    },
];

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

const LandingContent = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 225px 0 225px 225px;
`;

const SectionContent = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0px 225px;
`;

const LandingTitle = styled.h2`
    color: #ffffff;
`;

const LandingText = styled.h6`
    color: #ffffff;
    width: 25vw;
`;

const SectionTitle = styled.h2`
    color: ${(props) => props.theme.colors.B10};
    padding: 25px 0;
`;

const FaqAccordion = styled.div`
    float: right;
    padding: 0 0 25px 0;
    width: 50vw;
`;

const FaqHeader = styled.h6`
    color: ${(props) => props.theme.colors.B10};
    font-weight: 600;
    width: 25%;
`;

const Description = styled.p`
    padding: 10px 0px;
`;

const Title = styled.h6`
    color: ${(props) => props.theme.colors.B10};
    font-weight: 600;
`;

const SplashImageWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 658;
    zindex: -1;
`;

export default function Nonprofits() {
    //Temporary inline styling. Should be changed when real code is added
    return (
        <div>
            <title>{resource.TITLE_JOIN}</title>
            <Container>
                <Section>
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 658,
                            zIndex: -1,
                        }}
                    >
                        <Image
                            src={landingSplash}
                            layout="fill"
                            objectFit="cover"
                            priority
                        />
                    </div>
                    <HStack>
                        <LandingContent>
                            <LandingTitle>
                                {resource.JOIN_LANDING_TITLE}
                            </LandingTitle>
                            <LandingText>
                                {resource.JOIN_LANDING_TEXT}
                            </LandingText>
                            {/* TODO: Seems to be used more than once this page */}
                            <div style={{ padding: "25px 0" }}>
                                <Button type="secondaryLight" to="/contact">
                                    {resource.JOIN_APPLY_NOW}
                                </Button>
                            </div>
                        </LandingContent>
                        <Image
                            src={landingGraphic}
                            width="1000vw"
                            height="750vh"
                        />
                    </HStack>
                </Section>
                <Section>
                    <SectionContent>
                        <HStack>
                            {/* <Image
                                src={criteriaGraphic}
                                width="1200vw"
                                height="500vh"
                                layout="fixed"
                                /> */}
                            <VStack>
                                <SectionTitle>
                                    {resource.JOIN_WHY_JOIN_TITLE}
                                </SectionTitle>
                                {whyJoinData.map((e) => {
                                    return (
                                        <div>
                                            <Title>{e.title}</Title>
                                            <Description>
                                                {e.description}
                                            </Description>
                                        </div>
                                    );
                                })}
                            </VStack>
                        </HStack>
                    </SectionContent>
                </Section>
                <Section>
                    <CenterImage>
                        <Image
                            src={joinCarousel}
                            width="1081vw"
                            height="443vh"
                        />
                    </CenterImage>
                </Section>
                <Section>
                    <SectionContent>
                        <HStack>
                            <Image
                                src={lookGraphic}
                                width="1200vw"
                                height="500vh"
                                layout="fixed"
                            />
                            <VStack>
                                <SectionTitle>
                                    {resource.JOIN_WHAT_WE_LOOK_FOR_TITLE}
                                </SectionTitle>
                                {teamFitData.map((e) => {
                                    return (
                                        <div>
                                            <Title>{e.title}</Title>
                                            <Description>
                                                {e.description}
                                            </Description>
                                        </div>
                                    );
                                })}
                            </VStack>
                        </HStack>
                    </SectionContent>
                </Section>
                <Section>
                    <SectionContent>
                        <SectionTitle>
                            {resource.JOIN_WHAT_WE_CAN_DO_FOR_YOU_TITLE}
                        </SectionTitle>
                        <HStack>
                            {processData.map((e, idx) => {
                                return (
                                    <div
                                        style={{
                                            width: "25%",
                                            padding: "25px",
                                        }}
                                    >
                                        <VStack>
                                            <div>
                                                <SectionTitle>
                                                    {idx + 1}
                                                </SectionTitle>
                                            </div>
                                            <div>
                                                <h6 style={{ fontWeight: 600 }}>
                                                    {e.title}
                                                </h6>
                                                <p>{e.descripton}</p>
                                            </div>
                                        </VStack>
                                    </div>
                                );
                            })}
                        </HStack>
                    </SectionContent>
                </Section>
                <Section>
                    <SectionContent>
                        <SectionTitle>{resource.JOIN_FAQ_TITLE}</SectionTitle>
                        <HStack>
                            <FaqHeader>
                                {resource.JOIN_FAQ_APPLICATION_PROCESS}
                            </FaqHeader>
                            <FaqAccordion>
                                <ControlledAccordions data={applicationFaq} />
                            </FaqAccordion>
                        </HStack>
                        <HStack>
                            <FaqHeader>
                                {resource.JOIN_FAQ_ABOUT_OUR_TEAM}
                            </FaqHeader>
                            <FaqAccordion>
                                <ControlledAccordions data={aboutOurTeam} />
                            </FaqAccordion>
                        </HStack>
                    </SectionContent>
                </Section>
            </Container>
        </div>
    );
}
