import Button from "@components/common/Button";
import WarningOutlineIcon from "@components/icons/warning-outline.icon";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { ReviewRubric } from "../stages/ReviewRubric";
import { ReviewStage } from "../shared/constants";
import { ReviewScores } from "../shared/types";
import { ReviewPageLayout } from "./ReviewPageLayout";

type ReviewScoredStageLayoutProps = {
  applicantName: string;
  beforeQuestions?: ReactNode;
  currentStage: ReviewStage;
  onScoreChange: (value: number) => void;
  questions: string[];
  answers: string[];
  score: number;
  scoreLabel: string;
  scoringCriteria: string[];
  scores: ReviewScores;
  title: string;
};

const QuestionResponses = ({
  questions,
  answers,
}: Pick<ReviewScoredStageLayoutProps, "questions" | "answers">) => {
  return (
    <div className="flex w-full flex-col gap-4">
      {questions.map((question, index) => {
        const answer = answers[index] ?? "";

        return (
          <div key={question} className="flex flex-col gap-4">
            <p className="font-poppins text-base font-medium leading-[1.4] text-[#252525]">
              {index + 1}. {question}
            </p>
            <div className="flex items-stretch gap-[9px]">
              <div className="w-1 shrink-0 self-stretch bg-black/60" />
              <p className="py-1 font-source text-[16px] leading-[1.4] text-black/75 whitespace-pre-wrap">
                {answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const ReviewScoredStageLayout = ({
  applicantName,
  beforeQuestions,
  currentStage,
  onScoreChange,
  questions,
  answers,
  score,
  scoreLabel,
  scoringCriteria,
  scores,
  title,
}: ReviewScoredStageLayoutProps): ReactElement => {
  const [draftScore, setDraftScore] = useState(score > 0 ? `${score}` : "");
  const [showHighScoreWarning, setShowHighScoreWarning] = useState(false);
  const firstName = applicantName.split(" ")[0] || "Applicant";

  useEffect(() => {
    setDraftScore(score > 0 ? `${score}` : "");
    setShowHighScoreWarning(false);
  }, [score, currentStage]);

  return (
    <ReviewPageLayout currentStage={currentStage} scores={scores}>
      <div className="flex h-full flex-col overflow-y-auto border-r border-[#C4C4C4] bg-white px-6 py-8 md:px-9">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <Button
              size="sm"
              variant="secondary"
              href="/admin"
              className="w-fit px-4 py-2 font-source text-base leading-[1.4]"
            >
              Back to home
            </Button>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <p className="font-source text-base italic leading-[1.4] text-blue">
                Is the applicant a conflict of interest?
              </p>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => undefined}
                className="flex items-center gap-2 px-4 py-2 font-source text-base leading-[1.4]"
              >
                <WarningOutlineIcon className="h-5 w-5" />
                Report
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-source text-base leading-[1.4] text-black/75">
              {applicantName}&apos;s Application
            </p>
            <h2 className="text-[28px] leading-[1.4] text-[#252525] font-semibold">
              {title}
            </h2>
          </div>

          <div className="border-t border-[#C4C4C4]" />

          {beforeQuestions}

          <QuestionResponses questions={questions} answers={answers} />
        </div>
      </div>

      <div className="flex h-full flex-col justify-between overflow-y-auto bg-white px-6 py-8">
        <div className="flex flex-col gap-4">
          <h3 className="font-poppins text-[20px] font-medium leading-[1.4] text-[#252525]">
            {scoreLabel}
          </h3>
          <ReviewRubric scoringCriteria={scoringCriteria} />
        </div>

        <div className="mt-8 flex w-full flex-col gap-2">
          <div className="flex items-center gap-3">
            <input
              type="text"
              inputMode="numeric"
              value={draftScore}
              placeholder={`Enter ${firstName}'s score`}
              onChange={(event) => {
                const nextValue = event.target.value.trim();

                if (nextValue === "") {
                  setDraftScore("");
                  setShowHighScoreWarning(false);
                  onScoreChange(0);
                  return;
                }

                if (!/^\d+$/.test(nextValue)) {
                  return;
                }

                const parsedValue = parseInt(nextValue, 10);

                if (parsedValue > 5) {
                  setDraftScore("5");
                  setShowHighScoreWarning(true);
                  onScoreChange(5);
                  return;
                }

                const boundedValue = Math.max(1, parsedValue);
                setDraftScore(`${boundedValue}`);
                setShowHighScoreWarning(false);
                onScoreChange(boundedValue);
              }}
              className="w-full max-w-[320px] rounded-md border border-[#C4C4C4] px-4 py-3 font-source text-base leading-[1.4] text-[#252525] placeholder:text-black/60"
            />
            <span className="font-poppins text-2xl leading-[1.4] text-[#CD5A5A]">
              *
            </span>
          </div>
          {showHighScoreWarning ? (
            <p className="font-source text-sm leading-[1.4] text-[#CD5A5A]">
              Oh this is not allowed.
            </p>
          ) : null}
        </div>
      </div>
    </ReviewPageLayout>
  );
};
