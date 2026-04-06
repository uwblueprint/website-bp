"use client";

import { useRef } from "react";
import { ProjectsHero } from "@/components/sections/ProjectsHero";
import ContactSection from "@/components/sections/ContactSection";
import { ProjectHighlight } from "@/components/sections/ProjectHighlight";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { ProjectsAdditionalCards } from "@/components/sections/ProjectsAdditionalCards";

const PROJECTS = [
  {
    id: "sistema",
    highlightImage: "/projects/sistema-toronto.png",
    projectName: "Sistema",
    timeline: "Winter 2024 – Fall 2024",
    location: undefined,
    website: undefined,
    repoUrl: "https://github.com/uwblueprint/sistema",
    caseStudyUrl: undefined,
    aboutNpo:
      "Sistema Toronto is a non-profit organization dedicated to providing accessible and high-quality music education to youth from underserved communities. We are building an absence management platform where teachers can mark their absences, upload lesson plans, claim classes from other absent teachers, and receive class related email notifications. Administrators on the platform can view metrics like number of absences and receive class related email notifications.",
    ourSolution:
      "Our team developed a class management platform where teachers can mark their absences, upload lesson plans, claim classes from other absent teachers, and receive class related email notifications.",
    testimonial:
      '"The UW Blueprint team worked diligently throughout the year to design a product that was going to be flexible, well-designed, and most of all useful to us. With their help we were able to identify a workable project, move through the design process, test, and make changes. Their design integrates beautifully with the software we are already using. It will help us track and manage teacher absences, book subs, and coordinate lesson plans across our different locations and subject areas. The team was a delight to work with, and we\'ll be using this system for years to come!" — Sistema Team',
  },
  {
    id: "a-better-tent-city",
    highlightImage: "/projects/abtc.png",
    projectName: "A Better Tent City",
    timeline: "Fall 2023 – Fall 2024",
    location: undefined,
    website: undefined,
    repoUrl: "https://github.com/uwblueprint/abtc",
    caseStudyUrl: undefined,
    aboutNpo:
      "A Better Tent City (ABTC) is a registered NPO based in the Kitchener Waterloo region that believes that everyone should have a right to housing. ABTC provides homeless individuals an opportunity to move from dangerous conditions to safer, more hygienic facilities. The site includes built-in showers, laundry facilities and regular visits from mobile health clinics and HIV testing. Food is provided via ABTC's partner organizations such as the Foodbank of Waterloo Region which sends weekly deliveries. The site has 42 individual cabins setup for up to 50 residents, but an additional 40 visitors also spend time on site, in the shared space and in cabins and access meals and other services offered on site. The site provides a shared space and kitchen and endeavors to provide air conditioners, microwaves and mini fridges to residents and primarily funds their operations through donations and housing allowances from their residents.",
    ourSolution:
      "The objective was to create a scalable web application that acts as a volunteer scheduling and tracking platform, as well as an overall dashboard for Admins. Admins will be able to create volunteer requests for different types of shifts/events. The system will also allow Admins to track the volunteer hours and history of a selected volunteer. Both types of users will require an account to access the system.",
    testimonial:
      "\u201cWe\u2019re incredibly grateful for the dedicated team at Blueprint and their work on our new volunteer management platform. From the start, they showed genuine compassion for our mission to provide safe and dignified housing for people experiencing homelessness. The Blueprint team took the time to understand our day-to-day operations and built a system that truly meets our needs, from scheduling volunteers to tracking hours and managing events with ease. Their professionalism and empathy made the entire process smooth and collaborative. Thanks to this new platform, our staff can spend less time on logistics and more time supporting our residents. Blueprint\u2019s work will have a lasting impact on our community.\u201d \u2013 ABTC Team",
  },
  {
    id: "feeding-canadian-kids",
    highlightImage: "/projects/feeding-canadian-kids.png",
    projectName: "Feeding Canadian Kids",
    timeline: "Fall 2022 – Spring 2024",
    location: undefined,
    website: undefined,
    repoUrl: "https://github.com/uwblueprint/feeding-canadian-kids",
    caseStudyUrl: undefined,
    aboutNpo:
      "Feeding Canadian Kids is the only Canadian federal registered charity working to fill the dinner-gap, providing healthy meals to hungry children for a good night's sleep, nourished body and brighter future.",
    ourSolution:
      "Our project team developed a streamlined, user-friendly platform that makes it easier for volunteers to sign up for food delivery to schools. The aim was to create a formalized process that is intuitive and straightforward, encouraging more volunteers to participate in this important cause. Moreover, the platform provides a centralized hub for volunteers to submit required documents for screening, ensuring the safety of the children.",
    testimonial:
      '"We were thrilled with the incredible support we received from our volunteer team at Blueprint! From the very beginning, their enthusiasm for our mission at Feeding Canadian Kids was infectious. They made the entire process of building our online Meal Pairing Platform feel seamless, even for someone like me who isn\'t very tech-savvy. Our Project Managers were exceptionally organized, keeping us informed every step of the way. We also had the pleasure of meeting some of the team members, and it was clear that they truly listened to our needs and concerns. Their thoughtful collaboration ensured that the final product reflected our goals and vision. The development of this platform marks a major milestone for Feeding Canadian Kids, as it allows us to scale our efforts nationwide. Thanks to Blueprint, what once felt like a dream is now a reality. The team went above and beyond, and their contribution will have a lasting impact on children and families across Canada." — Jessica Roelink, Co-Founder of FCK',
  },
  {
    id: "social-venture-partners",
    highlightImage: "/projects/social-venture-partners.png",
    projectName: "Social Venture Partners",
    timeline: "Fall 2019 – Fall 2020",
    location: undefined,
    website: undefined,
    repoUrl: "https://github.com/uwblueprint/arbitrium",
    caseStudyUrl:
      "https://medium.com/uw-blueprint/featured-project-social-venture-partners-waterloo-region-50b2f06dfcb9",
    aboutNpo:
      "Social Venture Partners (SVP) is an organization dedicated to supporting local nonprofits with funding, resources, and capacity building initiatives.",
    ourSolution:
      "Our team developed a platform that would allow SVP to better manage their nonprofit applications pipeline and streamline the funding-selection process. As part of the project, we also redesigned the user experience and created a more flexible and scalable web application.",
    testimonial:
      '"Each step of the way, Blueprint\'s team asked lots of questions to ensure what they were developing matched expectations, and were transparent around their processes." — Taryn Graham, Operations & Communications Manager at SVPWR',
  },
  {
    id: "paramedics",
    highlightImage: "/projects/paramedics.png",
    projectName: "Paramedics",
    timeline: "Winter 2020 – Fall 2020",
    location: undefined,
    website: undefined,
    repoUrl: "https://github.com/uwblueprint/paramedics-react",
    caseStudyUrl:
      "https://medium.com/uw-blueprint/project-spotlight-2-waterloo-paramedic-services-psv-c90855f95c29",
    aboutNpo:
      "The Region of Waterloo Paramedic Services is an emergency medical service provider for the Regional Municipality of Waterloo.",
    ourSolution:
      "Our team built a web and iPad solution for mass-casualty incidents. The iPad component is used by paramedics in the field for patient tracking and triaging while the web component is used to view patient statuses from the command centre.",
    testimonial:
      '"We are extremely extremely proud of the project the team has made and super happy to have the team as a part of the project." — Stephen Yang, Project Lead and Howard Yu, Project Manager',
  },
  {
    id: "dancefest",
    highlightImage: "/projects/dancefest.png",
    projectName: "Dancefest",
    timeline: "Winter 2018 – Winter 2021",
    location: undefined,
    website: undefined,
    repoUrl: "https://github.com/uwblueprint/dancefest-web",
    caseStudyUrl:
      "https://medium.com/uw-blueprint/featured-project-ontario-secondary-school-dancefest-c7ec0efdf1e2",
    aboutNpo:
      "The Ontario Secondary School Dancefest is a free recreational dance program intended to encourage students from grades 1 - 12 to participate in creative and active extracurricular activity. Each year, the organization hosts a major 3-day event - complete with inspirational speakers, technique workshops, and a flagship competition.",
    ourSolution:
      "In an effort to support the smooth operations of the annual dance convention, our team built a platform that would streamline the competition judging process. The platform was compatible with any judging device, ensured data privacy, and digitized processes including scoresheet collection, contestant and ranking in order to alleviate time and energy on part of event organizers.",
    testimonial:
      '"It was a very satisfying experience for our board to have Blueprint working to make our provincial event for high school students much better." — Laurel Brown, President at OSSDF',
  },
  {
    id: "plastics-for-change",
    highlightImage: "/projects/plastics-for-change.png",
    projectName: "Plastics for Change",
    timeline: "Summer 2018 – Winter 2019",
    location: undefined,
    website: undefined,
    repoUrl: "https://github.com/uwblueprint/plasta",
    caseStudyUrl:
      "https://medium.com/uw-blueprint/team-spotlight-plastics-for-change-2b775e2450e3",
    aboutNpo:
      "Plastics for Change (PFC) is dedicated to creating resilient neighbourhoods for the urban poor in developing countries. PFC uses mobile technology to reduce plastic pollution by convincing brands to adopt more ethical supply chain practices that use recycled plastics.",
    ourSolution:
      "Our team focused on providing a single source of truth for all data and transactions between stakeholders within the recycled plastic ecosystem. Through interaction design, development, and data engineering, we built a product that helps PFC monitor vital metrics about pricing, quality, and wages.",
    testimonial:
      '"Working on the project was a very rewarding experience in every facet for me. From being able to have real world impact to learning about new technologies, I had an amazing time. On top of this, I\'ve made some lifelong friends who worked on the project with me, and for that I am very grateful." — Ahmed Hamodi, Project Developer',
  },
] as const;

export default function ProjectsPage() {
  const firstFadeUpRef = useRef<HTMLDivElement>(null);

  return (
    <main>
      <ProjectsHero />

      <div className="relative grid w-full grid-cols-12 gap-0 px-8">
        {/* Preview sidebar: 2 col sticky */}
        <ProjectsPreview
          projects={PROJECTS}
          variant="text"
          triggerRef={firstFadeUpRef}
        />

        {/* 1-col spacer to push content in from the sidebar */}
        <div className="hidden md:col-span-1 md:block" aria-hidden />

        {/* Main content: 8 cols */}
        <div className="col-span-12 md:col-span-8">
          {PROJECTS.map((project, idx) => (
            <ProjectHighlight
              key={project.id}
              id={project.id}
              highlightImage={project.highlightImage}
              projectName={project.projectName}
              timeline={project.timeline}
              location={project.location}
              website={project.website}
              repoUrl={project.repoUrl}
              caseStudyUrl={project.caseStudyUrl}
              aboutNpo={project.aboutNpo}
              ourSolution={project.ourSolution}
              testimonial={project.testimonial}
              fadeUpRef={idx === 0 ? firstFadeUpRef : undefined}
            />
          ))}
        </div>

        {/* 1-col spacer on the right */}
        <div className="hidden md:col-span-1 md:block" aria-hidden />
      </div>

      <ProjectsAdditionalCards />
      <ContactSection />
    </main>
  );
}
