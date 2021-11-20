import React from "react";
import Head from "next/head";
import styles from "../styles/pages/Nonprofits.module.scss";
import { HStack, VStack } from "../components/common/Layout";
import Button from "../components/common/Button";
import ControlledAccordions from "../components/common/Accordion";

import Image from "next/image";

import styled from "styled-components";

const landingSplash = "/nonprofits/nonprofits-landing-bg.svg";
const criteriaGraphic = "/nonprofits/nonprofits-criteria-graphic.svg";
const landingHeroes = "/nonprofits/nonprofits-landing-graphic.svg";
const contactsGraphic = "/nonprofits/nonprofits-contact-graphic.svg";
// import processHandoff from "nonprofits/nonprofits-process-handoff.png";

const faq = [
    {
        question: "HOW OFTEN DO PROJECT TEAMS AND NONPROFITS MEET?",
        ans: "We plan to have our project lead and the nonprofit meet on a weekly or biweekly basis, depending on the flexibility of both parties, to sync up and discuss progress.",
    },
    {
        question: "WHAT IS THE CLIENT-TEAM INTERACTION LIKE?",
        ans: "The team works alongside the client's vision for the organization. We hope that our project has significant impact on the organization's efficiency and reach, so the alignment of goals is crucial. At our meetings, we discuss updates on project features, check the timeline, and have discussion on the progress of the project and the nonprofit itself.",
    },
    {
        question: "HOW DOES BLUEPRINT ENSURE SUCCESS?",
        ans: "We recruit the brightest and most hard-working students at the University of Waterloo to work with nonprofits and deliver high quality products. Everyone is dedicated to helping nonprofit organizations and motivated by the impact of their work. We make a commitment to excellence and deliver our best work when it comes to working with nonprofits and their projects. We are supported by Techyon and Cal Blueprint.",
    },
];

const criterion = [
    {
        title: "1. IMPACT",
        explanation:
            "How much will the project impact the community? We prefer projects that will provide the maximal benefit to the target community.",
    },
    {
        title: "2. NECESSITY",
        explanation:
            "How vital is the project to the non-profit organization, and does the organization have other means to complete the project? We want to ensure that we are helping organizations that truly need our services.",
    },
    {
        title: "3. SCOPE",
        explanation:
            "Is completing the project feasible within our timeline? We want to ensure that we can finish the project and deliver quality results within a reasonable time.",
    },
    {
        title: "4. TECHNICAL FIT",
        explanation:
            "Does your project use the capabilities of technology? Does it fit well with our team's areas of expertise?",
    },
    {
        title: "5. CREDIBILITY",
        explanation:
            "Is it clear that the project will have an impact? We like to see evidence that supports this! We also prefer to work with non-profits that have a proven track record of doing good.",
    },
];

const processData = [
    {
        title: "PHASE ONE",
        explanation: "Nonprofit/team lead project discussion",
    },
    {
        title: "PHASE TWO",
        explanation: "Building the Minimum Viable Product (MVP)",
    },
    {
        title: "PHASE THREE",
        explanation: "User Testing",
    },
    {
        title: "PHASE THREE",
        explanation: "Product polish and hand-off",
    },
];

const whatWeCanDoData = [
    {
        title: "HELP YOU DETERMINE WHERE YOU CAN USE OUR SERVICES",
        explanation:
            "We understand that sometimes it’s challenging to identify where you can make the best use of a technology solution. Our process begins with several scoping calls to determine what the best solution for your organization.",
    },
    {
        title: "SPEARHEAD THE PROJECT WITH CLEAR COMMUNICATION",
        explanation:
            "Our skillful students have experience as Product Managers, developers, designers, and technical leaders at companies including Facebook, Google and Shopify. Our team will get the job done with minimal hand holding, so you can focus on doing what you do best: serving your clients.",
    },
    {
        title: "DELIVER HIGH QUALITY SOFTWARE SOLUTIONS",
        explanation:
            "Whether an application, website redesign or designing a more efficient system, our team delivers innovative and high quality products. We also ensure that your team is provided with the necessary training to maintain the solutions we build with you.",
    },
];

// TODO: make rsponsive
const Container = styled.div`
    width: 100vw;
`;

const Section = styled.div`
    width: 100%;
    height: 100vh;
`;

const LandingContent = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 225px;
`;

const SectionContent = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0px 225px;
`;

const ProcessContent = styled.div`
    backgroundcolor: #e0f0ff;
    borderradius: 20px;
    padding: 50px;
    margin: 10px;
    width: 35vw;
`;

const LandingTitle = styled.h2`
    color: ${(props) => props.theme.colors.B10};
`;
const LandingText = styled.h5`
    color: ${(props) => props.theme.colors.B10};
    width: 25vw;
`;

const SectionTitle = styled.h3`
    color: ${(props) => props.theme.colors.B10};
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

export default function Nonprofits() {
    //Temporary inline styling. Should be changed when real code is added
    return (
        <div>
            <Head>
                <title>UW Blueprint {"|"} Non-profits</title>
            </Head>
            <Container>
                <Section>
                    {/*  Unable to use styled component as it removes the image being wrapped */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            // TODO: Look into sizes prop to change width depending on screen size
                            height: 509,
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
                            <LandingTitle>For Nonprofits</LandingTitle>
                            <LandingText>
                                We're a group of University of Waterloo students
                                that solve technical problems for nonprofit
                                organizations - all free of charge.
                            </LandingText>
                            {/* TODO: Seems to be used more than once this page */}
                            <div style={{ padding: "25px 0" }}>
                                <Button type="primaryDark" to="/contact">
                                    Contact us!
                                </Button>
                            </div>
                        </LandingContent>
                        <Image
                            src={landingHeroes}
                            width="2000vw"
                            height="1000vh"
                        />
                    </HStack>
                </Section>
                <Section>
                    <SectionContent>
                        <LandingTitle>What we can do for you</LandingTitle>
                        <HStack>
                            <VStack>
                                {whatWeCanDoData.map((data, idx) => {
                                    return (
                                        <HStack>
                                            <div style={{ padding: "25px" }}>
                                                <LandingTitle>
                                                    {idx + 1}
                                                </LandingTitle>
                                            </div>
                                            <div style={{ padding: "25px" }}>
                                                <h6 style={{ fontWeight: 600 }}>
                                                    {data.title}
                                                </h6>
                                                <p style={{ width: "75%" }}>
                                                    {data.explanation}
                                                </p>
                                            </div>
                                        </HStack>
                                    );
                                })}
                            </VStack>
                        </HStack>
                    </SectionContent>
                </Section>
                <Section>
                    <SectionContent>
                        <LandingTitle>Our Process</LandingTitle>
                        <HStack>
                            <div style={{ width: "100%" }}>
                                <VStack>
                                    {processData.map((data, idx) => {
                                        return idx < 3 ? (
                                            <InactivePhaseDiv>
                                                <h4>{data.title}</h4>
                                                <h6>{data.explanation}</h6>
                                            </InactivePhaseDiv>
                                        ) : (
                                            <ActivePhaseDiv>
                                                <h4>{data.title}</h4>
                                                <h6>{data.explanation}</h6>
                                            </ActivePhaseDiv>
                                        );
                                    })}
                                </VStack>
                            </div>
                            <ProcessContent>
                                <HStack>
                                    <div style={{ width: "250px" }}>
                                        <h5
                                            style={{
                                                color: "#135FC5",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Product polish and hand-off
                                        </h5>
                                        <p>
                                            The last phase involves intensive
                                            development. We make improvements on
                                            the product based on the feedback
                                            received from user testing. This
                                            phase is designed to completely
                                            finish the product so that it is
                                            ready to be delivered to the
                                            nonprofit. Upon completion, we meet
                                            with the nonprofit to hand off the
                                            product and to figure out how
                                            maintenance of the product is to be
                                            handled.
                                        </p>
                                    </div>
                                    <Image
                                        src={criteriaGraphic}
                                        width="250px"
                                        height="250px"
                                        layout="fixed"
                                    />
                                </HStack>
                            </ProcessContent>
                        </HStack>
                    </SectionContent>
                </Section>
                <Section>
                    <SectionContent>
                        <LandingTitle>Decision Criteria</LandingTitle>
                        <HStack>
                            {/* <div style={{position: "relative"}}> Figure out how to do this image */}
                            <Image
                                src={criteriaGraphic}
                                width="1200vw"
                                height="500vh"
                                layout="fixed"
                            />
                            {/* </div> */}
                            <VStack>
                                <DecisionCriteriaDescription>
                                    These are the primary criteria we use to
                                    determine project fit:
                                </DecisionCriteriaDescription>
                                {criterion.map((data) => {
                                    return (
                                        <div>
                                            <DecisionCriteriaTitle>
                                                {data.title}
                                            </DecisionCriteriaTitle>
                                            <DecisionCriteriaExplanation>
                                                {data.explanation}
                                            </DecisionCriteriaExplanation>
                                        </div>
                                    );
                                })}
                            </VStack>
                        </HStack>
                    </SectionContent>
                </Section>
                <Section>
                    <SectionContent>
                        <HStack>
                            <VStack>
                                <ContactUsDescription>
                                    {
                                        "NEED HELP WITH YOUR NON PROFIT AND DO NOT KNOW WHERE TO START?"
                                    }
                                </ContactUsDescription>
                                <div style={{ padding: "25px 0" }}>
                                    <Button type="primaryDark" to="/contact">
                                        {"Contact Us"}
                                    </Button>
                                </div>
                            </VStack>
                            <Image
                                src={contactsGraphic}
                                width="2000vw"
                                height="1000vh"
                            />
                        </HStack>
                    </SectionContent>
                </Section>
                <Section>
                    <SectionContent>
                        <LandingTitle>{"FAQ"}</LandingTitle>
                        <ControlledAccordions data={faq} />
                    </SectionContent>
                </Section>
            </Container>
        </div>
    );
}
