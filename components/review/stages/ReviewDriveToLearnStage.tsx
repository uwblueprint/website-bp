import { ReactElement, useContext } from "react";
import { ApplicationDTO } from "../../../types";
import { ReviewStage } from "../shared/constants";
import { ReviewSetScoresContext } from "../shared/ReviewContext";
import { getShortAnswerAtIndex } from "../shared/reviewUtils";
import { REVIEW_D2L_SCORING_CRITERIA } from "../shared/rubricConstants";
import { ReviewScores } from "../shared/types";
import { ReviewScoredStageLayout } from "../layout";

interface Props {
  name: string;
  application: ApplicationDTO | undefined;
  scores: ReviewScores;
}

export const ReviewDriveToLearnStage = ({
  name,
  application,
  scores,
}: Props): ReactElement => {
  const updateScore = useContext(ReviewSetScoresContext);
  const driveToLearnAnswer = getShortAnswerAtIndex(
    application?.shortAnswerQuestions[0],
    3,
  );

  return (
    <ReviewScoredStageLayout
      applicantName={name}
      currentStage={ReviewStage.D2L}
      onScoreChange={(value) => updateScore?.(ReviewStage.D2L, value)}
      questions={[driveToLearnAnswer.question]}
      answers={[driveToLearnAnswer.response ?? ""]}
      score={scores[ReviewStage.D2L]}
      scoreLabel="Scoring for Drive to Learn (LEARN)"
      scoringCriteria={REVIEW_D2L_SCORING_CRITERIA}
      scores={scores}
      title="Drive to learn"
    />
  );
};
