import React from "react";
import styles from "../styles/pages/Nonprofits.module.scss";
import { HStack, VStack } from "../components/common/Layout";
import Button from "../components/common/Button";

import Image from "next/image";

import styled from "styled-components";

import landingSplash from "@public/nonprofits/nonprofits-landing-bg.svg";

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
                    <LandingContent>
                        <LandingTitle>For Nonprofits</LandingTitle>
                        <LandingText>
                            We're a group of University of Waterloo students
                            that solve technical problems for nonprofit
                            organizations - all free of charge.
                        </LandingText>
                        <div style={{ padding: "25px 0" }}>
                            <Button type="primaryDark" to="/contact">
                                Contact Us
                            </Button>
                        </div>
                    </LandingContent>
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
                                        <h6>
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
                                        <h6>
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
                                        <h6>
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
            </Container>
        </div>
        // <div style={{ position: 'absolute', top: 100, left: 50 }} className="nonprofits">

        //   <div>
        //     <Image src={landingSplash} layout="fill" />
        //   </div>
        //   {' '}
        //   For nonprofits
        // </div>
    );
}
