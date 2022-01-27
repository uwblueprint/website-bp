import { FC, useState } from "react";
import ProjectModal from "@components/projects/HighlightedProjects/ProjectModal";
import { HighlightedProject } from "@components/projects/types";

type Props = {
  readonly project: HighlightedProject;
};

/** Highlighted project card */
const ProjectCard: FC<Props> = ({ project }) => {
  const { name, type, solution, image } = project;

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Card */}
      <button
        className="w-card md:w-auto flex-none max-w-lg snap-start"
        onClick={() => setModalOpen(true)}
      >
        <div className="flex flex-col rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
          {/* Image and project type */}
          <div className="relative">
            <div className="hidden md:flex h-8 absolute top-3 right-3 justify-center items-center px-3 rounded-lg bg-sky">
              <p className="text-[12px]">{type}</p>
            </div>
            <img className="h-36 w-full object-cover" src={image} alt={name} />
          </div>

          {/* Project name and description */}
          <div className="flex-1 relative flex flex-col items-center space-y-3 md:space-y-4 p-5 pb-8 md:pt-5 md:px-8 md:pb-12">
            <h5 className="text-lg font-semibold">{name}</h5>
            <hr className="hidden md:block w-12" />
            <p className="text-center line-clamp-4 md:line-clamp-2">
              {solution}
            </p>
          </div>
        </div>
      </button>

      {/* Modal */}
      <ProjectModal
        project={project}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default ProjectCard;
