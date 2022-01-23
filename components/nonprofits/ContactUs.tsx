import { FC } from "react";
import Link from "next/link";
import Button from "@components/common/Button";

const ContactUs: FC = () => {
  return (
    <section className="content flex items-center space-x-4 mb-24">
      <div className="flex-1 w-full">
        <h4 className="text-blue uppercase mb-7 md:mb-0">
          Need help with your nonprofit and do not know where to start?
        </h4>
        <hr className="w-96 mt-4 mb-10 text-blue hidden md:block" />
        <Link href="/contact">
          <a>
            <Button>Contact Us</Button>
          </a>
        </Link>
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
