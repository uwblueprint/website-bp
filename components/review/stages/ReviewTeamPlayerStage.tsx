import { ReactElement, useContext } from "react";
import { ApplicationDTO } from "../../../types";
import { ReviewStage } from "../shared/constants";
import { ReviewSetScoresContext } from "../shared/ReviewContext";
import { getShortAnswerAtIndex } from "../shared/reviewUtils";
import { REVIEW_TP_SCORING_CRITERIA } from "../shared/rubricConstants";
import { ReviewScores } from "../shared/types";
import { ReviewScoredStageLayout } from "../layout";

interface Props {
  name: string;
  application: ApplicationDTO | undefined;
  scores: ReviewScores;
}

export const ReviewTeamPlayerStage = ({
  name,
  application,
  scores,
}: Props): ReactElement => {
  const updateScore = useContext(ReviewSetScoresContext);
  const teamPlayerAnswer = getShortAnswerAtIndex(
    application?.shortAnswerQuestions[0],
    2,
  );
  const { TP } = ReviewStage;

  return (
    <ReviewScoredStageLayout
      applicantName={name}
      currentStage={TP}
      onScoreChange={(value) => updateScore?.(TP, value)}
      questions={[teamPlayerAnswer.question]}
      answers={[teamPlayerAnswer.response ?? ""]}
      score={scores[TP]}
      scoreLabel="Scoring for Team Player (TEAM)"
      scoringCriteria={REVIEW_TP_SCORING_CRITERIA}
      scores={scores}
      title="Team player"
    />
  );
};
