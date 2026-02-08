import { useEffect, useState } from "react";
import { ReviewStage } from "../shared/constants";
import { ReviewSetScoresContext } from "../shared/ReviewContext";
import { ReviewRatingPage } from "../shared/ReviewRatingPage";
import { REVIEW_SKL_SCORING_CRITERIA } from "../shared/rubricConstants";
import { ReviewAnswers } from "./ReviewAnswers";
import { ReviewStageProps } from "./ReviewInfoStage";
import { ReviewRubric } from "./ReviewRubric";

export const ReviewSkillStage = ({
  name,
  application,
  scores,
}: ReviewStageProps) => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const resumeLink = application?.resumeUrl;

  useEffect(() => {
    const roleSpecificStr = application?.roleSpecificQuestions[0];
    if (!roleSpecificStr) return;
    const roleSpecificStrJSON = JSON.parse(roleSpecificStr);

    const questionsData = roleSpecificStrJSON[0]?.questions || [];

    const tempQuestions = questionsData.map(
      (item: { question?: string; response?: string | string[] }) =>
        item.question || "",
    );
    const tempAnswers = questionsData.flatMap(
      (item: { question?: string; response?: string | string[] }) => {
        if (Array.isArray(item.response)) {
          return [item.response.join(", ")];
        } else {
          return item.response;
        }
      },
    );

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
          scoringCriteria={REVIEW_SKL_SCORING_CRITERIA}
          scores={scores}
          currentStage={ReviewStage.SKL}
        />
      }
      currentStageAnswers={
        <ReviewAnswers questions={questions} answers={answers} />
      }
      resumeLink={resumeLink}
      scores={scores}
      contextConsumer={
        <ReviewSetScoresContext.Consumer>
          {(updateScore) => (
            <div className="flex items-center justify-end">
              <input
                type="number"
                pattern="[1-4]"
                value={scores[ReviewStage.SKL]}
                onChange={(event) => {
                  if (event.target.validity.valid) {
                    updateScore?.(
                      ReviewStage.SKL,
                      parseInt(event.target.value),
                    );
                  }
                }}
              />
              <h5 className="text-red-500 inline-block px-2 text-xl">*</h5>
            </div>
          )}
        </ReviewSetScoresContext.Consumer>
      }
    />
  );
};
