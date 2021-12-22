import { FC } from "react";
import Link from "next/link";
import Button from "@components/common/Button";

const ContactUs: FC = () => {
  return (
    <section className="content flex items-center gap-4">
      <div className="flex-1">
        <h4 className="text-blue uppercase">
          Need help with your non profit and do not know where to start?
        </h4>
        <hr className="w-96 mt-8 mb-12 text-blue" />
        <Link href="/contact">
          <a>
            <Button>Contact Us</Button>
          </a>
        </Link>
      </div>
      <div className="flex-1">
        <img
          src="/nonprofits/person-with-question.svg"
          alt="Person with question"
        />
      </div>
    </section>
  );
};

export default ContactUs;
