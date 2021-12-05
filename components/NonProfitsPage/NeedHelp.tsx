import React from "react";
import { HStack, VStack } from "components/Layout";
import styled from "styled-components";
import Button from "@components/common/Button";
import Image from "next/image";

const contactsGraphic = "/nonprofits/nonprofits-contact-graphic.svg";

const ContactUsDescription = styled.h4`
  font-weight: 600;
`;

const ContactContainer = styled.div`
  padding: 25px 0;
`;

export const NeedHelp: React.FC = () => {
  return (
    <HStack>
      <VStack>
        <ContactUsDescription>
          NEED HELP WITH YOUR NON PROFIT AND DO NOT KNOW WHERE TO START?
        </ContactUsDescription>
        <ContactContainer>
          <Button href="/contact">Contact Us</Button>
        </ContactContainer>
      </VStack>
      <Image src={contactsGraphic} width="2000vw" height="1000vh" />
    </HStack>
  );
};
