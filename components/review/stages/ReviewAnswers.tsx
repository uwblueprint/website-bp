import { ReactElement } from "react";

export interface Props {
  questions: string[];
  answers: string[];
}

export const ReviewAnswers = ({ questions, answers }: Props): ReactElement => {
  return (
    <div className="flex w-full flex-col gap-6">
      {questions.map((question, index) => {
        const answer = answers[index] ?? "";

        return (
          <div
            key={`${question}-${index}`}
            className="flex flex-col items-start gap-1.5"
          >
            <h5 className="font-poppins text-base font-medium leading-[1.4] text-black">
              {question}
            </h5>
            <p className="break-words whitespace-pre-wrap font-source text-base leading-6 text-charcoal-500">
              {answer}
            </p>
          </div>
        );
      })}
    </div>
  );
};
