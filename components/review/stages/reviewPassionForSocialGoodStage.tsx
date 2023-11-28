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

const reviewPFSGScoringCriteria = [
  "Does not provide a relevant cause that resonates with them. Example: 'I'm really involved in social good causes, I'm a very empathetic person so I tend to resonate with them when I come across something negative in the world'",
  "Provides a superficial and/or shallow reason for why a cause resonates with them or picks a generic cause with a generic reason. Example: 'the environment is a cause that resonates with me because we only have one earth and we need to take care of it'",
  "Provides a sensible cause that resonates with them and provides some justification for why they chose that cause.  Personal connection is vague. Example: `I resonate with social isolation in long term care homes. I hear a lot about it from my family members and it was an assigned topic at a case competition that I went to etc`",
  "Provides a reason as to why that cause resonates with them and demonstrates genuine passion and enthusiasm for said cause.  Connects to the cause on a personal level.  Example: `Access to education is a cause that resonates with me because I grew up in [x] and I saw first hand how lack of education can [...].`",
  "Provides a meaningful reason as to why that cause resonates with them and demonstrates genuine passion and enthusiasm for said cause. Backs up their passion with examples of action taken whether that be volunteer work or demonstrating in depth research. Bonus: References a Blueprint project that resonates with them (did their research) Example: `Access to education is a cause that resonates with me because I grew up in [x] and I saw first hand how lack of education can [...]. Recognizing my own privilege to receive education in Canada, I [.action/research..]` etc.",
];

export const ReviewPassionForSocialGoodStage: React.FC<Props> = ({
  name,
  application,
  scores,
}) => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    const shortAnswerStr = application?.shortAnswerQuestions[0];
    if (!shortAnswerStr) return;
    const shortAnswerJSON = JSON.parse(shortAnswerStr);
    const question = shortAnswerJSON[1]?.question;
    const answer = shortAnswerJSON[1]?.response;

    setQuestions([question]);
    setAnswers([answer]);
  }, [application]);
  return (
    <>
      <ReviewRatingPage
        studentName={name}
        contextConsumer={
          <ReviewSetScoresContext.Consumer>
            {(updateScore) => (
              <div className="flex items-center justify-end">
                <input
                  type="number"
                  pattern="[1-5]"
                  value={scores.get(ReviewStage.PFSG)}
                  onChange={(event) => {
                    if (event.target.validity.valid) {
                      updateScore?.(
                        ReviewStage.PFSG,
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
        title="Passion for social good"
        currentStage={ReviewStage.PFSG}
        currentStageRubric={
          <ReviewRubric
            scoringCriteria={reviewPFSGScoringCriteria}
            scores={scores}
            currentStage={ReviewStage.PFSG}
          />
        }
        currentStageAnswers={
          <ReviewAnswers questions={questions} answers={answers} />
        }
        scores={scores}
      />
    </>
  );
};
