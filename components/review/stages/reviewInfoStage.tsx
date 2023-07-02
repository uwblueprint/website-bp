import { FC, useState } from "react";
import { ReviewStage } from "pages/review";
import { ReviewSplitPanelPage } from "../shared/reviewSplitPanelPage";
import Button from "@components/common/Button";

import Image from "next/image";
import WarningIcon from "@components/icons/warning.icon";

type Props = {
  readonly question: string;
  readonly answer: string;
};

const data = [
  { question: "Email", answer: "matthew.wang@uwblueprint.org" },
  { question: "Program", answer: "Computer Science" },
  { question: "Academic Term", answer: "4A" },
  { question: "Where did you hear about us?", answer: "Word of mouth" },
  {
    question: "How many times have you applied to Blueprint in the past?",
    answer: "This is my first time!",
  },
  { question: "Pronouns", answer: "He/Him/His" },
  {
    question: "Will you be in an academic (school) term or a co-op term?",
    answer: "Academic",
  },
  { question: "Position", answer: "Product Designer" },
  {
    question: "What timezone will you be based out of?",
    answer: "I will be based out of the Eastern timezone.",
  },
];

const QuestionAnswer: FC<Props> = ({ question, answer }) => {
  return (
    <div className="pt-[24px]">
      <p className="text-[16px] font-poppins pb-[4px]">{question}</p>
      <p className="text-[16px] font-source text-charcoal-500">{answer}</p>
    </div>
  );
};

type ConflictModalProps = {
  readonly name: string;
  readonly open: boolean;
  readonly onClose: () => void;
};

/** Highlighted project modal */
const ConflictModal: FC<ConflictModalProps> = ({ name, open, onClose }) => {
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
          className="md:max-w-[400px] relative flex flex-col px-4 md:px-12 pt-4 pb-4 rounded-t-3xl md:rounded-3xl bg-white shadow-lg max-h-[calc(100vh-2rem)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal header */}
          <header className="flex flex-col justify-between relative mb-4">
            <button
              className="absolute right-0 top-2 lg:-right-6 lg:-top-2"
              onClick={onClose}
            >
              <img src="/common/close.svg" alt="Close" />
            </button>
          </header>
          {/* Modal content */}
          <div className="flex justify-between space-x-8 ">
            {/* NPO description */}
            <div className="flex flex-col justify-between space-y-6 md:space-y-8">
              <div>
                <h6 className="mb-1 text-blue">Report a conflict</h6>
                <p className="text-[16px] font-source text-charcoal-500">
                  Do you know {name} and want to report a conflict?
                </p>
              </div>

              <div className="flex justify-center space-x-6">
                <Button
                  variant="secondary"
                  onClick={onClose}
                  className="whitespace-nowrap"
                >
                  No
                </Button>
                <Button
                  variant="primary"
                  onClick={onClose}
                  className="whitespace-nowrap"
                >
                  Yes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export const ReviewInfoStage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <ReviewSplitPanelPage
      studentName="Matthew Wang"
      rightTitle="Basic Information"
      currentStage={ReviewStage.INFO}
      leftContent={
        <div className="flex flex-col place-items-center space-y-8 place-content-center h-full">
          <div>
            <Image
              height={87}
              width={440}
              alt="Picture of the Blueprint logo"
              src="/common/review-page-banner.svg"
            />
          </div>
          <div>
            <Image
              height={300}
              width={330}
              alt="Picture of the Blueprint logo"
              src="/common/review-page-people.svg"
            />
          </div>
        </div>
      }
      rightContent={
        <>
          <Button
            variant="secondary"
            onClick={() => setModalOpen(true)}
            className="whitespace-nowrap"
            href={""}
          >
            <div className="flex place-items-center space-x-2">
              <WarningIcon />
              <p>Conflict</p>
            </div>
          </Button>
          {/* Modal */}
          <ConflictModal
            name="Matthew Wang"
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          />
          {data.map((item, index) => {
            return (
              <QuestionAnswer
                key={index}
                question={item.question}
                answer={item.answer}
              />
            );
          })}
        </>
      }
    ></ReviewSplitPanelPage>
  );
};
