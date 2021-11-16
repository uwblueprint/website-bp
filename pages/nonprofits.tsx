import React from "react";
import styles from "../styles/pages/Nonprofits.module.scss";
import { HStack, VStack } from "../components/common/Layout";
import Button from "../components/common/Button";
import ControlledAccordions from "../components/common/Accordion";
import resource from "../common/resource";

import Image from "next/image";

import styled from "styled-components";

const landingSplash = "/nonprofits/nonprofits-landing-bg.svg";
const criteriaGraphic = "/nonprofits/nonprofits-criteria-graphic.svg";
const landingHeroes = "/nonprofits/nonprofits-landing-graphic.svg";
const contactsGraphic = "/nonprofits/nonprofits-contact-graphic.svg";
// import processHandoff from "nonprofits/nonprofits-process-handoff.png";

const faq = [
    {
        question: resource.NONPROFIT_FAQ_Q1,
        ans: resource.NONPROFIT_FAQ_A1,
    },
    {
        question: resource.NONPROFIT_FAQ_Q2,
        ans: resource.NONPROFIT_FAQ_A2,
    },
    {
        question: resource.NONPROFIT_FAQ_Q3,
        ans: resource.NONPROFIT_FAQ_A3,
    },
];

const criterion = [
    {
        title: resource.NONPROFIT_CRITERION_T1,
        explanation: resource.NONPROFIT_CRITERION_D1,
    },
    {
        title: resource.NONPROFIT_CRITERION_T2,
        explanation: resource.NONPROFIT_CRITERION_D2,
    },
    {
        title: resource.NONPROFIT_CRITERION_T3,
        explanation: resource.NONPROFIT_CRITERION_D3,
    },
    {
        title: resource.NONPROFIT_CRITERION_T4,
        explanation: resource.NONPROFIT_CRITERION_D4,
    },
    {
        title: resource.NONPROFIT_CRITERION_T5,
        explanation: resource.NONPROFIT_CRITERION_D5,
    },
];

const processData = [
    {
        title: resource.NONPROFIT_PROCESS_P1,
        explanation: resource.NONPROFIT_PROCESS_T1,
    },
    {
        title: resource.NONPROFIT_PROCESS_P2,
        explanation: resource.NONPROFIT_PROCESS_T2,
    },
    {
        title: resource.NONPROFIT_PROCESS_P3,
        explanation: resource.NONPROFIT_PROCESS_T3,
    },
    {
        title: resource.NONPROFIT_PROCESS_P4,
        explanation: resource.NONPROFIT_PROCESS_T4,
    },
];

const whatWeCanDoData = [
    {
        title: resource.NONPROFIT_WHAT_WE_CAN_DO_T1,
        explanation: resource.NONPROFIT_WHAT_WE_CAN_DO_D1,
    },
    {
        title: resource.NONPROFIT_WHAT_WE_CAN_DO_T2,
        explanation: resource.NONPROFIT_WHAT_WE_CAN_DO_D2,
    },
    {
        title: resource.NONPROFIT_WHAT_WE_CAN_DO_T3,
        explanation: resource.NONPROFIT_WHAT_WE_CAN_DO_D3,
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
const LandingText = styled.p`
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
            <title>{resource.TITLE_NON_PROFITS}</title>
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
                            <LandingTitle>
                                {resource.NONPROFIT_LANDING_TITLE}
                            </LandingTitle>
                            <LandingText>
                                {resource.NONPROFIT_LANDING_TEXT}
                            </LandingText>
                            {/* TODO: Seems to be used more than once this page */}
                            <div style={{ padding: "25px 0" }}>
                                <Button type="primaryDark" to="/contact">
                                    {resource.CONTACT_TITLE}
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
                        <LandingTitle>
                            {resource.NONPROFIT_WHAT_WE_CAN_DO_TITLE}
                        </LandingTitle>
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
                        <LandingTitle>
                            {resource.NONPROFIT_PROCESS_TITLE}
                        </LandingTitle>
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
                                            {resource.NONPROFIT_PROCESS_T4}
                                        </h5>
                                        <p>{resource.NONPROFIT_PROCESS_D4}</p>
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
                        <LandingTitle>
                            {resource.NONPROFIT_DECISION_CRITERIA_TITLE}
                        </LandingTitle>
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
                                    {resource.NONPROFIT_DECISION_CRITERIA_DESC}
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
                                    {resource.NONPROFIT_CONTACT_US_DESC}
                                </ContactUsDescription>
                                <div style={{ padding: "25px 0" }}>
                                    <Button type="primaryDark" to="/contact">
                                        {resource.NONPROFIT_CONTACT_US_BUTTON}
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
                        <LandingTitle>
                            {resource.NONPROFIT_FAQ_TITLE}
                        </LandingTitle>
                        <ControlledAccordions data={faq} />
                    </SectionContent>
                </Section>
            </Container>
        </div>
    );
}
