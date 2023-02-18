import { FC } from "react";
import Button from "@components/common/Button";

const ContactUs: FC = () => {
  return (
    <section className="content flex items-center space-x-4 mb-32 md:mb-24">
      <div className="flex-1 w-full">
        <h2 className="text-blue text-2xl md:text-4xl uppercase mb-7 md:mb-6">
          Need help with your nonprofit?
        </h2>
        <hr className="w-96 mt-4 mb-8 text-blue hidden md:block" />
        <Button href="/contact">Contact Us</Button>
      </div>
      <div className="flex-1 hidden md:block">
        <img
          src="/nonprofits/person-with-question.svg"
          alt="Person with question"
        />
      </div>
    </section>
  );
};

export default ContactUs;
