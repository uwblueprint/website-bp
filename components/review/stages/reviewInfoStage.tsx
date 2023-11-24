import { FC, useState, useEffect } from "react";
import { ReviewStage } from "pages/review";
import { ReviewSplitPanelPage } from "../shared/reviewSplitPanelPage";
import Button from "@components/common/Button";
import Image from "next/image";
import WarningIcon from "@components/icons/warning.icon";
import { ApplicationDTO } from "types";
import { ReviewAnswers } from "./reviewAnswers";
import { ConflictModalProps } from "types";
import { extractShortAnswerData } from "pages/review";

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
          className="md:max-w-[310px] relative flex flex-col px-6 md:px-12 pt-4 pb-4 rounded-t-3xl md:rounded-3xl bg-white shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal content */}
          <div className="flex justify-between space-x-8 ">
            {/* Description */}
            <div className="flex flex-col justify-between space-y-4 text-center">
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

export interface ReviewStageProps {
  name: string;
  application: ApplicationDTO | undefined;
  scores: Map<ReviewStage, number>;
}

export const ReviewInfoStage: React.FC<ReviewStageProps> = ({
  name,
  application,
  scores,
}) => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    const shortAnswerStr = application?.shortAnswerQuestions[0];
    if (!shortAnswerStr) {
      return;
    }

    const shortAnswerJSON = JSON.parse(shortAnswerStr);
    const { extractedAnswers } = extractShortAnswerData(shortAnswerJSON);

    setQuestions([
      ...questions,
      "Email",
      "Program",
      "Academic Term",
      "Where did you hear about us?",
      "How many times have you applied to Blueprint in the past?",
      "Pronouns",
      "Will you be in an academic (school) term or a co-op term?",
      "Position",
    ]);

    setAnswers([
      ...answers,
      application?.email ?? "",
      application?.program ?? "",
      application?.academicYear ?? "",
      application?.heardFrom ?? "",
      application?.timesApplied ?? "",
      application?.pronouns ?? "",
      application?.academicOrCoop ?? "",
      application?.firstChoiceRole ?? "",
      ...extractedAnswers,
    ]);
  }, [application]);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <ReviewSplitPanelPage
      studentName={name}
      rightTitle="Basic Information"
      rightTitleButton={
        <Button
          variant="secondary"
          onClick={() => setModalOpen(true)}
          className="whitespace-nowrap"
          size="sm"
        >
          <div className="flex place-items-center space-x-2">
            <WarningIcon />
            <p>Conflict</p>
          </div>
        </Button>
      }
      currentStage={ReviewStage.INFO}
      leftContent={
        <div className="flex flex-col place-items-center justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 space-y-8 place-content-center h-full m-auto w-full">
          <div className="">
            <Image
              height={87}
              width={440}
              alt=""
              src="/common/review-page-banner.svg"
            />
          </div>
          <div>
            <Image
              height={300}
              width={330}
              alt=""
              src="/common/review-page-people.svg"
            />
          </div>
        </div>
      }
      rightContent={
        <>
          {/* Modal */}
          <ConflictModal
            name={name}
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          />
          <div className="flex flex-col gap-4">
            <ReviewAnswers questions={questions} answers={answers} />
          </div>
        </>
      }
      scores={scores}
    ></ReviewSplitPanelPage>
    
  );
};
