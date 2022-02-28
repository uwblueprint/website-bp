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
  const {
    name,
    terms,
    caseStudyUrl,
    githubUrl,
    about,
    solution,
    quote,
    image,
  } = project;

  return open ? (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 flex justify-center items-end md:items-center md:p-4 bg-black bg-opacity-20 z-40"
        style={{ margin: "0" }}
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="md:max-w-[1200px] relative flex flex-col px-4 md:px-12 pt-10 pb-16 rounded-t-3xl md:rounded-3xl bg-white shadow-lg max-h-[calc(100vh-2rem)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal header (name, terms, links) */}
          <header className="flex flex-col justify-between relative mb-4">
            <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:items-center mb-1.5 md:mb-0">
              <div className="w-full">
                <h3>{name}</h3>
                <p className="text-charcoal-500">{terms}</p>
              </div>
              <div className="flex items-center space-x-4 lg:space-x-6 mr-6">
                <Button
                  variant="secondary"
                  className="whitespace-nowrap"
                  href={caseStudyUrl}
                >
                  View Case Study
                </Button>
                <a href={githubUrl} className="w-10 md:w-12" target="_blank">
                  <img src="/common/github-logo-blue.svg" alt="GitHub logo" />
                </a>
              </div>
              {/* Close button */}
            </div>
            <button
              className="absolute right-0 top-2 lg:-right-6 lg:-top-2"
              onClick={onClose}
            >
              <img src="/common/close.svg" alt="Close" />
            </button>
          </header>

          <hr className="w-full mt-6 mb-8 md:mt-3 md:mb-6 text-charcoal-300" />

          {/* Modal content */}
          <div className="flex justify-between space-x-8 overflow-y-scroll">
            {/* NPO description */}
            <div className="flex flex-col justify-between space-y-6 md:space-y-8">
              <div>
                <h6 className="mb-1 text-blue">About the non-profit</h6>
                <p>{about}</p>
              </div>
              <div>
                <h6 className="mb-1 text-blue">Our solution</h6>
                <p>{solution}</p>
              </div>
              <div className="hidden md:flex flex-col">
                <div className="relative z-10 px-12 py-6 rounded-lg bg-sky">
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
                <div className="self-end -mt-2 p-4 rounded-b-[20px] bg-charcoal-100">
                  <p className="inline">- {quote.signature}</p>
                </div>
              </div>
            </div>
            {/* Image */}
            <div className="hidden md:block">
              <img
                className="w-full h-full object-cover"
                src={image}
                alt={name}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default ProjectModal;
