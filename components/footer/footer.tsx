import React from "react";
import Link from "next/link";
import resource from "../../common/resource";
import styled from "styled-components";

import { Logo, Name } from "../common/blueprint-logo/BlueprintLogo";

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

const LinkContainer = styled.div`
    margin-top: 10px;
    margin-left: auto;
    margin-right: 0;
    overflow: visible;
`;

const Links = styled.div`
    float: left;
    margin-top: 10px; //margin spacing
    margin-left: 10px;
    margin-right: 40px;
    transition: transform 0.3s ease;
    a {
        color: white;
        font-weight: 500;
    }
    :hover {
        text-decoration: underline;
        text-underline-offset: 4px;
        text-decoration-thickness: 2px;
        transform: translateY(-1px);
        opacity: 80%;
    }
`;

const LinkHeader = styled(Links)`
    font-size: 18px;
`;

const Footer = () => {
    const navOptions = [
        {
            name: resource.NAVBAR_ABOUT_US,
            children: [
                { name: resource.FOOTER_WHO_WE_ARE, link: "/" },
                { name: resource.FOOTER_WHAT_WE_DO, link: "/" },
            ],
            link: "/about",
        },
        {
            name: resource.NAVBAR_PROJECTS,
            children: [
                { name: resource.FOOTER_WHO_WE_ARE, link: "/" },
                { name: resource.FOOTER_WHAT_WE_DO, link: "/" },
            ],
            link: "/projects",
        },
        {
            name: resource.NAVBAR_STUDENTS,
            children: [
                { name: resource.FOOTER_WHO_WE_ARE, link: "/" },
                { name: resource.FOOTER_WHAT_WE_DO, link: "/" },
            ],
            link: "/students",
        },
        {
            name: resource.NAVBAR_CONTACT,
            children: [
                { name: resource.FOOTER_WHO_WE_ARE, link: "/" },
                { name: resource.FOOTER_WHAT_WE_DO, link: "/" },
            ],
            link: "/contact",
        },
        {
            name: resource.NAVBAR_JOIN_US,
            children: [
                { name: resource.FOOTER_WHO_WE_ARE, link: "/" },
                { name: resource.FOOTER_WHAT_WE_DO, link: "/" },
            ],
            link: "/join",
        },
        {
            name: resource.NAVBAR_NON_PROFITS,
            children: [
                { name: resource.FOOTER_WHO_WE_ARE, link: "/" },
                { name: resource.FOOTER_WHAT_WE_DO, link: "/" },
            ],
            link: "/nonprofits",
        },
    ];

    return (
        <Desktop>
            <Wordmark>
                <Link href="/">
                    <div>
                        <Logo />
                        <Name />
                    </div>
                </Link>
            </Wordmark>

            <LinkContainer>
                {navOptions.map((item) => (
                    <Links>
                        <LinkHeader key={item.name}>
                            <Link href={item.link}>{item.name}</Link>
                        </LinkHeader>
                        {/* {item.children.map((child) => (
                    <Links key={child.name}>
                        <Link href={child.link}>{child.name}</Link>
                    </Links>
                ))} */}
                    </Links>
                ))}
            </LinkContainer>
        </Desktop>
    );
};

export default Footer;
