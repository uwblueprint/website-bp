import { FC, Fragment } from "react";
import ProjectCard from "@components/projects/OtherProjects/ProjectCard";
import PROJECTS from "@constants/other-projects.json";

/** Other projects section of Projects page */
const OtherProjects: FC = () => {
  return (
    <section className="content flex flex-col md:items-center pt-16 pb-40">
      <h2 className="text-blue">Other Projects</h2>
      <hr className="hidden md:block w-20 mt-4 mb-8 md:mb-16 lg:mb-24 text-blue" />
      <div className="max-w-full flex space-x-4 md:space-x-10 py-4 overflow-x-auto snap-mandatory snap-x snap-always">
        {PROJECTS.map((project) => (
          <Fragment key={project.name}>
            <ProjectCard project={project} />
          </Fragment>
        ))}
      </div>
    </section>
  );
};

export default OtherProjects;
