import { FC } from "react";

/** How It Works section */
const HowItWorks: FC = () => {
  return (
    <section
      className="w-full relative z-10 flex flex-col items-center pt-20 bg-top bg-cover"
      style={{
        backgroundImage: "url(/landing/how-it-works-background.svg)",
      }}
    >
      <h2 className="text-blue">How it Works</h2>
      <hr className="w-48 my-8 text-blue" />
      <img src="/landing/high-five.svg" alt="People giving a high five" />
      <div className="max-w-5xl flex mt-16 divide-x divide-blue">
        <div className="flex flex-col items-center pr-24">
          <h3 className="text-blue">Student Volunteers</h3>
          <hr className="w-48 mt-3 mb-6 text-blue" />
          <h6 className="text-blue uppercase">
            Have a passion for social good?
          </h6>
          <p className="mb-4 text-center">
            Volunteer and grow your skills at UW Blueprint! Join a talented and
            vibrant community while creating technological solutions that make a
            real world impact. Student applications open at the end of each
            term.
          </p>
          <a className="flex gap-2 text-blue text-base font-extrabold">
            Learn More{" "}
            <img
              className="relative top-[1px]"
              src="/common/right-carat-blue.svg"
              alt="Right carat"
            />
          </a>
        </div>
        <div className="flex flex-col items-center pl-24">
          <h3 className="text-blue">Non Profit Partners</h3>
          <hr className="w-48 mt-3 mb-6 text-blue" />
          <h6 className="text-blue uppercase">Let's build something great</h6>
          <p className="mb-4 text-center">
            Whether you have a project idea or you don’t know where to start,
            our team of experienced Product Mangers, Designers, and Developers
            will be there every step of the way. Contact us to chat!
          </p>
          <a className="flex gap-2 text-blue text-base font-extrabold">
            Learn More{" "}
            <img
              className="relative top-[1px]"
              src="/common/right-carat-blue.svg"
              alt="Right carat"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
