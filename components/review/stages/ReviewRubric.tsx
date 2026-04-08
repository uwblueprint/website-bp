import { ReactElement } from "react";
import { ReviewStage } from "../shared/constants";
import { ReviewScores } from "../shared/types";

export interface Props {
  scoringCriteria: string[];
  scores: ReviewScores;
  currentStage: ReviewStage;
}

export const ReviewRubric = ({ scoringCriteria }: Props): ReactElement => {
  return (
    <div className="shrink gap-8">
      <div className="inline-flex gap-6 flex-col items-start">
        {scoringCriteria.map((criteria, idx) => (
          <div
            key={`rubric-level-${idx + 1}`}
            className="flex items-center shrink-0 self-stretch p-4 gap-6"
          >
            <h5 className="flex flex-col w-5 text-[28px]" aria-hidden>
              {idx + 1}
            </h5>
            <p className="flex-1 font-source text-base font-normal leading-[1.4] text-charcoal-900/80">
              {criteria}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
