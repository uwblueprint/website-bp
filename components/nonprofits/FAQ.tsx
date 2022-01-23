import { FC } from "react";
import FAQList from "@components/common/FAQList";
import QUESTIONS from "@constants/nonprofits-faq.json";

const FAQ: FC = () => {
  return (
    <section className="content flex flex-col mb-20 lg:mb-48">
      <div>
        <h2 className="text-blue mb-6 md:mb-0">FAQ</h2>
        <hr className="hidden md:block w-20 mt-3 mb-4 md:mb-12 text-blue" />
      </div>
      <FAQList questions={QUESTIONS} />
    </section>
  );
};

export default FAQ;
