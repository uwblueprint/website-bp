import Image from "next/image";
import React from "react";
import { ApplicationDTO } from "../../../types";
import { ReviewStage } from "../shared/constants";
import { extractShortAnswerData } from "../shared/reviewUtils";
import { ReviewScores } from "../shared/types";
import { ReviewAnswers } from "./ReviewAnswers";
import { ReviewPageLayout, PanelLayout } from "../layout";

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

export const ReviewInfoStage = ({
  name,
  application,
  scores,
}: ReviewStageProps): React.ReactElement => {
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
    <ReviewPageLayout currentStage={ReviewStage.INFO} scores={scores}>
      <PanelLayout
        variant="sky"
        borderRight
        backToHomeHref="/admin"
        showApplicationTitle={false}
      >
        <InfoBanner />
      </PanelLayout>
      <PanelLayout title="Basic Information" subtitle={`${name}'s Application`}>
        <div className="flex flex-col gap-4">
          <ReviewAnswers questions={INFO_QUESTIONS} answers={answers} />
        </div>
      </PanelLayout>
    </ReviewPageLayout>
  );
};
