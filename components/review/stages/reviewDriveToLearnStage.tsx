import { ReviewStage } from "pages/review";
import { ReviewRatingPage } from "../shared/reviewRatingPage";
import { ReviewRubric } from "./reviewRubric";
import { ReviewAnswers } from "./reviewAnswers";
import { ApplicationDTO } from "types";
import { useEffect, useState } from "react";
import { ReviewSetScoresContext } from "../shared/reviewContext";

interface Props {
  name: string;
  application: ApplicationDTO | undefined;
  scores: Map<ReviewStage, number>;
}

const reviewD2LScoringCriteria = [
  "Application questions are clearly thrown together at the last minute. Answers are short and shallow.",
  "No indication of learning pursued outside of class / work. Example: no participation in other clubs / organizations, online courses, side projects, etc.",
  "Some learning demonstrated outside of class / work, but all are minimal or non-self guided. Example: general member of a club, course group project, taking a popular Udemy course",
  "Demonstrates some self-guided learning outside of class and work. Example: working on a noteworthy side project, deep pursuit of an interest, participation in a competitive team, applying newly learned frameworks from school or work etc.",
  "Demonstrates a high level self-guided learning outside of class and work. Example: outstanding or non conventional projects / initiatives that clearly tie an applicant’s personal development goals with something new and creative.",
];

export const ReviewDriveToLearnStage: React.FC<Props> = ({
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
    const question = shortAnswerJSON[3]?.question;
    const answer = shortAnswerJSON[3]?.response;

    setQuestions([question]);
    setAnswers([answer]);
  }, [application]);
  return (
    <ReviewRatingPage
      studentName={name}
      title="Drive to learn"
      currentStage={ReviewStage.D2L}
      currentStageRubric={
        <ReviewRubric
          scoringCriteria={reviewD2LScoringCriteria}
          scores={scores}
          currentStage={ReviewStage.D2L}
        />
      }
      currentStageAnswers={
        <ReviewAnswers questions={questions} answers={answers} />
      }
      scores={scores}
      contextConsumer={
        <ReviewSetScoresContext.Consumer>
          {(updateScore) => (
            <div className="flex items-center justify-end">
              <input
                type="number"
                pattern="[1-4]"
                value={scores.get(ReviewStage.D2L)}
                onChange={(event) => {
                  if (event.target.validity.valid) {
                    updateScore?.(
                      ReviewStage.D2L,
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
