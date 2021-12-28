import { FC } from "react";
import ProjectCard from "@components/projects/HighlightedProjects/ProjectCard";
import PROJECTS from "@constants/highlighted-projects.json";

/** Highlighted Projects section of Projects page */
const HighlightedProjects: FC = () => {
  return (
    <section className="content flex flex-col items-center py-24">
      <h2 className="text-blue">Highlighted Projects</h2>
      <hr className="w-20 mt-4 mb-24 text-blue" />
      <div className="grid grid-cols-2 grid-rows-2 gap-10">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
};

export default HighlightedProjects;
