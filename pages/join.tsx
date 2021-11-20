import React from "react";
import Head from "next/head";

import { HStack, VStack } from "../components/common/Layout";
import Button from "../components/common/Button";
import ControlledAccordions from "../components/common/Accordion";
import Links from "../components/common/Links";

import Image from "next/image";
import styled from "styled-components";

const landingSplash = "/join/join-landing-background.svg";
const lookGraphic = "/join/join-look-graphic.svg";
const landingGraphic = "/join/join-landing-graphic.svg";
const joinCarousel = "/join/join-carousel-photo-2.png";

const whyJoinData = [
  {
    title: "MAKE A MEANINGFUL IMPACT",
    description:
      "We work with NPOs on causes we are passionate about and create solutions that amplify their positive impact in our community.",
  },
  {
    title: "JOIN OUR COMMUNITY",
    description:
      "We develop meaningful relationships that extend beyond the scope of the projects we work on. We value time spent together, celebrate our differences, and have a lot of fun.",
  },
  {
    title: "LEVEL UP!",
    description:
      "We value the technical, social, and personal growth of our peers. Our strong culture of mentorship perpetuates a cycle of non-stop teaching and learning.",
  },
];

const applicationFaq = [
  {
    question: "CAN I APPLY IF I DON’T GO TO UWATERLOO?",
    ans: "If you’re a student at a university, and you will be in Waterloo, then you’re welcome to apply! However, we do give priority to UW students.",
  },
  {
    question: "CAN I BE A PART OF BLUEPRINT WHILE ON A WORK TERM?",
    ans: "Yes, we are happy to take students on both academic and work terms.",
  },
  {
    question:
      "I DON’T HAVE A LOT OF DEV OR DESIGN EXPERIENCE, SHOULD I STILL APPLY?",
    ans: "Yes! Blueprint is a great way to gain more experience as you will be surrounded by a community of peers with varying expertise in different fields, who can support you with mentorship. We care more about your drive to learn, and your passion for social good.",
  },
  {
    question: "CAN I BE A PART OF BLUEPRINT IF I’M NOT IN WATERLOO?",
    ans: "UW Blueprint will be operating on a remote first mindset in Winter 2022 so we're open to students joining our team from anywhere in the world. That being said, our meetings will usually be scheduled to accommodate people based in Waterloo (EST) and we will have occasional in-person events.",
  },
];

const aboutOurTeam = [
  {
    question: "HOW DO YOU CHOOSE PROJECTS?",
    ans: "We have an application portal on our website for nonprofits, and in addition, we also reach out to nonprofits chosen by our members. We set up calls with nonprofits and figure out whether their proposed project is a good fit for our team. Read more on our nonprofit page",
  },
  {
    question: "DO I GET TO CHOOSE WHAT PROJECT I WORK ON?",
    ans: "Before the term begins, our designers and developers have a chance to get to know the upcoming projects. They then fill out information about their skill set and preferences in our selection form so that Project Leads and Project Managers will choose their team accordingly. We try to make sure that most people get their first choice, but no guarantees can be made.",
  },
  {
    question: "HOW DOES MENTORSHIP WORK IN BLUEPRINT?",
    ans: "In our project teams, we look to ensure there is a good distribution in development experience. If you’re just starting out, you’ll always have someone you can turn to for help! We also have design meetings where designers can ask each other and the VP Design for feedback.",
  },
  {
    question: "WHAT'S THE TIME COMMITMENT? HOW MANY HOURS PER WEEK?",
    ans: "We would like Blueprint members to contribute around 10 hours per week. This is to ensure that we can deliver high-quality products to the organizations we partner with. We understand that it’s a big time commitment, and we would like you to make sure that your course load and extracurriculars allow for this type of commitment.",
  },
];

const ColoredDate = styled.span`
  color: ${(props) => props.theme.colors.B10};
`;

const dates = {
  applicationOpen: <ColoredDate>Mar 6 2021 00:00:00 EST</ColoredDate>,
  applicationClose: <ColoredDate>Mar 19 2021 23:59:59 EDT.</ColoredDate>,
  invite: <ColoredDate>Mar 23</ColoredDate>,
  decision: <ColoredDate>Mar 19 2021 23:59:59 EDT.</ColoredDate>,
};

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

const processData = [
  {
    title: "LEARN ABOUT BLUEPRINT",
    descripton: (
      <p>
        Check out our current projects and team on our {Links["Facebook"]},{" "}
        {Links["Instagram"]} and {Links["Medium"]}
        .",
      </p>
    ),
  },
  {
    title: "SUBMIT YOUR APPLICATION",
    descripton: (
      <p>
        Tell us a little bit about yourself and why you're interested in joining
        Blueprint. We make sure to go through every application thoroughly. If
        we think you might be a good fit, we will extend you an invite to a
        coffee chat! Applications open {dates["applicationOpen"]} and close{" "}
        {dates["applicationClose"]}
      </p>
    ),
  },
  {
    title: "CHAT WITH US",
    descripton: (
      <p>
        Let's chat! We'll send out invites on {dates["invite"]}, to schedule a
        time for us to connect. These chats will take place over the upcoming
        week, and will be a casual conversation between you and a couple of our
        members. We want to learn more about you, and you can also use this time
        to ask us any questions you might have!
      </p>
    ),
  },
  {
    title: "FINAL DECISION",
    descripton: (
      <p>
        We will get back to you by {dates["decision"]} to let you know our final
        decision. If we feel you’d be a good fit for the team, we would love for
        you to join! Get back to us as soon as possible regarding whether you
        would like to be part of our team next term, so we can get started with
        onboarding.
      </p>
    ),
  },
];

const CenterImage = styled.div`
  // width: 50%;
  text-align: center;
  margin: 0 auto;
`;

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
  width: 50%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 225px 0 225px 225px;
`;

const SectionContent = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 225px;
`;

const LandingTitle = styled.h2`
  color: ${(props) => props.theme.colors.C00};
`;

const LandingText = styled.h5`
  color: ${(props) => props.theme.colors.C00};
  width: 25vw;
`;

const SectionTitle = styled.h2`
  color: ${(props) => props.theme.colors.B10};
  padding: 25px 0;
`;

const FaqAccordion = styled.div`
  float: right;
  padding: 0 0 25px 0;
  width: 50vw;
`;

const FaqHeader = styled.h6`
  color: ${(props) => props.theme.colors.B10};
  font-weight: 600;
  width: 25%;
`;

const Description = styled.p`
  padding: 10px 0px;
`;

const Title = styled.h6`
  color: ${(props) => props.theme.colors.B10};
  font-weight: 600;
`;

const SplashImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 658;
  zindex: -1;
`;

export default function Nonprofits() {
  //Temporary inline styling. Should be changed when real code is added
  return (
    <div>
      <Head>
        <title>UW Blueprint {"|"} Join</title>
      </Head>
      <Container>
        <Section>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 658,
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
              <LandingTitle>{"Join our Team"}</LandingTitle>
              <LandingText>
                {
                  "We are a group of friendly folks at the University of Waterloo dedicated to building technology for social good."
                }
              </LandingText>
              {/* TODO: Seems to be used more than once this page */}
              <div style={{ padding: "25px 0" }}>
                <Button type="secondaryLight" to="/contact">
                  {"Apply Now"}
                </Button>
              </div>
            </LandingContent>
            <Image src={landingGraphic} width="1000vw" height="750vh" />
          </HStack>
        </Section>
        <Section>
          <SectionContent>
            <HStack>
              {/* <Image
                                src={criteriaGraphic}
                                width="1200vw"
                                height="500vh"
                                layout="fixed"
                                /> */}
              <VStack>
                <SectionTitle>{"Why join?"}</SectionTitle>
                {whyJoinData.map((e) => {
                  return (
                    <div>
                      <Title>{e.title}</Title>
                      <Description>{e.description}</Description>
                    </div>
                  );
                })}
              </VStack>
            </HStack>
          </SectionContent>
        </Section>
        <Section>
          <CenterImage>
            <Image src={joinCarousel} width="1081vw" height="443vh" />
          </CenterImage>
        </Section>
        <Section>
          <SectionContent>
            <HStack>
              <Image
                src={lookGraphic}
                width="1200vw"
                height="500vh"
                layout="fixed"
              />
              <VStack>
                <SectionTitle>{"What we look for"}</SectionTitle>
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
          </SectionContent>
        </Section>
        <Section>
          <SectionContent>
            <SectionTitle>{"What we can do for you"}</SectionTitle>
            <HStack>
              {processData.map((e, idx) => {
                return (
                  <div
                    style={{
                      width: "25%",
                      padding: "25px",
                    }}
                  >
                    <VStack>
                      <div>
                        <SectionTitle>{idx + 1}</SectionTitle>
                      </div>
                      <div>
                        <h6 style={{ fontWeight: 600 }}>{e.title}</h6>
                        <p>{e.descripton}</p>
                      </div>
                    </VStack>
                  </div>
                );
              })}
            </HStack>
          </SectionContent>
        </Section>
        <Section>
          <SectionContent>
            <SectionTitle>{"FAQ"}</SectionTitle>
            <HStack>
              <FaqHeader>{"APPLICATION PROCESS"}</FaqHeader>
              <FaqAccordion>
                <ControlledAccordions data={applicationFaq} />
              </FaqAccordion>
            </HStack>
            <HStack>
              <FaqHeader>{"ABOUT OUR TEAM"}</FaqHeader>
              <FaqAccordion>
                <ControlledAccordions data={aboutOurTeam} />
              </FaqAccordion>
            </HStack>
          </SectionContent>
        </Section>
      </Container>
    </div>
  );
}
