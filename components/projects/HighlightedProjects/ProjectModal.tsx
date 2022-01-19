import { FC } from "react";
import Button from "@components/common/Button";
import { HighlightedProject } from "@components/projects/types";

type Props = {
  readonly project: HighlightedProject;
  readonly open: boolean;
  readonly onClose: () => void;
};

/** Highlighted project modal */
const ProjectModal: FC<Props> = ({ project, open, onClose }) => {
  const { name, terms, githubUrl, about, solution, quote, image } = project;

  return open ? (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 flex justify-center items-center p-4 bg-black bg-opacity-20 z-40"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="max-w-[1200px] relative flex flex-col px-12 py-11 rounded-3xl bg-white shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button onClick={onClose}>
            <img
              className="absolute right-8"
              src="/common/close.svg"
              alt="Close"
            />
          </button>

          {/* Modal header (name, terms, links) */}
          <header className="flex justify-between">
            <div>
              <h3>{name}</h3>
              <p className="text-charcoal-500">{terms}</p>
            </div>
            <div className="flex items-center space-x-8 pr-12">
              <Button variant="secondary">View Case Study</Button>
              <a href={githubUrl} target="_blank">
                <img src="/common/github-logo-blue.svg" alt="GitHub logo" />
              </a>
            </div>
          </header>

          <hr className="w-full mt-3 mb-6 text-charcoal-300" />

          {/* Modal content */}
          <div className="flex justify-between space-x-8">
            {/* NPO description */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h6 className="mb-1 text-blue">About the non-profit</h6>
                <p>{about}</p>
              </div>
              <div>
                <h6 className="mb-1 text-blue">Our solution</h6>
                <p>{solution}</p>
              </div>
              <div className="flex flex-col">
                <div className="relative z-10 px-12 py-4 rounded-lg bg-sky">
                  <img
                    className="absolute top-4 left-4"
                    src="/projects/open-quotes.svg"
                    alt="Open quotation marks"
                  />
                  <img
                    className="absolute bottom-4 right-4"
                    src="/projects/close-quotes.svg"
                    alt="Close quotation marks"
                  />
                  <p className="font-semibold italic">{quote.text}</p>
                </div>
                <div className="self-end h-[48px] -mt-2 pt-4 px-4 rounded-b-[20px] bg-charcoal-100">
                  <p className="inline">- {quote.signature}</p>
                </div>
              </div>
            </div>
            {/* Image */}
            <div className="flex-1">
              <img className="h-full object-cover" src={image} alt={name} />
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default ProjectModal;
