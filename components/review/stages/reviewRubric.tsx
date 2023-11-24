import { ReviewStage } from "pages/review";


interface Props {
  scoringCriteria: string[];
  scores: Map<ReviewStage, number>;
  currentStage: ReviewStage;
}

export const ReviewRubric: React.FC<Props> = ({
  scoringCriteria,
  scores,
  currentStage,
}) => {
  return (
    <>
      <div className="shrink gap-8">
        <div className="inline-flex gap-6 flex-col items-start">
          {scoringCriteria.map((criteria, idx) => {
            return (
              <div className="flex items-center shrink-0 self-stretch p-4 gap-6">
                <h5 className="flex flex-col w-5 text-[28px]">{idx + 1}</h5>
                <div className="flex-1 flex-col text-base">{criteria}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
