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
            className="font-poppins"
            style={{
              color: "#252525",
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
                borderLeft: "4px solid rgba(37, 37, 37, 0.75)",
              }}
            >
              <p
                style={{
                  color: "rgba(37, 37, 37, 0.80)",
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
