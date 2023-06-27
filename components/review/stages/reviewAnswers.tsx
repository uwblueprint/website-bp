

interface Props {
  questions: string[];
  answers: string[];
};

export const ReviewAnswers: React.FC<Props> = ({
  questions,
  answers,
}) => {
  return (
    <div>
      {
        questions.map((question, idx) => {
          return (
            <div className="flex flex-col gap-5" style={{alignItems: "flex-start"}}>
              <h5 className="text-[16px]">
                {question}
              </h5>
              <div className="flex" style={{alignItems: "flex-start", color: "#707070", gap: "9px", padding: "0px 1px"}}>
                <div className="border-l-4 border-charcoal-350">
                  <div className="px-2 charcoal-0">
                    {answers[idx]}
                  </div>
                </div>
              </div>
              <br></br>
            </div>
          )
        })
      }
    </div>
  );
};