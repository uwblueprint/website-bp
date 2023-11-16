import { ReviewStage } from "pages/review";
import { ReviewRatingPage } from "../shared/reviewRatingPage";
import { ReviewRubric } from "./reviewRubric";
import { ReviewAnswers } from "./reviewAnswers";
import { useState, useEffect } from "react";
import { ReviewStageProps } from "./reviewInfoStage";

const reviewSKLScoringCriteria = [
  "The technical problem is not challenging, or the applicant did not make a reasonable effort to attack it. Response does not show insight into the problem solving process. Example: “I found it difficult to do [x].”",
  "The technical problem is not very challenging, or the applicant struggles to articulate their solution. Response shows limited insight into the problem solving process, or the applicant might struggle to solve a similar technical problem in the future. Example: “In the course of [x] I ran into [y]. After some debugging/Googling, I managed to solve it.”",
  "The technical problem is reasonably challenging, and the applicant is able to articulate how they solved it. Response shows good insight into the problem solving process. The applicant would be able to solve similar technical problems in the future. Example: “In the course of [x] I ran into [y]. Here are some steps I used to solve this problem.”",
  "The technical problem is (at least) reasonably challenging, and the applicant is able to articulate how they solved it, along with key takeaways (or some similar demonstration of transferable learning). Response shows excellent insight into the problem solving process. The applicant would be able to solve unrelated technical problems in the future. Example: “In the course of [x] I ran into [y]. [z] is my decision making process in general, and [q] is how I applied it here. [w] are some key takeaways.”",
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

    console.log(roleSpecificStrJSON);

    const questionText = roleSpecificStrJSON[0].questions[1].question;
    const responseText = roleSpecificStrJSON[0].questions[1].response;

    setQuestions(() => [questionText]);
    setAnswers(() => [responseText]);
    console.log(resumeLink);
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
