import React from "react";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";

/* Assets */
const instagram = "/social/instagram.svg";
const facebook = "/social/facebook.svg";
const linkedin = "/social/linkedin.svg";
const medium = "/social/medium.svg";
const wavingGraphic = "/contact/contact-landing-hi.svg";

/* Styling */
const ContainerWrapper = styled.div`
    color: ${(p) => p.theme.colors.C00};
    background: ${(p) => p.theme.colors.B10};
    display: flex;
    height: 100vh;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 15%;
    margin-right: 15%;
    // @include respond(tab-port) {
    //   flex-direction: column;
    //   margin-left: 10px;
    //   margin-right: 10px;
    // }
    // @include respond(phone) {
    //   flex-direction: column;
    //   margin-left: 10px;
    //   margin-right: 10px;
    // }
`;

const LeftContainer = styled.div`
    margin-right: 15%;
    width: 50%;
    // @include respond(tab-port) {
    //   width: 100%;
    // }
    // @include respond(phone) {
    //   width: 100%;
    // }
`;

const RightContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Header = styled.h1`
    margin-bottom: 8%;
`;

const Description = styled.div`
    margin-bottom: 5%;
    font-weight: 200;
    font-size: 22px;
    line-height: 27.65px;
`;

const ImageContainer = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 5%;
    width: 80%;
`;

export default function Contact() {
    return (
        <div>
            <Head>
                <title>UW Blueprint {"|"} Contact Us</title>
            </Head>

            <ContainerWrapper>
                <Container>
                    <LeftContainer>
                        <Header>Contact us!</Header>
                        <Description>
                            Have a question? Interested in a potential project
                            but unsure what our team can help you with? Send us
                            an email or connect with us on our social media!
                        </Description>
                        <ImageContainer>
                            <Image
                                src={instagram}
                                width={40}
                                height={40}
                                alt="instagram"
                            />
                            <Image
                                src={facebook}
                                width={40}
                                height={40}
                                alt="facebook"
                            />
                            <Image
                                src={linkedin}
                                width={40}
                                height={40}
                                alt="linkedin"
                            />
                            <Image
                                src={medium}
                                width={40}
                                height={40}
                                alt="medium"
                            />
                        </ImageContainer>
                        <Description>info@uwblueprint.org</Description>
                    </LeftContainer>
                    <RightContainer>
                        <div>
                            <Image
                                src={wavingGraphic}
                                width={400}
                                height={400}
                                alt="illustration"
                            />
                        </div>
                    </RightContainer>
                </Container>
            </ContainerWrapper>
        </div>
    );
}
