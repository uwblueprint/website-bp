import { FC } from "react";

/** Why Join section */
const WhyJoin: FC = () => {
  return (
    <section className="content flex relative justify-end mt-16 lg:mt-8 mb-24 md:mb-32">
      <img
        className="hidden md:block w-1/3 -translate-x-20 scale-125 object-contain"
        src="/join/gears.png"
        role="presentation"
      />
      <div className="w-full lg:w-2/3">
        <h2 className="text-blue">Why join?</h2>
        <hr className="w-20 mt-4 mb-10 text-blue" />
        <div className="flex flex-col space-y-8 md:space-y-10">
          <div className="flex flex-col space-y-2">
            <h6 className="text-blue">Make an impact</h6>
            <p>
              By helping nonprofits better serve our communities through
              technology, the positive impacts of your hard work and expertise
              will be amplified.
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <h6 className="text-blue">Make lifelong friends</h6>
            <p>
              At Blueprint, the relationships we form with each other will long
              outlast the scope of the projects we work on. Our culture is as
              important to us as the work we produce, and we value quality time,
              celebrating our differences, and having fun together.
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <h6 className="text-blue">Make personal change</h6>
            <p>
              We care about your technical, social, and personal growth. With
              our robust culture of mentorship, we never stop teaching and
              learning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyJoin;
