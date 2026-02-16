import Button from "@components/common/Button";
import Image from "next/image";
import { useState } from "react";
import { ApplicationDTO } from "../../../types";
import { ReviewStage } from "../shared/constants";
import { extractShortAnswerData } from "../shared/reviewUtils";
import { ReviewScores } from "../shared/types";
import { ReviewAnswers } from "./ReviewAnswers";
import { ReviewPageLayout, PanelLeft, PanelRight } from "../layout";

export interface ReviewStageProps {
  name: string;
  application: ApplicationDTO | undefined;
  scores: ReviewScores;
}

const InfoBanner = () => (
  <div className="flex flex-col place-items-center justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 space-y-8 place-content-center h-full m-auto w-full">
    <div>
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
);

type ConflictModalProps = {
  readonly name: string | undefined;
  readonly open: boolean;
  readonly onClose: () => void;
};

const INFO_QUESTIONS = [
  "Email",
  "Program",
  "Academic Term",
  "Where did you hear about us?",
  "How many times have you applied to Blueprint in the past?",
  "Pronouns",
  "Will you be in an academic (school) term or a co-op term?",
  "Position",
];

const ConflictModal = ({ name, open, onClose }: ConflictModalProps) => {
  return open ? (
    <div
      className="fixed inset-0 flex justify-center items-end md:items-center md:p-4 bg-black bg-opacity-20 z-40 m-0"
      onClick={onClose}
    >
      <div
        className="md:max-w-[310px] relative flex flex-col px-6 md:px-12 pt-4 pb-4 rounded-t-3xl md:rounded-3xl bg-white shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between space-x-8">
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
  ) : null;
};

export const ReviewInfoStage = ({
  name,
  application,
  scores,
}: ReviewStageProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const shortAnswerStr = application?.shortAnswerQuestions[0];
  const shortAnswerJSON = shortAnswerStr ? JSON.parse(shortAnswerStr) : [];
  const { extractedAnswers } = extractShortAnswerData(shortAnswerJSON);

  const answers = [
    application?.email ?? "",
    application?.program ?? "",
    application?.academicYear ?? "",
    application?.heardFrom ?? "",
    application?.timesApplied ?? "",
    application?.pronouns ?? "",
    application?.academicOrCoop ?? "",
    application?.firstChoiceRole ?? "",
    ...extractedAnswers,
  ];

  return (
    <>
      <ConflictModal
        name={name}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <ReviewPageLayout currentStage={ReviewStage.INFO} scores={scores}>
        <PanelLeft>
          <InfoBanner />
        </PanelLeft>
        <PanelRight title="Basic Information" studentName={name}>
          <div className="flex flex-col gap-4">
            <ReviewAnswers questions={INFO_QUESTIONS} answers={answers} />
          </div>
        </PanelRight>
      </ReviewPageLayout>
    </>
  );
};
