import { FC } from "react";
import { OtherProject } from "@components/projects/types";

type Props = {
  readonly project: OtherProject;
};

/** Highlighted project card */
const ProjectCard: FC<Props> = ({ project }) => {
  const { name, type, linkText, githubUrl, description, image } = project;

  return (
    <div className="w-80 flex-shrink-0 flex flex-col space-y-9 p-6 rounded-3xl shadow-lg overflow-hidden">
      {/* Image and project type */}
      <div className="flex justify-between">
        <img src={image} alt={name} />
        <div className="h-8 flex justify-center items-center px-3 rounded-lg bg-sky">
          <p className="text-[12px]">{type}</p>
        </div>
      </div>

      {/* Project name and description */}
      <div className="flex-1 relative flex flex-col space-y-2">
        <h5>{name}</h5>
        <p>
          {description.map((text, i) =>
            i === 0 ? (
              <p className="mb-4">
                <a href={githubUrl} target="_blank" className="text-blue">
                  {linkText || name}
                </a>{" "}
                {text}
              </p>
            ) : (
              <p>{text}</p>
            ),
          )}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
