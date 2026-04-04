import { ReactElement, useContext } from "react";
import { ApplicationDTO } from "../../../types";
import { ReviewStage } from "../shared/constants";
import { ReviewSetScoresContext } from "../shared/ReviewContext";
import { getShortAnswerAtIndex } from "../shared/reviewUtils";
import { REVIEW_PFSG_SCORING_CRITERIA } from "../shared/rubricConstants";
import { ReviewScores } from "../shared/types";
import { ReviewScoredStageLayout } from "../layout";

export interface Props {
  name: string;
  application: ApplicationDTO | undefined;
  scores: ReviewScores;
}

export const ReviewPassionForSocialGoodStage = ({
  name,
  application,
  scores,
}: Props): ReactElement => {
  const updateScore = useContext(ReviewSetScoresContext);
  const passionForSocialGoodAnswer = getShortAnswerAtIndex(
    application?.shortAnswerQuestions[0],
    1,
  );

  return (
    <ReviewScoredStageLayout
      applicantName={name}
      currentStage={ReviewStage.PFSG}
      onScoreChange={(value) => updateScore?.(ReviewStage.PFSG, value)}
      questions={[passionForSocialGoodAnswer.question]}
      answers={[passionForSocialGoodAnswer.response ?? ""]}
      score={scores[ReviewStage.PFSG]}
      scoreLabel="Scoring for Passion for Social Good (PFSG)"
      scoringCriteria={REVIEW_PFSG_SCORING_CRITERIA}
      scores={scores}
      title="Passion for social good"
    />
  );
};
