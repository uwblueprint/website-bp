import Button from "@components/common/Button";
import WarningOutlineIcon from "@components/icons/warning-outline.icon";
import Image from "next/image";
import { ReactElement } from "react";
import { ApplicationDTO } from "../../../types";
import { ReviewStage } from "../shared/constants";
import {
  extractShortAnswerData,
  getParsedShortAnswers,
} from "../shared/reviewUtils";
import { ReviewScores } from "../shared/types";
import { ReviewAnswers } from "./ReviewAnswers";
import { PanelLayout, ReviewPageLayout } from "../layout";

export interface ReviewStageProps {
  name: string;
  application: ApplicationDTO | undefined;
  scores: ReviewScores;
}

const InfoBanner = () => (
  <div className="flex h-full min-h-[420px] flex-col items-center justify-center px-8 py-12">
    <div className="flex w-full max-w-[440px] flex-col items-start">
      <Image
        height={87}
        width={440}
        alt=""
        src="/common/review-page-banner.svg"
      />
      <p className="self-end pr-[3px] pt-[10px] text-right font-poppins text-[20px] font-medium leading-[1.4] text-black">
        Application Review
      </p>
    </div>
    <div className="mt-[6.5rem] flex w-full justify-center">
      <Image
        height={300}
        width={330}
        alt=""
        src="/common/review-page-people.svg"
      />
    </div>
  </div>
);

const INFO_QUESTIONS = [
  "Email",
  "Program",
  "Academic Term",
  "Where did you hear about us?",
  "How many times have you applied to Blueprint in the past?",
  "What are your preferred pronouns?",
  "Will you be in an academic (school) term or a co-op term?",
  "Position",
];

const InfoHeaderActions = ({ onReport }: { onReport: () => void }) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center xl:justify-end">
      <p className="font-source text-base italic leading-[1.4] text-blue">
        Is the applicant a conflict of interest?
      </p>
      <Button
        size="sm"
        variant="secondary"
        onClick={onReport}
        className="flex items-center gap-2 px-4 py-2 font-source text-base leading-[1.4]"
      >
        <WarningOutlineIcon className="h-5 w-5" />
        Report
      </Button>
    </div>
  );
};

export const ReviewInfoStage = ({
  application,
  scores,
}: ReviewStageProps): ReactElement => {
  const shortAnswerJSON = getParsedShortAnswers(
    application?.shortAnswerQuestions[0],
  );
  const { extractedQuestions, extractedAnswers } =
    extractShortAnswerData(shortAnswerJSON);
  const questions = [...INFO_QUESTIONS, ...extractedQuestions];

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
    <ReviewPageLayout currentStage={ReviewStage.INFO} scores={scores}>
      <PanelLayout
        variant="subtle"
        borderRight
        scrollable={false}
        contentClassName="flex items-center justify-center px-0 pb-0"
      >
        <InfoBanner />
      </PanelLayout>
      <PanelLayout
        title="Basic Information"
        titleButton={<InfoHeaderActions onReport={() => undefined} />}
      >
        <div className="mt-11 flex flex-col">
          <ReviewAnswers questions={questions} answers={answers} />
        </div>
      </PanelLayout>
    </ReviewPageLayout>
  );
};
