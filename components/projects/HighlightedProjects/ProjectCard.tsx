import { FC } from "react";
import { HighlightedProject } from "@components/projects/types";

type Props = {
  readonly project: HighlightedProject;
};

/** Highlighted project card */
const ProjectCard: FC<Props> = ({ project }) => {
  const { name, type, solution, image } = project;

  return (
    <div className="max-w-lg flex flex-col rounded-xl shadow-lg overflow-hidden">
      {/* Image and project type */}
      <div className="relative">
        <div className="h-8 absolute top-3 right-3 flex justify-center items-center px-3 rounded-lg bg-sky">
          <p className="text-[12px]">{type}</p>
        </div>
        <img className="h-36 w-full object-cover" src={image} alt={name} />
      </div>

      {/* Project name and description */}
      <div className="flex-1 relative flex flex-col items-center gap-4 pt-5 px-8 pb-12">
        <h5>{name}</h5>
        <hr className="w-12" />
        <p className="text-center line-clamp-2">{solution}</p>

        <button className="absolute bottom-4 right-4">
          <img src="/common/expand.svg" alt="Expand" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
