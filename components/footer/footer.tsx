import React from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import resource from "../../common/resource";

// Assets
import { Logo, Name } from "../common/blueprint-logo/BlueprintLogo";
const wavingGraphic = "/footer/footer-hi.svg";
const instagram = "/social/instagram.svg";
const facebook = "/social/facebook.svg";
const linkedin = "/social/linkedin.svg";
const medium = "/social/medium.svg";

const Desktop = styled.div`
    position: absolute;
    overflow: hidden;
    z-index: 100;
    display: flex; // have navbar elements line up horizontally
    width: 100%;
    min-height: 60px;
    ${(p) => p.theme.mediaQueries.desktop} {
        display: none;
    }
    background: ${(p) => p.theme.colors.B10};
    padding: 15px 0;
`;

const Wordmark = styled.div`
    position: absolute; //position logo
    display: block;
    margin-left: 30px;
    margin-top: 10px;
    cursor: pointer;
`;

const LeftContainer = styled.div`
    margin-top: 25px;
    margin-left: 80px;
    position: relative;
    display: inline-block;
`;

const Email = styled.h5`
    color: white;
    margin-bottom: 15px;
`;

const SocialContainer = styled.div`
    position: absolute;
    top: 47%;
    left: 35%;
`;

const ImageContainer = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 5%;
    width: 70%;
`;

const LinkContainer = styled.div`
    margin-top: 20px;
    margin-left: auto;
    margin-right: 80px;
    overflow: visible;
`;

const Links = styled.div`
    float: left;
    display: flex;
    flex-direction: column;
    line-height: 32px;
    margin-top: 10px; //margin spacing
    margin-left: 10px;
    margin-right: 40px;
    a {
        color: white;
        font-weight: 500;
    }
`;

const LinkElement = styled.div`
    transition: transform 0.3s ease;
    :hover {
        text-decoration: underline;
        text-underline-offset: 4px;
        text-decoration-thickness: 2px;
        transform: translateY(-1px);
        opacity: 80%;
        cursor: pointer;
    }
`;

const LinkHeader = styled.h5`
    line-height: 40px;
`;

const BottomContainer = styled.div`
    position: absolute;
    bottom: 0;
    color: white;
    width: 100%;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 30px;
`;

const Footer = () => {
    const navOptions = [
        {
            name: resource.FOOTER_ABOUT_US,
            children: [
                { name: resource.FOOTER_WHO_WE_ARE, link: "/" },
                { name: resource.FOOTER_WHAT_WE_DO, link: "/" },
                { name: resource.FOOTER_HISTORY, link: "/" },
                { name: resource.FOOTER_COMMUNITY, link: "/" },
                { name: resource.FOOTER_OUR_PROCESS, link: "/" },
            ],
            link: "/about",
        },
        {
            name: resource.FOOTER_PROJECTS,
            children: [
                { name: resource.FOOTER_FEATURED, link: "/" },
                { name: resource.FOOTER_CURRENT, link: "/" },
                { name: resource.FOOTER_ARCHIVE, link: "/" },
            ],
            link: "/projects",
        },
        {
            name: resource.FOOTER_STUDENTS,
            children: [
                { name: resource.FOOTER_MEET_THE_TEAM, link: "/" },
                { name: resource.FOOTER_ALUMNI, link: "/" },
            ],
            link: "/students",
        },
        {
            name: resource.FOOTER_JOIN_US,
            children: [
                { name: resource.FOOTER_WHY_JOIN, link: "/" },
                { name: resource.FOOTER_WHAT_WE_LOOK_FOR, link: "/" },
                { name: resource.FOOTER_APP_PROCESS, link: "/" },
                { name: resource.FOOTER_TEAM_FAQ, link: "/" },
                { name: resource.FOOTER_TEAM_APPLY, link: "/" },
            ],
            link: "/join",
        },
        {
            name: resource.FOOTER_NON_PROFITS,
            children: [
                { name: resource.FOOTER_OUR_SERVICES, link: "/" },
                { name: resource.FOOTER_DECISION_CRITERIA, link: "/" },
                { name: resource.FOOTER_TIMELINE, link: "/" },
                { name: resource.FOOTER_NON_PROFITS_FAQ, link: "/" },
                { name: resource.FOOTER_NON_PROFITS_APPLY, link: "/" },
            ],
            link: "/nonprofits",
        },
    ];

    return (
        <Desktop>
            <LeftContainer>
                <Wordmark>
                    <Link href="/">
                        <div>
                            <Logo />
                            <Name />
                        </div>
                    </Link>
                </Wordmark>
                <Image
                    src={wavingGraphic}
                    width={325}
                    height={300}
                    alt="illustration"
                />
                <SocialContainer>
                    <Email>info@uwblueprint.org</Email>
                    <ImageContainer>
                        <LinkElement>
                            <Link href="/">
                                <Image
                                    src={instagram}
                                    width={25}
                                    height={25}
                                    alt="instagram"
                                />
                            </Link>
                        </LinkElement>
                        <LinkElement>
                            <Link href="/">
                                <Image
                                    src={medium}
                                    width={25}
                                    height={25}
                                    alt="medium"
                                />
                            </Link>
                        </LinkElement>
                        <LinkElement>
                            <Link href="/">
                                <Image
                                    src={facebook}
                                    width={25}
                                    height={25}
                                    alt="facebook"
                                />
                            </Link>
                        </LinkElement>
                        <LinkElement>
                            <Link href="/">
                                <Image
                                    src={linkedin}
                                    width={25}
                                    height={25}
                                    alt="linkedin"
                                />
                            </Link>
                        </LinkElement>
                    </ImageContainer>
                </SocialContainer>
            </LeftContainer>

            <LinkContainer>
                {navOptions.map((item) => (
                    <Links key={item.name}>
                        <LinkHeader>
                            <LinkElement>
                                <Link href={item.link}>{item.name}</Link>
                            </LinkElement>
                        </LinkHeader>
                        {item.children.map((child) => (
                            <LinkElement key={child.name}>
                                <Link href={child.link}>{child.name}</Link>
                            </LinkElement>
                        ))}
                    </Links>
                ))}
            </LinkContainer>

            <BottomContainer>{resource.COPYRIGHT}</BottomContainer>
        </Desktop>
    );
};

export default Footer;
