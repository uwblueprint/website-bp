import { FC, useState, useCallback } from "react";
import {
  applicationProcess as APPLICATION_PROCESS_QUESTIONS,
  aboutOurTeam as ABOUT_OUR_TEAM_QUESTIONS,
} from "@constants/join-faq.json";

const FAQ: FC = () => {
  const [openApplicationQuestion, setOpenApplicationQuestion] = useState<
    number | null
  >(null);
  const [openTeamQuestion, setOpenTeamQuestion] = useState<number | null>(null);

  return (
    <section className="content mb-32">
      <div className="mb-14">
        <h2 className="text-blue">FAQ</h2>
        <hr className="w-20 mt-4 mb-10 text-blue" />
      </div>
      <div className="flex flex-col gap-32">
        <div className="flex gap-4">
          <div className="w-52 pt-2 border-t-4 border-t-blue">
            <h6 className="text-blue">Application process</h6>
          </div>
          <div className="flex-1 flex flex-col border-t border-b divide-y">
            {APPLICATION_PROCESS_QUESTIONS.map(({ question, answer }, i) => (
              <div key={question} className="flex flex-col gap-4 py-4">
                <div className="flex justify-between">
                  <h6 className="text-xs uppercase">{question}</h6>
                  <button
                    onClick={() =>
                      setOpenApplicationQuestion(
                        i === openApplicationQuestion ? null : i,
                      )
                    }
                  >
                    {i === openApplicationQuestion ? (
                      <img src="/common/up-carat-sky.svg" alt="Up carat" />
                    ) : (
                      <img src="/common/down-carat-blue.svg" alt="Down carat" />
                    )}
                  </button>
                </div>
                {i === openApplicationQuestion && <p>{answer}</p>}
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-52 pt-2 border-t-4 border-t-blue">
            <h6 className="text-blue">About our team</h6>
          </div>
          <div className="flex-1 flex flex-col border-t border-b divide-y">
            {ABOUT_OUR_TEAM_QUESTIONS.map(({ question, answer }, i) => (
              <div key={question} className="flex flex-col gap-4 py-4">
                <div className="flex justify-between">
                  <h6 className="text-xs uppercase">{question}</h6>
                  <button
                    onClick={() =>
                      setOpenTeamQuestion(i === openTeamQuestion ? null : i)
                    }
                  >
                    {i === openTeamQuestion ? (
                      <img src="/common/up-carat-sky.svg" alt="Up carat" />
                    ) : (
                      <img src="/common/down-carat-blue.svg" alt="Down carat" />
                    )}
                  </button>
                </div>
                {i === openTeamQuestion && <p>{answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
