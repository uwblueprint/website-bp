import React from "react";
import Image from "next/image";
import styled from "styled-components";

import { HStack, VStack } from "components/Layout";
import { SectionTitle } from "components/common/Typography";

const lookGraphic = "/join/join-look-graphic.svg";

const Description = styled.p`
  padding: 10px 0px;
`;

const Title = styled.h6`
  color: ${(props) => props.theme.colors.B10};
  font-weight: 600;
`;

const teamFitData = [
  {
    title: "PASSION FOR SOCIAL GOOD",
    description: (
      <p>
        {
          "How passionate are you about working for social good? Do you have prior volunteering experience? Is there a specific project for social good that you are particularly interested in?"
        }
      </p>
    ),
  },
  {
    title: "DRIVE TO LEARN",
    description: (
      <p>
        {
          "Are you willing to learn new things, both technically and in terms of social good? Do you like to challenge yourself with problems that you've never solved before?"
        }
      </p>
    ),
  },
  {
    title: "TECHNICAL FIT",
    description: (
      <p>
        {
          "Do you have experience that is relevant to the type of projects we work on? If not, are you technically capable of learning to make sure you can make significant contributions?"
        }
      </p>
    ),
  },
  {
    title: "TEAM PLAYER",
    description: (
      <p>
        {
          "Do you enjoy collaborating and learning with others? Do you value others' perspectives and experiences?"
        }
      </p>
    ),
  },
];

export const WhatWeLookFor: React.FC = () => {
  return (
    <>
      <HStack>
        <Image src={lookGraphic} width="1200vw" height="500vh" layout="fixed" />
        <VStack>
          <SectionTitle>What we look for</SectionTitle>
          {teamFitData.map((e) => {
            return (
              <div>
                <Title>{e.title}</Title>
                <Description>{e.description}</Description>
              </div>
            );
          })}
        </VStack>
      </HStack>
    </>
  );
};
