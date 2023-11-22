import { ReviewStage } from "pages/review";
import { ReviewRatingPage } from "../shared/reviewRatingPage";
import { ReviewRubric } from "./reviewRubric";
import { ReviewAnswers } from "./reviewAnswers";
import { useState, useEffect } from "react";
import { ReviewStageProps } from "./reviewInfoStage";

const reviewSKLScoringCriteria = [
  "Does not possess any of the technical skills necessary for their role.",
  "Has some familiarity with some technologies and would be able to contribute with help.",
  "Has strong prior experience with 1+ technology and is familiar with other technologies. Would be able to contribute independently.",
  "Has lots of prior experience and knowledge relevant to the specific role. Is technical ly mature and would be a strong mentor for others.",
];

export const ReviewSkillStage: React.FC<ReviewStageProps> = ({
  name,
  application,
  scores,
}) => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const resumeLink = application?.resumeUrl;

  useEffect(() => {
    const roleSpecificStr = application?.roleSpecificQuestions[0];
    if (!roleSpecificStr) return;
    const roleSpecificStrJSON = JSON.parse(roleSpecificStr);

    const questionsData = roleSpecificStrJSON[0]?.questions || [];

    const tempQuestions = questionsData.map((item) => item.question || "");
    const tempAnswers = questionsData.flatMap((item) => {
      if (Array.isArray(item.response)) {
        return [item.response.join(", ")];
      } else {
        return item.response;
      }
    });

    setQuestions(tempQuestions);
    setAnswers(tempAnswers);
  }, [application]);

  return (
    <ReviewRatingPage
      studentName={name}
      title="Skill"
      currentStage={ReviewStage.SKL}
      currentStageRubric={
        <ReviewRubric
          scoringCriteria={reviewSKLScoringCriteria}
          scores={scores}
          currentStage={ReviewStage.SKL}
        />
      }
      currentStageAnswers={
        <ReviewAnswers questions={questions} answers={answers} />
      }
      resumeLink={resumeLink}
      scores={scores}
    />
  );
};
