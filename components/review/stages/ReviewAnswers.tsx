import { ReactElement } from "react";

export interface Props {
  questions: string[];
  answers: string[];
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ReviewAnswers = ({ questions, answers }: Props): ReactElement => {
  return (
    <div className="flex flex-col gap-6">
      {questions.map((question, index) => {
        const answer = answers[index] ?? "";
        const isEmail = EMAIL_PATTERN.test(answer);

        return (
          <div
            key={`${question}-${index}`}
            className="flex flex-col items-start gap-1.5"
          >
            <h5 className="text-base font-medium leading-[1.4] text-black">
              {question}
            </h5>
            {isEmail ? (
              <a
                href={`mailto:${answer}`}
                className="break-all font-source text-base leading-6 text-[#3279B7] underline underline-offset-2"
              >
                {answer}
              </a>
            ) : (
              <p className="break-words whitespace-pre-wrap font-source text-base leading-6 text-charcoal-500">
                {answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};
