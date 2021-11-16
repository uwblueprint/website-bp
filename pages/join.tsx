import React from "react";

import { HStack, VStack } from "../components/common/Layout";
import Button from "../components/common/Button";
import ControlledAccordions from "../components/common/Accordion";

import Image from "next/image";

import styled from "styled-components";

const landingSplash = "/join/join-landing-background.svg";
const lookGraphic = "/join/join-look-graphic.svg";
const landingGraphic = "/join/join-landing-graphic.svg";
const joinCarousel = "/join/join-carousel-photo-2.png";

const applicationFaq = [
    {
        question: "CAN I APPLY IF I DON’T GO TO UWATERLOO?",
        ans: "We plan to have our project lead and the nonprofit meet on a weekly or biweekly basis, depending on the flexibility of both parties, to sync up and discuss progress.",
    },
    {
        question: "CAN I BE A PART OF BLUEPRINT WHILE ON A WORK TERM?",
        ans: "Yes, we are happy to take students on both academic and work terms.",
    },
    {
        question:
            "I DON’T HAVE A LOT OF DEV OR DESIGN EXPERIENCE, SHOULD I STILL APPLY?",
        ans: "Yes! Blueprint is a great way to gain more experience as you will be surrounded by a community of peers with varying expertise in different fields, who can support you with mentorship. We care more about your drive to learn, and your passion for social good.",
    },
    {
        question: "CAN I BE A PART OF BLUEPRINT IF I’M NOT IN WATERLOO?",
        ans: "UW Blueprint will be fully remote in Winter 2021 so we're open to students joining our team from anywhere in the world. That being said, our meetings will usually be scheduled to accommodate people based in Waterloo (EST).",
    },
];

const links = {
    Facebook: (
        <a href="https://www.facebook.com/uwblueprint/" target="_blank">
            Facebook
        </a>
    ),
    Instagram: (
        <a href="https://www.instagram.com/uwblueprint/" target="_blank">
            Instagram
        </a>
    ),
    Medium: (
        <a href="https://uwblueprint.medium.com/" target="_blank">
            Medium
        </a>
    ),
};

const ColoredDate = styled.span`
    color: ${(props) => props.theme.colors.B10};
`;

const dates = {
    applicationOpen: <ColoredDate>Mar 6 2021 00:00:00 EST</ColoredDate>,
    applicationClose: <ColoredDate>Mar 19 2021 23:59:59 EDT.</ColoredDate>,
    invite: <ColoredDate>Mar 23</ColoredDate>,
    decision: <ColoredDate>Mar 19 2021 23:59:59 EDT.</ColoredDate>,
};

const aboutOurTeam = [
    {
        title: "LEARN ABOUT BLUEPRINT",
        descripton: (
            <p>
                Check out our current projects and team on our{" "}
                {links["Facebook"]}, {links["Instagram"]} and {links["Medium"]}
                .",
            </p>
        ),
    },
    {
        title: "SUBMIT YOUR APPLICATION",
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
        title: "CHAT WITH US",
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
        title: "FINAL DECISION",
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

const WhyJoinDescription = styled.p`
    padding: 10px 0px;
`;

const WhyJoinTitle = styled.h6`
    color: ${(props) => props.theme.colors.B10};
    font-weight: 600;
`;

const WhyJoinExplanation = styled.p`
    padding: 5px 0px 10px 0px;
    width: 75%;
`;

const DecisionCriteriaDescription = styled.p`
    padding: 10px 0px;
`;

const DecisionCriteriaTitle = styled.h6`
    color: ${(props) => props.theme.colors.B10};
    font-weight: 600;
`;

const DecisionCriteriaExplanation = styled.p`
    padding: 5px 0px 10px 0px;
    width: 75%;
`;

const ContactUsDescription = styled.h4`
    // color: ${(props) => props.theme.colors.B10};
    font-weight: 600;
`;

const InactivePhaseDiv = styled.div`
    padding: 20px 0 15px 0;
    color: ${(props) => props.theme.colors.B50};
`;

const ActivePhaseDiv = styled.div`
    backgroundcolor: "black";
    padding: 20px 0 15px 0;
    color: ${(props) => props.theme.colors.B10};
`;

// const ProcessHandoffBlock = styled.div`
//     color: "black";
// `;

export default function Nonprofits() {
    //Temporary inline styling. Should be changed when real code is added
    return (
        <div>
            <Container>
                <Section>
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            // TODO: Look into sizes prop to change width depending on screen size
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
                            <LandingTitle>Join our Team</LandingTitle>
                            <LandingText>
                                We are a group of friendly folks at the
                                University of Waterloo dedicated to building
                                technology for social good.
                            </LandingText>
                            {/* TODO: Seems to be used more than once this page */}
                            <div style={{ padding: "25px 0" }}>
                                <Button type="secondaryLight" to="/contact">
                                    Apply Now
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
                                <SectionTitle>Why join?</SectionTitle>
                                {[
                                    {
                                        title: "MAKE A MEANINGFUL IMPACT",
                                        description:
                                            "We work with NPOs on causes we are passionate about and create solutions that amplify their positive impact in our community.",
                                    },
                                    {
                                        title: "JOIN OUR COMMUNITY",
                                        description:
                                            "We develop meaningful relationships that extend beyond the scope of the projects we work on. We value time spent together, celebrate our differences, and have a lot of fun.",
                                    },
                                    {
                                        title: "LEVEL UP!",
                                        description:
                                            "We value the technical, social, and personal growth of our peers. Our strong culture of mentorship perpetuates a cycle of non-stop teaching and learning.",
                                    },
                                ].map((e) => {
                                    return (
                                        <div>
                                            <WhyJoinTitle>
                                                {e.title}
                                            </WhyJoinTitle>
                                            <WhyJoinDescription>
                                                {e.description}
                                            </WhyJoinDescription>
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
                                <SectionTitle>What we look for</SectionTitle>
                                {[
                                    {
                                        title: "PASSION FOR SOCIAL GOOD",
                                        description:
                                            "How passionate are you about working for social good? Do you have prior volunteering experience? Is there a specific project for social good that you are particularly interested in?",
                                    },
                                    {
                                        title: "DRIVE TO LEARN",
                                        description:
                                            "Are you willing to learn new things, both technically and in terms of social good? Do you like to challenge yourself with problems that you've never solved before?",
                                    },
                                    {
                                        title: "TECHNICAL FIT",
                                        description:
                                            "Do you have experience that is relevant to the type of projects we work on? If not, are you technically capable of learning to make sure you can make significant contributions?",
                                    },
                                    {
                                        title: "TEAM PLAYER",
                                        description:
                                            "Do you enjoy collaborating and learning with others? Do you value others' perspectives and experiences?",
                                    },
                                ].map((e) => {
                                    return (
                                        <div>
                                            <WhyJoinTitle>
                                                {e.title}
                                            </WhyJoinTitle>
                                            <WhyJoinDescription>
                                                {e.description}
                                            </WhyJoinDescription>
                                        </div>
                                    );
                                })}
                            </VStack>
                        </HStack>
                    </SectionContent>
                </Section>
                <Section>
                    <SectionContent>
                        <SectionTitle>What we can do for you</SectionTitle>
                        <HStack>
                            {aboutOurTeam.map((e, idx) => {
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
                        <SectionTitle>FAQ</SectionTitle>
                        <HStack>
                            <FaqHeader>APPLICATION PROCESS</FaqHeader>
                            <FaqAccordion>
                                <ControlledAccordions data={applicationFaq} />
                            </FaqAccordion>
                        </HStack>
                        <HStack>
                            <FaqHeader>ABOUT OUR TEAM</FaqHeader>
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
