import { FC } from "react";
import ProjectCard from "@components/projects/HighlightedProjects/ProjectCard";
import PROJECTS from "@constants/highlighted-projects.json";

/** Highlighted Projects section of Projects page */
const HighlightedProjects: FC = () => {
  return (
    <section className="content flex flex-col md:items-center py-24 pr-0 md:pr-4">
      <h2 className="text-blue mb-6 md:mb-0">Highlighted Projects</h2>
      <hr className="hidden md:block w-20 mt-4 md:mb-16 lg:mb-24 text-blue" />
      <div className="flex overflow-x-auto snap-mandatory snap-x snap-always space-x-4 md:space-x-0 last:pr-4 md:last:pr-0 pb-4 pt-2 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-10 ">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
  ß;
};

export default HighlightedProjects;
