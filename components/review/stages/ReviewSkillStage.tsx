import { ReviewStage } from "@components/review/shared/constants";
import { ReviewRatingPage } from "../shared/ReviewRatingPage";
import { ReviewRubric } from "./ReviewRubric";
import { ReviewAnswers } from "./ReviewAnswers";
import { useMemo } from "react";
import { ReviewStageProps } from "./ReviewInfoStage";
import { ReviewSetScoresContext } from "../shared/ReviewContext";

type RoleSpecificQuestion = {
  readonly question?: string;
  readonly response?: string | string[];
};

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
  const { questions, answers } = useMemo(() => {
    const roleSpecificStr = application?.roleSpecificQuestions[0];
    if (!roleSpecificStr) {
      return { questions: [], answers: [] };
    }

    try {
      const roleSpecificStrJSON = JSON.parse(roleSpecificStr) as Array<{
        questions?: RoleSpecificQuestion[];
      }>;

      const questionsData: RoleSpecificQuestion[] =
        roleSpecificStrJSON[0]?.questions ?? [];

      const parsedQuestions = questionsData.map((item) => item.question ?? "");
      const parsedAnswers = questionsData.map((item) => {
        if (Array.isArray(item.response)) return item.response.join(", ");
        return item.response ?? "";
      });

      return { questions: parsedQuestions, answers: parsedAnswers };
    } catch (error) {
      console.error("Failed to parse roleSpecificQuestions[0]", error);
      return { questions: [], answers: [] };
    }
  }, [application?.roleSpecificQuestions]);

  const resumeLink = application?.resumeUrl;

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
