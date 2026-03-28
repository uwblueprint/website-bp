import { useTheme } from "@mui/material/styles";
import { ReactElement } from "react";

export interface Props {
  questions: string[];
  answers: string[];
}

export const ReviewAnswers = ({ questions, answers }: Props): ReactElement => {
  const theme = useTheme();
  return (
    <div className="flex flex-col gap-10 w-ful">
      {questions.map((question, idx) => (
        <div
          key={`${question}-${idx}`}
          className="flex flex-col gap-4 items-start"
        >
          <h5
            className="font-poppins font-normal text-base font-medium"
            style={{
              color: theme.palette.text.primary,
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
                className="text-base font-normal"
                style={{
                  color: theme.palette.text.primary,
                  lineHeight: "140%",
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
