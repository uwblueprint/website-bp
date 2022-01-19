import { FC } from "react";
import ProjectCard from "@components/projects/OtherProjects/ProjectCard";
import PROJECTS from "@constants/other-projects.json";

/** Other projects section of Projects page */
const OtherProjects: FC = () => {
  return (
    <section className="content flex flex-col items-center pt-24 pb-32">
      <h2 className="text-blue">Other Projects</h2>
      <hr className="w-20 mt-4 mb-24 text-blue" />
      <div className="max-w-full flex space-x-10 -m-4 p-4 overflow-x-auto">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
};

export default OtherProjects;
