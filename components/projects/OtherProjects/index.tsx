import { FC } from "react";
import ProjectCard from "@components/projects/OtherProjects/ProjectCard";
import PROJECTS from "@constants/other-projects.json";

/** Other projects section of Projects page */
const OtherProjects: FC = () => {
  return (
    <section className="flex flex-col items-center px-4 pt-24 pb-32">
      <h2 className="text-blue">Other Projects</h2>
      <hr className="w-20 mt-4 mb-24 text-blue" />
      <div className="flex gap-10">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
};

export default OtherProjects;
