import { FC } from "react";
import { ReviewStage } from "pages/review";
import { ReviewSplitPanelPage } from "../shared/reviewSplitPanelPage";

type Props = {
  readonly question: string;
  readonly answer: string;
};

const data = [
  { question: "Email", answer: "matthew.wang@uwblueprint.org" },
  { question: "Program", answer: "Computer Science" },
  { question: "Academic Term", answer: "4A" },
  { question: "Where did you hear about us?", answer: "Word of mouth" },
  {
    question: "How many times have you applied to Blueprint in the past?",
    answer: "This is my first time!",
  },
  { question: "Pronouns", answer: "He/Him/His" },
  {
    question: "Will you be in an academic (school) term or a co-op term?",
    answer: "Academic",
  },
  { question: "Position", answer: "Product Designer" },
  {
    question: "What timezone will you be based out of?",
    answer: "I will be based out of the Eastern timezone.",
  },
];

const QuestionAnswer: FC<Props> = ({ question, answer }) => {
  return (
    <div className="pt-[24px]">
      <p className="text-[16px] font-poppins pb-[4px]">{question}</p>
      <p className="text-[16px] font-source text-charcoal-500">{answer}</p>
    </div>
  );
};

export const ReviewInfoStage: React.FC = () => {
  return (
    <ReviewSplitPanelPage
      studentName="M. Goose"
      rightTitle="Basic Information"
      currentStage={ReviewStage.INFO}
    >
      {data.map((item, index) => {
        return (
          <QuestionAnswer
            key={index}
            question={item.question}
            answer={item.answer}
          />
        );
      })}
    </ReviewSplitPanelPage>
  );
};
