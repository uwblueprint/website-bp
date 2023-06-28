import { ReviewStage } from "pages/review";
import { ReviewRatingPage } from "../shared/reviewRatingPage";
import { ReviewRubric } from "./reviewRubric";
import { ReviewAnswers } from "./reviewAnswers";

interface Props {
  scores: Map<ReviewStage, number>;
}

const reviewTPScoringCriteria = [
  "Does not provide a relevant cause that resonates with them. Example: I'm really involved in social good causes, I'm a very emphathetic person so I tend to resonate with them when I come across something negative in the world",
  "Does not provide a relevant cause that resonates with them. Example: I'm really involved in social good causes, I'm a very emphathetic person so I tend to resonate with them when I come across something negative in the world",
  "Does not provide a relevant cause that resonates with them. Example: I'm really involved in social good causes, I'm a very emphathetic person so I tend to resonate with them when I come across something negative in the world",
  "Does not provide a relevant cause that resonates with them. Example: I'm really involved in social good causes, I'm a very emphathetic person so I tend to resonate with them when I come across something negative in the world",
  "Does not provide a relevant cause that resonates with them. Example: I'm really involved in social good causes, I'm a very emphathetic person so I tend to resonate with them when I come across something negative in the world",
];

const sampleQuestions = [
  "Tell us about a time you learned a new skill. What was your motivation to learn it and what was your approach?",
  "Bonus: Tell us about a cause that resonates with you",
];

const sampleAnswers = [
  "The organization I'm volunteering for right now, IleTTonna, is a healthcare startup devoted to helping those struggling through the postpartum period. To be completely honest, it's mission didn't resonate with me as much as it does now than when I first started. At the beginning, I wasn't sure how helpful what we were doing was because our audience seemed to sniche. But now, after meeting with stakeholders and launching our MVP, we're getting a lot of responses. Seeing the impact of your work is incredible and does a lot to inspire more hard work. ",
  "The organization I'm volunteering for right now, IleTTonna, is a healthcare startup devoted to helping those struggling through the postpartum period. To be completely honest, it's mission didn't resonate with me as much as it does now than when I first started. At the beginning, I wasn't sure how helpful what we were doing was because our audience seemed to sniche. But now, after meeting with stakeholders and launching our MVP, we're getting a lot of responses. Seeing the impact of your work is incredible and does a lot to inspire more hard work. ",
];

export const ReviewTeamPlayerStage: React.FC<Props> = ({ scores }) => {
  return (
    <ReviewRatingPage
      studentName="M. Goose"
      title="Team player"
      currentStage={ReviewStage.TP}
      currentStageRubric={
        <ReviewRubric
          scoringCriteria={reviewTPScoringCriteria}
          scores={scores}
          currentStage={ReviewStage.TP}
        />
      }
      currentStageAnswers={
        <ReviewAnswers questions={sampleQuestions} answers={sampleAnswers} />
      }
      scores={scores}
    />
  );
};
