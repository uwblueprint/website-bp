import Image from "next/image";
import { ReactElement } from "react";
import { ApplicationDTO } from "../../../types";
import { BACK_TO_HOME_HREF, ReviewStage } from "../shared/constants";
import { ReportConflictButton } from "../shared/ReportConflictButton";
import { ReviewScores } from "../shared/types";
import { ReviewAnswers } from "./ReviewAnswers";
import { ReviewPageLayout, PanelLayout } from "../layout";

export interface ReviewStageProps {
  name: string;
  application: ApplicationDTO | undefined;
  scores: ReviewScores;
}

type ShortAnswer = {
  question?: string;
  response?: string;
};

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

const getFirstShortAnswer = (
  serializedShortAnswers?: string,
): ShortAnswer | null => {
  if (!serializedShortAnswers) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(serializedShortAnswers) as ShortAnswer[];
    if (!Array.isArray(parsedValue) || !parsedValue[0]?.question) {
      return null;
    }

    return parsedValue[0];
  } catch {
    return null;
  }
};

export const ReviewInfoStage = ({
  name,
  application,
  scores,
}: ReviewStageProps): ReactElement => {
  const firstShortAnswer = getFirstShortAnswer(
    application?.shortAnswerQuestions[0],
  );
  const questions = firstShortAnswer?.question
    ? [...INFO_QUESTIONS, firstShortAnswer.question]
    : INFO_QUESTIONS;
  const subtitle = name ? `${name}'s Application` : "Application";

  const answers = [
    application?.email ?? "",
    application?.program ?? "",
    application?.academicYear ?? "",
    application?.heardFrom ?? "",
    application?.timesApplied ?? "",
    application?.pronouns ?? "",
    application?.academicOrCoop ?? "",
    application?.firstChoiceRole ?? "",
    ...(firstShortAnswer?.question ? [firstShortAnswer.response ?? ""] : []),
  ];

  return (
    <ReviewPageLayout
      currentStage={ReviewStage.INFO}
      scores={scores}
      disableNavigation
    >
      <PanelLayout
        variant="sky"
        borderRight
        backToHomeHref={BACK_TO_HOME_HREF}
        disableBackToHome
        headerRightAction={<ReportConflictButton name={name} showQuestion />}
        showApplicationTitle={false}
        contentClassName="flex min-h-0 flex-1 items-center justify-center"
      >
        <InfoBanner />
      </PanelLayout>
      <PanelLayout title="Basic Information" subtitle={subtitle}>
        <div className="mt-2 flex w-full flex-col">
          <ReviewAnswers questions={questions} answers={answers} />
        </div>
      </PanelLayout>
    </ReviewPageLayout>
  );
};
