import React from "react";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";

/* Assets */
// import landingImage from '../public/about/about-landing-photo.png';
// import semicircle from '../public/about/about-mission-semicircle.svg';
// import aboutGraphic from '../public/about/about-mission-graphic.png';

/* Styling */
const Section = styled.div`
    position: relative;
    margin: auto;
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
`;

const BackgroundWrap = styled.div`
    position: absolute;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    z-index: -1;
`;

const Header = styled.div`
    margin: 0;
    font-size: 48px;
    line-height: 87px;
    padding: 40vh 0 0 110px;
    font-weight: 500;
    color: ${(p) => p.theme.colors.C00};
`;

const Subheader = styled.div`
    margin: 0;
    font-size: 28px;
    line-height: 45px;
    padding: 10px 0 100px 110px;
    font-weight: 400;
    color: ${(p) => p.theme.colors.C00};
`;

const SemiWrapper = styled.div`
    width: 60%;
    margin-left: 20vw;
`;

const SectionHeaderContainer = styled.div`
    width: 100%;
    text-align: center;
    padding: 50px 0 100px 0;
`;

const SectionHeader = styled.p`
    font-size: 44px;
    weight: 600;
    //color: ${(p) => p.theme.colors.B10};
    padding: 15px 0;
`;

const MissionSubContainer = styled.div`
    width: 35%;
    margin: 0 auto;
    padding: 35px 0;
    font-style: italic;
    line-height: 30px;
`;

const AboutContainer = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: row;
`;

const AboutPictureWrap = styled.div`
    margin: 0 50px;
    max-width: 25vw;
`;

const SubSection = styled.div`
    padding: 20px 0;
    width: 60%;
`;

const SubTagline = styled.div`
    font-size: 18px;
    font-weight: 600;
    padding: 10px 0;
`;

const SubDescription = styled.div`
    font-weight: 400;
    font-size: 16px;
`;

export default function About() {
    return (
        <div>
            <Section>
                <div>
                    <BackgroundWrap>
                        {/* <Image src={landingImage} layout="responsive"></Image> */}
                    </BackgroundWrap>
                    <Header>About Us</Header>
                    <Subheader>
                        Making technology accessible and <br /> useful for those
                        who create <br /> communities.
                    </Subheader>
                </div>
            </Section>
            <Section>
                <BackgroundWrap>
                    <SemiWrapper>
                        {/* <Image src={semicircle} layout="intrinsic"></Image>	 */}
                    </SemiWrapper>
                </BackgroundWrap>
                <SectionHeaderContainer>
                    <SectionHeader>Our Mission</SectionHeader>
                    <MissionSubContainer>
                        Blueprint strives to make technology accessible and
                        useful for those who create communities and promote
                        public welfare.
                    </MissionSubContainer>
                </SectionHeaderContainer>
                <AboutContainer>
                    <AboutPictureWrap>
                        {/* <Image src={aboutGraphic} layout="intrinsic"/> */}
                    </AboutPictureWrap>
                    <div>
                        <SubSection>
                            <SectionHeader>Who we are</SectionHeader>
                            <SubTagline>Passionate to help.</SubTagline>
                            <SubDescription>
                                We are a group of students at the University of
                                Waterloo dedicated to building and promoting
                                technology for social good. Each term, teams of
                                five to twelve students work with non-profit
                                organizations on projects to help them better
                                serve their communities.
                            </SubDescription>
                            <div>Meet the team</div>
                        </SubSection>
                        <SubSection>
                            <SectionHeader>What we do</SectionHeader>
                            <SubTagline>
                                Amplifying the impact of solutions that matter.
                            </SubTagline>
                            <SubDescription>
                                We partner with non-profits to provide
                                technology services such as websites, mobile
                                applications and analysis tools - free of
                                charge.
                            </SubDescription>
                            <div>Meet the team</div>
                        </SubSection>
                        <SubSection>
                            <SectionHeader>Our Story</SectionHeader>
                            <SubTagline>
                                A community built across universities.
                            </SubTagline>
                            <SubDescription>
                                Blueprint was founded in 2012 at UC Berkeley.
                                The University of Waterloo is Blueprint's first
                                chapter outside of Berkeley.
                            </SubDescription>
                            <div>Meet the team</div>
                        </SubSection>
                    </div>
                </AboutContainer>
            </Section>
        </div>
    );
}
