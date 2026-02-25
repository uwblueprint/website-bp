import { ReviewStage } from "../shared/constants";
import { ReviewScores } from "../shared/types";

interface Props {
  scoringCriteria: string[];
  scores: ReviewScores;
  currentStage: ReviewStage;
}

export const ReviewRubric: React.FC<Props> = ({ scoringCriteria }) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      {scoringCriteria.map((criteria, idx) => (
        <div key={idx} className="flex flex-col gap-2">
          <span
            className="font-poppins"
            style={{
              color: "#135FC5",
              fontFeatureSettings: "'liga' off, 'clig' off",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 500,
              letterSpacing: 0,
              lineHeight: "140%",
            }}
          >
            Level {idx + 1}
          </span>
          <p
            className="font-source"
            style={{
              alignSelf: "stretch",
              color: "rgba(37, 37, 37, 0.80)",
              fontFeatureSettings: "'liga' off, 'clig' off",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              letterSpacing: 0,
              lineHeight: "140%",
            }}
          >
            {criteria}
          </p>
        </div>
      ))}
    </div>
  );
};
