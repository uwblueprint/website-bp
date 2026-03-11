import { useTheme } from "@mui/material/styles";

export interface Props {
  questions: string[];
  answers: string[];
}

export const ReviewAnswers = ({ questions, answers }: Props) => {
  const theme = useTheme();
  return (
    <div className="flex flex-col gap-10 w-full">
      {questions.map((question, idx) => (
        <div
          key={idx}
          className="flex flex-col gap-4"
          style={{ alignItems: "flex-start" }}
        >
          <h5
            className="font-poppins"
            style={{
              color: theme.palette.text.primary,
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "140%",
              fontFeatureSettings: "'liga' off, 'clig' off",
            }}
          >
            {question}
          </h5>
          <div className="flex w-full">
            <div
              className="rounded-r px-4 py-3 w-full font-source"
              style={{
                borderLeft: `4px solid ${theme.palette.semantics.border.light}`,
              }}
            >
              <p
                style={{
                  color: theme.palette.text.primary,
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "140%",
                  fontFeatureSettings: "'liga' off, 'clig' off",
                }}
              >
                {answers[idx]}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
