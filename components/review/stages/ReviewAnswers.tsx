export interface Props {
  questions: string[];
  answers: string[];
}

export const ReviewAnswers = ({ questions, answers }: Props) => {
  return (
    <div className="flex flex-col gap-10 w-full">
      {questions.map((question, idx) => (
        <div
          key={idx}
          className="flex flex-col gap-4"
          style={{ alignItems: "flex-start" }}
        >
          <h5
            className="text-[16px] font-medium text-charcoal-700"
            style={{ lineHeight: "140%" }}
          >
            {question}
          </h5>
          <div className="flex w-full">
            <div
              className="rounded-r px-4 py-3 w-full"
              style={{
                borderLeft: "4px solid rgba(37, 37, 37, 0.75)",
              }}
            >
              <p
                className="text-[16px] font-normal text-charcoal-600"
                style={{ lineHeight: "140%" }}
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
