import { FC } from "react";
import Link from "next/link";

/** How It Works section */
const HowItWorks: FC = () => {
  return (
    <section className="w-full px-4 relative z-10 flex flex-col items-start md:items-center pt-20 pb-28 md:pb-0 bg-sky md:bg-how-it-works md:bg-top md:bg-cover">
      <h2 className="text-blue">How it Works</h2>
      <hr className="w-48 my-8 text-blue hidden md:block" />
      <img
        className="hidden md:block"
        src="/landing/high-five.svg"
        alt="People giving a high five"
      />
      <div className="max-w-5xl flex flex-col mt-10 md:mt-16 space-y-16 md:space-y-0 md:flex-row md:divide-x md:divide-blue">
        <div className="flex flex-col items-start md:text-center md:items-center md:pr-8 lg:pr-24">
          <h3 className="text-blue mb-3 md:mb-0">Student Volunteers</h3>
          <hr className="w-48 mt-3 mb-6 text-blue hidden md:block" />
          <h6 className="text-blue uppercase mb-2">
            Have a passion for social good?
          </h6>
          <p className="mb-4 md:text-center">
            Volunteer and grow your skills at UW Blueprint! Join a talented and
            vibrant community while creating technological solutions that make a
            real world impact. Student applications open at the end of each
            term.
          </p>
          <Link href="/join">
            <a className="flex space-x-2 text-blue text-base font-extrabold">
              <span>Learn more</span>
              <img
                className="relative top-0.5"
                src="/common/right-carat-blue.svg"
                alt="Right carat"
              />
            </a>
          </Link>
        </div>
        <div className="flex flex-col items-start md:text-center md:items-center md:pl-8 lg:pl-24">
          <h3 className="text-blue mb-3 md:mb-0">Non Profit Partners</h3>
          <hr className="w-48 mt-3 mb-6 text-blue hidden md:block" />
          <h6 className="text-blue uppercase mb-2">
            Let's build something great
          </h6>
          <p className="mb-4 md:text-center">
            Whether you have a project idea or you don’t know where to start,
            our team of experienced Product Managers, Designers, and Developers
            will be there every step of the way. Contact us to chat!
          </p>
          <Link href="/nonprofits">
            <a className="flex space-x-2 text-blue text-base font-extrabold">
              <span>Learn more</span>
              <img
                className="relative top-0.5"
                src="/common/right-carat-blue.svg"
                alt="Right carat"
              />
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
