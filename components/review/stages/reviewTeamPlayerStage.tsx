import { ReviewStage } from "pages/review";
import { ReviewRatingPage } from "../shared/reviewRatingPage";
import { ReviewRubric } from "./reviewRubric";
import { ReviewAnswers } from "./reviewAnswers";
import { ApplicationDTO } from "types";
import { useEffect, useState } from "react";

interface Props {
  name: string;
  application: ApplicationDTO | undefined;
  scores: Map<ReviewStage, number>;
}
const reviewTPScoringCriteria = [
  "Provides an irrelevant example of a meaningful community. Example has zero personal connection. Example: UW Blueprint seems to be a great community and I'd be proud to be a part of it",
  "Only talks about the community but doesn't mention any contributions made or doesn't indicate why the community is meaningful to the candidate; doesn't have a personal connection. No mention is made of collaboration or group impacts. Example: I'm a part of [x] and I met a lot of great people through it!",
  "Personal and meaningful connection to the community is evident and demonstrates strong contributions to the community. Speaks of the community and its impacts and the candidates impacts on the community with genuine passion. Example: I'm proud to be a part of [x] community because of [x, y, z]. I do [x] for the community by doing [y] because this community [...], etc.",
  "Personal and meaningful connection to the community is evident and demonstrates going above and beyond to contribute to that community. Genuinely talks about collaboration and the impact either the candidate had on the community and/or the impact of the community on the candidate. Example: I have been a part of [x] community for [x] years. It has taught me [x, y, z]. In this community I do [x]. As a result I was able to help the community do [x, y, z], etc.", 
];


export const ReviewTeamPlayerStage: React.FC<Props> = ({
  name,
  application,
  scores,
}) => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const resumeLink = application?.resumeUrl;

  useEffect(() => {
    const shortAnswerStr = application?.shortAnswerQuestions[0];
    if (!shortAnswerStr) return;
    const shortAnswerJSON = JSON.parse(shortAnswerStr);
    const question = shortAnswerJSON[2]?.question
    const answer = shortAnswerJSON[2]?.response;

   setQuestions([question]);
   setAnswers([answer]);

  }, [application])
  return (
    <ReviewRatingPage
      studentName={name}
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
        <ReviewAnswers questions={questions} answers={answers} />
      }
      scores={scores}
    />
  );
};
