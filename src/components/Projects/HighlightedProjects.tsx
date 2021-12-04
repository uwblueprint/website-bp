import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import Image from "next/image";
import Button from "components/common/Button";

import { CenteredVStack, HStack } from "components/common/Layout";

const dancefestThumbnail = "/projects/projects-dancefest-thumbnail.png";
const svpThumbnail = "/projects/projects-svp-thumbnail.png";
const paramedicsThumbnail = "/projects/projects-paramedics-thumbnail.png";
const plasticsThumbnail = "/projects/projects-plastics-thumbnail.png";

const dancefestImage = "/projects/projects-dancefest-image.png";
const svpImage = "/projects/projects-svp-image.png";
const paramedicsImage = "/projects/projects-paramedics-image.png";
const plasticsImage = "/projects/projects-plastics-image.png";

const ProjectSection = styled(CenteredVStack)`
  text-align: center;
  padding: 5rem;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.colors.B10};
`;

const Card = styled.div`
  width: 35vw;
  margin: 1rem;
  border-radius: 12px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.05),
    0px 14px 34px rgba(7, 123, 245, 0.1);
`;

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const CardContent = styled(CenteredVStack)`
  padding: 1rem;
`;

const CardSection = styled.h6`
  color: ${(props) => props.theme.colors.B10};
  font-weight: 600;
`;

const CardText = styled.p`
  padding: 1rem 0;
`;

const CardQuoteText = styled(CardText)`
  font-style: italic;
`;

const CardQuoteSpeakerText = styled(CardText)`
  text-align: right;
`;

const featuredProjects = [
  {
    name: "Social Venture Partners",
    timeline: "Fall 2019 - Fall 2020",
    about:
      "SVP is an organization focused on bringing together community members to invest time, money, and professional expertise to local nonprofits.",
    solution:
      "Our team helped SVP streamline their nonprofit selection process with a platform that allows SVP to manage their nonprofit applications. We redesigned the user experience and created a more flexible and scalable web application.",
    quoteText:
      "Each step of the way, Blueprint’s team asked lots of questions to ensure what they were developing matched expectations, and were transparent around their processes.",
    quoteSpeaker:
      "- Taryn Graham, Operations & Communications Manager at SVPWR",
    thumbnail: svpThumbnail,
    image: svpImage,
  },
  {
    name: "Paramedics",
    timeline: "Winter 2020 - Fall 2020",
    about:
      "The Region of Waterloo Paramedic Services is an emergency medical service provider for the Regional Municipality of Waterloo.",
    solution:
      "Our team built a web and iPad solution for mass-casualty incidents. The iPad component is used by paramedics in the field for patient tracking and triaging while the web component is used to view patient statuses from the command centre.",
    quoteText:
      "We are extremely extremely proud of the project the team has made and super happy to have the team as a part of the project.",
    quoteSpeaker: "- Stephen Yang, Project Lead and Howard Yu, Project Manager",
    thumbnail: paramedicsThumbnail,
    image: paramedicsImage,
  },
  {
    name: "Dancefest",
    timeline: "Winter 2018 - Winter 2021",
    about:
      "The Ontario Secondary School Dancefest is a free dance program encouraging students from grades 1 - 12 to participate in a creative  extracurricular. They host a major 3-day event every year - filled with talks, workshops, and a competition.",
    solution:
      "Our team is focusing on streamlining the judging process of the competition by moving manual tasks like collecting scoresheets and ranking into digital means - saving time and energy. We’re tweaking the product experience, building software fit for any judge’s device, and ensuring their data is safe.",
    quoteText:
      "It was a very satisfying experience for our board to have Blueprint working to make our provincial event for high school students much better.",
    quoteSpeaker: "- Laurel Brown, President at OSSDF",
    thumbnail: dancefestThumbnail,
    image: dancefestImage,
  },
  {
    name: "Plastics for Change",
    timeline: "Summer 2018 - Winter 2019",
    about:
      "PFC uses mobile technology to reduce plastic pollution and create resilient neighbourhoods for the urban poor in developing countries by convincing brands to switch to a more ethical supply chain that uses recycled plastic.",
    solution:
      "Our team focused on providing a single source of truth for all data and transactions between stakeholders within the recycled plastic ecosystem. Through interaction design, development, and data engineering, we built a product that helps PFC monitor vital metrics about pricing, quality, and wages.",
    quoteText:
      "Working on the project was a very rewarding experience in every facet for me. From being able to have real world impact to learning about new technologies, I had an amazing time. On top of this, I’ve made some lifelong friends who worked on the project with me, and for that I am very grateful.",
    quoteSpeaker: "- Ahmed Hamodi, Project Developer",
    thumbnail: plasticsThumbnail,
    image: plasticsImage,
  },
];

export const HighlightedProjects: React.FC = () => {
  return (
    <>
      <ProjectSection>
        <Title>Highlighted Projects</Title>
        <Cards>
          {featuredProjects.map((project) => (
            <Project
              {...project}
              // name={project.name}
              // timeline={project.timeline}
              // about={project.about}
              // solution={project.solution}
              // quoteText={project.quoteText}
              // quoteSpeaker={project.quoteSpeaker}
              // thumbnail={project.thumbnail}
              // image={project.image}
            />
          ))}
        </Cards>
      </ProjectSection>
    </>
  );
};
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    width: "75vw",
    height: "75vh",
    padding: "5em",
    transform: "translate(-50%, -50%)",
    borderRadius: "20px",
  },
};

// TODO: Move this to separate component
interface ProjectProps {
  name: string;
  timeline: string;
  about: string;
  solution: string;
  quoteText: string;
  quoteSpeaker: string;
  thumbnail: string;
  image: string;
}

const Project: React.FC<ProjectProps> = (props) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <Card
        key={props.name}
        onClick={() => {
          setOpen(true);
        }}
      >
        <div>
          <Image
            src={props.thumbnail}
            layout="responsive"
            width="600"
            height="150"
          />
        </div>
        <CardContent>
          <h5>{props.name}</h5>
          {/* <Divider color="black" /> */}
          <p>{props.about}</p>
        </CardContent>
      </Card>
      <Modal isOpen={isOpen} style={customStyles}>
        <HStack>
          <Title>{props.name}</Title>
          {/* TODO: Temporary button just to close modal*/}
          <Button
            onClick={() => {
              setOpen(false);
            }}
            type="primaryLight"
          >
            X
          </Button>
        </HStack>
        <HStack>
          <div style={{ maxWidth: "50%", padding: "0 1em 0 0" }}>
            <CardSection>ABOUT THE NON-PROFIT</CardSection>
            <CardText>{props.about}</CardText>
            <CardSection>OUR SOLUTION</CardSection>
            <CardText>{props.solution}</CardText>
            <CardQuoteText>{props.quoteText}</CardQuoteText>
            <CardQuoteSpeakerText>{props.quoteSpeaker}</CardQuoteSpeakerText>
          </div>
          <Image src={props.image} width="503px" height="398px"></Image>
        </HStack>
      </Modal>
    </>
  );
};
