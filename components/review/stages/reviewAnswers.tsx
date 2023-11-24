interface Props {
  questions: string[];
  answers: string[];
}

export const ReviewAnswers: React.FC<Props> = ({ questions, answers }) => {
  return (
    <div className="flex flex-col gap-5">
      {questions.map((question, idx) => {
        return (
          
          <div
            className="flex flex-col gap-5"
            style={{ alignItems: "flex-start" }}
          >
            <h5 className="text-[16px]">{question}</h5>
            <div
              className="flex gap-[9px] charcoal-500 pt-px pr-px"
              style={{ alignItems: "flex-start" }}
            >
              <div className="border-l-4 border-charcoal-350">
                <div className="px-2 charcoal-0">{answers[idx]}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>

    
  );
};
