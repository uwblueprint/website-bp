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
    padding: 225px;
`;

const SectionContent = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0px 225px;
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
                                {resource.NAVBAR_NON_PROFITS}
                            </LandingTitle>
                            <LandingText>
                                We're a group of University of Waterloo students
                                that solve technical problems for nonprofit
                                organizations - all free of charge.
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
                        <LandingTitle>What we can do for you</LandingTitle>
                        <HStack>
                            <VStack>
                                <HStack>
                                    <div style={{ padding: "25px" }}>
                                        <LandingTitle>1</LandingTitle>
                                    </div>
                                    <div style={{ padding: "25px" }}>
                                        <h6 style={{ fontWeight: 600 }}>
                                            HELP YOU DETERMINE WHERE YOU CAN USE
                                            OUR SERVICES
                                        </h6>
                                        <p style={{ width: "75%" }}>
                                            We understand that sometimes it’s
                                            challenging to identify where you
                                            can make the best use of a
                                            technology solution. Our process
                                            begins with several scoping calls to
                                            determine what the best solution for
                                            your organization.
                                        </p>
                                    </div>
                                </HStack>
                                <HStack>
                                    <div style={{ padding: "25px" }}>
                                        <LandingTitle>2</LandingTitle>
                                    </div>
                                    <div style={{ padding: "25px" }}>
                                        <h6 style={{ fontWeight: 600 }}>
                                            SPEARHEAD THE PROJECT WITH CLEAR
                                            COMMUNICATION
                                        </h6>
                                        <p style={{ width: "75%" }}>
                                            Our skillful students have
                                            experience as Product Managers,
                                            developers, designers, and technical
                                            leaders at companies including
                                            Facebook, Google and Shopify. Our
                                            team will get the job done with
                                            minimal hand holding, so you can
                                            focus on doing what you do best:
                                            serving your clients.
                                        </p>
                                    </div>
                                </HStack>
                                <HStack>
                                    <div style={{ padding: "25px" }}>
                                        <LandingTitle>3</LandingTitle>
                                    </div>
                                    <div style={{ padding: "25px" }}>
                                        <h6 style={{ fontWeight: 600 }}>
                                            DELIVER HIGH QUALITY SOFTWARE
                                            SOLUTIONS
                                        </h6>
                                        <p style={{ width: "75%" }}>
                                            Whether an application, website
                                            redesign or designing a more
                                            efficient system, our team delivers
                                            innovative and high quality
                                            products. We also ensure that your
                                            team is provided with the necessary
                                            training to maintain the solutions
                                            we build with you.
                                        </p>
                                    </div>
                                </HStack>
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
                                    {[
                                        [
                                            "PHASE ONE",
                                            "Nonprofit/team lead project discussion",
                                        ],
                                        [
                                            "PHASE TWO",
                                            "Building the Minimum Viable Product (MVP)",
                                        ],
                                        ["PHASE THREE", "User Testing"],
                                        [
                                            "PHASE FOUR",
                                            "Product polish and hand-off",
                                        ],
                                    ].map((e, idx) => {
                                        return idx < 3 ? (
                                            <InactivePhaseDiv>
                                                <h4>{e[0]}</h4>
                                                <h6>{e[1]}</h6>
                                            </InactivePhaseDiv>
                                        ) : (
                                            <ActivePhaseDiv>
                                                <h4>{e[0]}</h4>
                                                <h6>{e[1]}</h6>
                                            </ActivePhaseDiv>
                                        );
                                    })}
                                </VStack>
                            </div>
                            <div
                                style={{
                                    backgroundColor: "#E0F0FF",
                                    borderRadius: "20px",
                                    padding: "50px",
                                    margin: "10px",
                                    width: "35vw",
                                }}
                            >
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
                            </div>
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
                                <div>
                                    <DecisionCriteriaTitle>
                                        1. IMPACT
                                    </DecisionCriteriaTitle>
                                    <DecisionCriteriaExplanation>
                                        How much will the project impact the
                                        community? We prefer projects that will
                                        provide the maximal benefit to the
                                        target community.
                                    </DecisionCriteriaExplanation>
                                </div>
                                <div>
                                    <DecisionCriteriaTitle>
                                        2. NECESSITY
                                    </DecisionCriteriaTitle>
                                    <DecisionCriteriaExplanation>
                                        How vital is the project to the
                                        non-profit organization, and does the
                                        organization have other means to
                                        complete the project? We want to ensure
                                        that we are helping organizations that
                                        truly need our services.
                                    </DecisionCriteriaExplanation>
                                </div>
                                <div>
                                    <DecisionCriteriaTitle>
                                        3. SCOPE
                                    </DecisionCriteriaTitle>
                                    <DecisionCriteriaExplanation>
                                        Is completing the project feasible
                                        within our timeline? We want to ensure
                                        that we can finish the project and
                                        deliver quality results within a
                                        reasonable time.
                                    </DecisionCriteriaExplanation>
                                </div>
                                <div>
                                    <DecisionCriteriaTitle>
                                        4. TECHNICAL FIT
                                    </DecisionCriteriaTitle>
                                    <DecisionCriteriaExplanation>
                                        Does your project use the capabilities
                                        of technology? Does it fit well with our
                                        team's areas of expertise?
                                    </DecisionCriteriaExplanation>
                                </div>
                                <div>
                                    <DecisionCriteriaTitle>
                                        5. CREDIBILITY
                                    </DecisionCriteriaTitle>
                                    <DecisionCriteriaExplanation>
                                        Is it clear that the project will have
                                        an impact? We like to see evidence that
                                        supports this! We also prefer to work
                                        with non-profits that have a proven
                                        track record of doing good.
                                    </DecisionCriteriaExplanation>
                                </div>
                            </VStack>
                        </HStack>
                    </SectionContent>
                </Section>
                <Section>
                    <SectionContent>
                        <HStack>
                            <VStack>
                                <ContactUsDescription>
                                    NEED HELP WITH YOUR NON PROFIT AND DO NOT
                                    KNOW WHERE TO START?
                                </ContactUsDescription>
                                <div style={{ padding: "25px 0" }}>
                                    <Button type="primaryDark" to="/contact">
                                        Contact Us
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
                        <LandingTitle>FAQ</LandingTitle>
                        <ControlledAccordions data={faq} />
                    </SectionContent>
                </Section>
            </Container>
        </div>
    );
}
