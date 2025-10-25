import { ReviewStage } from "pages/review";
import { ReviewRatingPage } from "../shared/reviewRatingPage";
import { ReviewRubric } from "./reviewRubric";
import { ReviewAnswers } from "./reviewAnswers";
import { useState, useEffect } from "react";
import { ReviewStageProps } from "./reviewInfoStage";
import { ReviewSetScoresContext } from "../shared/reviewContext";

const reviewSKLScoringCriteria = [
  "Has never done any learning related to their role at all. Example: has no relevant coursework, projects, or experience",
  "Minimal skill fit with Blueprint. Example: listing languages learned in class but minimal demonstrated projects or use of frameworks to back it up. Has only 1-3 projects with relevant experience",
  "Has familiarity with some technologies and would be able to contribute with occasional guidance. Example: 1-2 terms of directly relevant experience OR strong projects with relevant technologies",
  "Has strong prior experience with 1+ technologies and is familiar with other technologies. Would be an independent contributor. Example: 3+ terms of directly relevant experience OR  multiple projects with notable impact",
  "Has lots of prior experience and knowledge relevant to the specific role. Would be a strong mentor for others.  Note: Candidates rated 5 would be close to the level of a PL.",
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
      application={application}
      contextConsumer={
        <ReviewSetScoresContext.Consumer>
          {(updateScore) => (
            <div className="flex items-center justify-end">
              <input
                type="number"
                pattern="[1-4]"
                value={scores.get(ReviewStage.SKL)}
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
