import { FC } from "react";
import FAQList from "@components/common/FAQList";
import jsonFAQ from "@constants/join-faq.json";

const FAQ: FC = () => {
  return (
    <section className="content mb-32" id="join-faq">
      <div className="mb-10 md:mb-14">
        <h2 className="text-blue">FAQ</h2>
        <hr className="w-20 mt-4 mb-10 text-blue" />
      </div>
      <div className="flex flex-col space-y-20 md:space-y-32">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="w-52 pt-2 border-t-4 border-t-blue mb-8 md:mb-0">
            <h6 className="text-blue">Application process</h6>
          </div>
          <FAQList questions={jsonFAQ.applicationProcess} />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="w-52 pt-2 border-t-4 border-t-blue mb-8 md:mb-0">
            <h6 className="text-blue">About our team</h6>
          </div>
          <FAQList questions={jsonFAQ.aboutOurTeam} />
        </div>
      </div>
    </section>
  );
};

export default FAQ;
