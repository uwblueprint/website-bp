import { FC } from "react";
import FAQList from "@components/common/FAQList";
import QUESTIONS from "@constants/nonprofits-faq.json";

const FAQ: FC = () => {
  return (
    <section className="content flex flex-col mb-56">
      <div>
        <h2 className="text-blue">FAQ</h2>
        <hr className="w-20 mt-4 mb-10 text-blue" />
      </div>
      <FAQList questions={QUESTIONS} />
    </section>
  );
};

export default FAQ;
