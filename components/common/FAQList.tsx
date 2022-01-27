import { FC, useState } from "react";

type Props = {
  readonly questions: ReadonlyArray<{
    readonly question: string;
    readonly answer: string;
  }>;
};

/** List of FAQ questions and answers */
const FAQList: FC<Props> = ({ questions }) => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  return (
    <ul className="flex-1 flex flex-col border-t border-b divide-y">
      {questions.map(({ question, answer }, i) => (
        <li key={question}>
          <button
            className="w-full flex flex-col space-y-4 py-4"
            onClick={() => setOpenQuestion(i === openQuestion ? null : i)}
          >
            <div className="w-full flex justify-between">
              <h6 className="text-left normal-case font-normal md:font-semibold">
                {question}
              </h6>
              {i === openQuestion ? (
                <img src="/common/up-carat-sky.svg" alt="Up carat" />
              ) : (
                <img src="/common/down-carat-blue.svg" alt="Down carat" />
              )}
            </div>
            {i === openQuestion && (
              <p className="text-left whitespace-pre-line align-bottom">
                {answer}
              </p>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FAQList;
