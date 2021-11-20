import React from "react";
import Link from "next/link";
import Button from "components/common/Button";
import styled from "styled-components";

// Assets
import { Logo, Name } from "../common/blueprint-logo/BlueprintLogo";

const Desktop = styled.div`
  position: absolute;
  overflow: hidden;
  z-index: 100;
  display: flex; // have navbar elements line up horizontally
  width: 100%;
  min-height: 60px;
  //   ${(p) => p.theme.mediaQueries.desktop} {
  //     display: none;
  //   }
`;

const Wordmark = styled.div`
  // ${(p) => p.theme.mediaQueries.mobile} {
  //   display: none; //Hides Left BP Logo and Name on mobile
  // }
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
    font-family: Poppins;
  }
  :hover {
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 2px;
    transform: translateY(-1px);
    opacity: 80%;
  }
`;

const Special = styled(Button)`
  padding-top: 10px; //Join our team and for nonprofits button spacing
  padding-bottom: 10px;
  padding-left: 25px;
  padding-right: 25px;
  font-size: 14px;
  font-weight: 500;

  :hover {
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 2px;
  }
`;

const Divider = styled.div`
  // Need special divider to prevent space buttons whitle preventing button area to increase (by changing padding or margin).
  width: 30px;
  height: auto;
  display: inline-block;
`;

const LinkButton = styled.div`
  float: left;
  padding-top: 10px;
`;

const NavbarDesktop = () => {
  const navOptions = [
    { name: "About Us", link: "/about" },
    { name: "Projects", link: "/projects" },
    { name: "Students", link: "/" },
    { name: "Contact", link: "/contact" },
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
          <Links key={item.name}>
            <Link href={item.link}>{item.name}</Link>
          </Links>
        ))}
        {/* Special Custom Linked Buttons for "Join Our Team" and "For Non-profits" */}
        <LinkButton>
          <Link href="/join">
            <Special type="secondaryLight">Join Our Team!</Special>
          </Link>
          <Divider />
        </LinkButton>
        <LinkButton>
          <Link href="/nonprofits">
            <Special type="secondaryDark">For Nonprofits</Special>
          </Link>
          <Divider />
        </LinkButton>
      </LinkContainer>
    </Desktop>
  );
};

export default NavbarDesktop;
