import { ReviewStage } from "pages/review";

interface Props {
  scoringCriteria: string[];
  scores: Map<ReviewStage, number>;
  currentStage: ReviewStage;
}

export const ReviewRubric: React.FC<Props> = ({ scoringCriteria }) => {
  return (
    <div className="flex flex-col gap-6 w-full font-source">
      {scoringCriteria.map((criteria, idx) => (
        <div key={idx} className="flex flex-col gap-2">
          <span
            className="font-poppins text-[16px] font-medium text-blue-200"
            style={{
              lineHeight: "140%",
              fontFeatureSettings: "'liga' off, 'clig' off",
            }}
          >
            Level {idx + 1}
          </span>
          <p
            className="text-[16px] font-normal text-charcoal-600"
            style={{ lineHeight: "140%" }}
          >
            {criteria}
          </p>
        </div>
      ))}
    </div>
  );
};
