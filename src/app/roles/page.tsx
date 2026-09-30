import type { Metadata } from "next";

import { RolesHero } from "@/components/sections/RolesHero";
import {
  RolesSection,
  type RoleItem,
} from "@/components/sections/RolesSection";

export const metadata: Metadata = {
  title: "Roles | UW Blueprint",
  description: "Learn more about how we work as a team at Blueprint.",
};

const EXECUTIVE_TEAM: RoleItem[] = [
  {
    title: "Co-Presidents",
    description:
      "The Presidents are the leaders of Blueprint and its chief representatives. They are ultimately responsible for the success of all aspects of Blueprint. They set the direction for the club, uphold club values and mission, and manage the day-to-day operations of the executive team. You can't run a club without presidents, so if you really want to drive the vision and execute on new ideas, this might be the fit for you.",
    link: {
      href: "https://app.notion.com/p/Detailed-President-Responsibilities-92cd178a412d46e581f557d4bbd4ee07?pvs=21",
      label: "Detailed President Responsibilities",
    },
    note: "Internal Only",
  },
  {
    title: "VP Engineering",
    description:
      "The VP Engineering is responsible for the technical success of current and future projects. They drive initiatives that improve org-wide engineering processes and foster mentorship. They lead all project leads on Blueprint.",
    responsibilities: [
      "Conduct architecture design reviews, provide code standards, write technical documentation.",
      "Lead engineering recruitment, and organize developer bootcamp.",
      "Help evaluate the technical feasibility of potential NPO projects, and regularly provide advice and guidance to the project leads through 1-1s and meetings.",
    ],
    note: "Generally a senior, internal-hire preferred role.",
  },
  {
    title: "VP Design",
    description:
      "The VP Design advocates for and supports design within the organization. They lead all designers and design adjacent roles on Blueprint.",
    responsibilities: [
      "Mentor the product designers on their individual projects, coordinate design feedback sessions, and weekly design team meetings with team socials, project share-outs, and critique.",
      "Grow the design community through leading internal and external workshops, occasionally partnering with other organizations at Waterloo.",
      "Assists with preliminary scoping of new projects providing a design perspective in collaboration with VP Scoping as necessary.",
      "Work to improve design processes and ceremonies (i.e. run critiques more efficiently and effectively, improve cross-functional processes, creating Figma assets to speed up workflow for designers, etc.)",
    ],
    link: {
      href: "https://medium.com/uw-blueprint/member-spotlight-vp-design-carmen-lee-a146ec8ae0fd",
      label: "Member Spotlight — VP Design",
    },
    note: "Generally a senior, internal-hire preferred role.",
  },
  {
    title: "VP Product",
    description:
      "The VP Product owns and shapes everything product within Blueprint. This role sets the standard for product excellence, builds the PM community, and ensures every project meets a high bar for quality and impact.",
    responsibilities: [
      "Build and scale the Blueprint product community. Define product management standards, artifacts, and operating rhythms. Mentor and elevate every PM on the team.",
      "Evaluate new opportunities, assess feasibility, and lead the project selection process to ensure focus on the highest-impact initiatives.",
      "Provide consistent, high-quality coaching through 1:1s and working sessions. Act as a thought partner on scoping, prioritization, and execution.",
      "Hire and develop exceptional PM talent.",
      "Partner cross-functionally across calls and forums to ensure alignment and cohesion, holding projects together from inception to launch.",
    ],
  },
  {
    title: "VP Project Scoping",
    description:
      "The VP Scoping takes ownership of finding partners that align with Blueprint's mission and values. They lead collaboration with VP Engineering, VP Design, and VP Product to ensure the most suiting projects are chosen for our team.",
    responsibilities: [
      "Scoping potential partnerships with non-profit organizations and developing a statement of work per project.",
      "Work with all relevant stakeholders to evaluate the project fit, organizational need, and technical feasibility of the project before project selection.",
      "Consulting with the NPOs to assess technology needs and requirements, examine IT capabilities, identify potential challenges, and develop strategic options.",
      "Leverage strong communication skills, be organized, and be able to manage relationships with non-profits effectively as they will be leading client meetings throughout the term.",
    ],
    keyTraits: [
      "Strong interest in early-stage product ideation and shaping problem spaces before solutions are defined.",
      "Comfortable thinking on the fly and navigating ambiguity during discovery and scoping conversations.",
      "Clear, confident communicator who can lead client meetings and build trust with non-profit partners.",
      "Highly organized and proactive, with the ability to manage multiple stakeholder relationships in parallel.",
    ],
    link: {
      href: "https://uwblueprint.medium.com/member-spotlight-vp-scoping-rona-he-8dfe4a7b7222",
      label: "Member Spotlight — VP Scoping",
    },
  },
  {
    title: "Internal Director",
    description:
      "The Internal Director is primarily responsible for cultivating Blueprint culture. They are someone that is organized, proactive and passionate about bringing people together.",
    responsibilities: [
      "Organizing internal socials, events and managing swag.",
      "Use creativity to ideate and execute engaging initiatives, especially in a remote setting.",
      "Collaborate with other Internal Directors and External Directors to ideate articles for our Medium and bring about member engagement.",
    ],
    keyTraits: [
      "Can hold a room and make meetings, socials, and group hangouts feel alive.",
      "Loves bringing people together and creating a strong sense of community.",
      "Pays attention to members and always looks for ways to make the experience better.",
    ],
  },
  {
    title: "External Director",
    description:
      "The External Director shapes and controls Blueprint's perception through events.",
    responsibilities: [
      "Exploring, establishing, and maintaining partnerships with third-parties (other clubs, sponsors, etc). Note: non-profits are not included in this list — for that, see VP Scoping.",
      "Turn these partnerships into potential project and member pipelines or as avenues for interfacing with the community.",
      "Collaborate with other External Directors and Internal Directors to run events and organize initiatives to improve our brand.",
      "Liaise with other Blueprint chapters.",
    ],
    keyTraits: [
      "Confident, professional communicator with a keen eye for polish, able to represent UW Blueprint well in public-facing settings.",
      "Relationship-oriented and proactive, with the ability to initiate, grow, and maintain long-term partnerships with external stakeholders (tech companies, other chapters, and fellow students).",
      "Organized and dependable, with the ability to manage multiple partnerships, initiatives, and social channels in parallel.",
    ],
  },
  {
    title: "VP Finance",
    description:
      "The VP Finance is responsible for organizing and building out the financial processes within our club along with aiding in internal operations.",
    responsibilities: [
      "Oversee and manage processes such as reimbursement, event funding, and more.",
      "Create a comprehensive sponsorship program and acquire material partnerships.",
      "Assist the Presidents and collaborate with directors to execute internal and external events.",
    ],
    keyTraits: [
      "Keeps things organized, pays attention to details, and owns financial processes from start to finish.",
      "Comfortable handling budgets, reimbursements, and sponsorship logistics with care.",
      "Confident reaching out to secure partnerships and sponsorships with school groups and companies.",
    ],
  },
  {
    title: "VP Talent",
    description:
      "The VP Talent is responsible for managing internal recruitment practices and interacts with the Craft Trifecta to continuously build on the recruitment strategy and interview process for each role. They coordinate recruitment operations and ensure that each role is filled.",
    responsibilities: [
      "Working with Presidents to create and stick to a recruitment timeline, and collaborating with craft to refresh questions for role recruitment.",
      "Send out interview invites, rejections and acceptances.",
      "Coordinate interview scheduling and in general be the point of contact during recruiting.",
    ],
    keyTraits: [
      "Friendly, professional, and easy to talk to.",
      "Takes initiative and works well with the team.",
    ],
  },
  {
    title: "Graphic Designer",
    description:
      "The Graphic Designer will support External Directors and the design team to create visual assets for marketing and project teams.",
    responsibilities: [
      "Work closely with Content Strategists to create effective cross-platform marketing for Blueprint.",
      "Build and support UW Blueprint's brand through brand assets, graphics, and polished collateral (banners, website design, slideshows, etc.).",
      "Use Figma and/or other design tools to produce graphic designs, illustrations, and motion design materials.",
    ],
    keyTraits: [
      "Loves great design and can't help but fix anything that looks off.",
      "Always looking for ways to keep things fresh and exciting.",
      "Enjoys working closely with other designers and teammates.",
    ],
  },
  {
    title: "Content Strategist",
    description:
      "Collaborate with Graphic Designers and marketing team members to develop cohesive cross platform content for Blueprint.",
    responsibilities: [
      "Plan, write, and manage content across social platforms, newsletters, and marketing materials.",
      "Develop content calendars and campaign ideas that highlight Blueprint's projects, events, and community impact.",
      "Ensure messaging aligns with UW Blueprint's brand voice and overall marketing goals.",
    ],
    keyTraits: [
      "Strong storyteller who knows how to turn ideas into engaging content.",
      "Naturally curious about what performs well on social media and always looking for creative angles.",
      "Enjoys collaborating with designers and teammates to bring campaigns to life.",
    ],
  },
];

const PROJECT_TEAM: RoleItem[] = [
  {
    title: "Project Developer",
    description:
      "The Project Developer is an individual contributor responsible for building and delivering features on the project. They collaborate with the team to write quality code, grow their technical skills, and contribute to the overall success of the project.",
    responsibilities: [
      "Write, test, and maintain code in line with the team's best practices and technical standards.",
      "Participate in code reviews, both giving and receiving feedback to improve code quality and personal growth.",
      "Collaborate with the Project Lead and other developers to break down tasks, estimate work, and meet project milestones.",
      "Communicate progress, blockers, and questions proactively during team meetings and check-ins.",
      "Continuously learn and develop technical skills, taking advantage of mentorship from the Project Lead and other senior members.",
    ],
    note: "Open to all experience levels; a great opportunity to gain hands-on experience in a team setting.",
  },
  {
    title: "Product Designer",
    description:
      "Product Designers are responsible for delivering thoughtful, high-quality UI/UX work for the non-profit projects we build at Blueprint. They work closely with the client, as well as the product manager, developers and other designers to understand user needs, shape solutions and bring ideas to life.",
    responsibilities: [
      "Take lead and ownership of their work while collaborating cross-functionally; this includes communicating product ideas with project stakeholders, creating user stories, wireframing app screens, prototyping, and crafting visual assets before completing dev-handoff.",
      "Look past personal bias and designing experiences that understand the broad range of niche audiences we create work for.",
      "Work with the VP Design for guidance, feedback, and support throughout the term, including participating in design events and critiques.",
    ],
    keyTraits: [
      "Curious and empathetic; enjoys understanding users and the problems they face before jumping into solutions.",
      "Comfortable iterating and adapting as constraints, feedback, or scope evolve.",
      "Cares about design craft, but values collaboration and shipping meaningful work over perfection.",
    ],
    link: {
      href: "https://medium.com/uw-blueprint/member-spotlight-product-designer-amanda-du-34b816808d88",
      label: "Member Spotlight — Product Designer",
    },
    note: "Having a portfolio or examples of previous design work is strongly encouraged to help showcase your experience and/or interests.",
  },
  {
    title: "DesignOps (New)",
    description:
      "The DesignOps role focuses on maintaining design quality, consistency, and scalability across all Blueprint projects. They act as a bridge between design, product, and development by supporting teams after design handoff. This is done by addressing small UX/UI issues, refining design systems, and ensuring best practices are upheld through implementation.",
    responsibilities: [
      "Review completed project designs for quality, consistency, and completeness, and flag issues that surface during development or QA.",
      "Execute small design fixes and improvements across projects (e.g. missing states, spacing inconsistencies, accessibility tweaks, design system adjustments).",
      "Update and maintain shared design systems and documentation to ensure clarity and alignment for PMs, developers, and future designers.",
    ],
    keyTraits: [
      "Systems-minded and detail-oriented; enjoys improving consistency and catching small issues others may miss.",
      "Comfortable working asynchronously across multiple projects and communicating clearly with PMs and developers.",
      "Adaptable in terms of understanding when to polish, when to unblock and when to ship the designated adjustment(s).",
    ],
    link: {
      href: "https://app.notion.com/p/More-info-about-DesignOps-31b10f3fb1dc80e08c67fb5c2c2b08d4?pvs=21",
      label: "More info about DesignOps",
    },
    note: "Generally a senior, internal-hire preferred role.",
  },
  {
    title: "Project Lead",
    description:
      "The Project Lead (or Technical Lead) is responsible for leading the team and driving the technical direction of the project, providing support and mentorship to developers on the team and working with the product manager to run the team effectively.",
    responsibilities: [
      "Organizing best code practices, performing code reviews, mentoring developers, planning tasks, making key technical decisions and software architecture design.",
      "Provide leadership, mentorship, and project execution skills as the overall success of the team is largely self guided.",
      "May write code as part of their responsibilities, but the focus of the role is on providing technical guidance and supporting the team.",
      "Work closely with the Product Manager around planning and non-profit requirements as well as participate in non-profit meetings.",
      "Regularly meet with the VP Engineering for check-ins, assistance in any of their responsibilities and to answer any PL related questions.",
    ],
    link: {
      href: "https://medium.com/uw-blueprint/member-spotlight-project-lead-anne-chung-1ca9f22c9db3",
      label: "Member Spotlight — Project Lead",
    },
    note: "Generally a senior, internal-hire preferred role.",
  },
  {
    title: "Product Manager",
    description:
      "The Product Manager will be responsible for managing the delivery of a digital product to the NPO partner. This involves scoping features, iterating on feedback, and maintaining communications with the NPO.",
    responsibilities: [
      "Own product definition and design execution: own feature definition from idea to delivery. Partner with designers to scope features, shape core flows, and prototype solutions. Work with the project lead (engineering manager) to evaluate trade-offs, answer product questions, and make final build decisions.",
      "Build the client relationship and project direction: serve as the primary client lead. Run bi-weekly demos, present work, and gather feedback. Set clear expectations and guide product direction in partnership with the client.",
      "Build team culture: help create a positive and connected team environment. Build strong relationships with teammates. Host socials, bring energy to meetings, and promote a fun team culture.",
    ],
    link: {
      href: "https://uwblueprint.medium.com/member-spotlight-sophia-zhu-pm-omhs-a-deep-dive-into-managing-tradeoffs-c56a14840ef3",
      label: "Member Spotlight — Product Manager",
    },
    note: "PMs at Blueprint primarily work with designers and project leads (engineering managers). If you have a more eng heavy background, also consider checking out the project lead role as well.",
  },
];

export default function RolesPage() {
  return (
    <main className="bg-[var(--primary-light)]">
      <RolesHero />

      <section aria-label="Introduction" className="px-8 pt-16 pb-0">
        <div className="grid w-full grid-cols-12 gap-0">
          <div className="col-span-12 md:col-span-8 flex flex-col gap-4">
            <p className="text-md text-[var(--secondary-dark)]">
              While this document outlines the responsibilities for each role,
              the continued success of Blueprint has been reliant on members
              working cross-functionally on things they care about. If there is
              an initiative that you would like to see through, a pain point you
              want to address, or anything else — write up a request for
              comments (RFC) in Notion and get started by sharing it with the
              appropriate members.
            </p>
            <p className="text-md text-[var(--secondary-dark)]">
              In addition to the responsibilities defined below, every member is
              responsible for being an advocate for their role and being a part
              of the next recruitment cycle for their role.
            </p>
            <p className="text-md text-[var(--secondary-dark)]">
              Roles only define responsibilities. Blueprint has a flat
              hierarchy.
            </p>
          </div>
        </div>
      </section>

      <RolesSection
        id="executive-team"
        groupName="executive team"
        roles={EXECUTIVE_TEAM}
      />

      <RolesSection
        id="project-team"
        groupName="project team"
        roles={PROJECT_TEAM}
        className="pt-0 pb-24"
      />
    </main>
  );
}
