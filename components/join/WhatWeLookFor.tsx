import { FC } from "react";

const WhatWeLookFor: FC = () => {
  return (
    <section className="content flex md:space-x-12 lg:space-x-24 mb-24">
      <div className="hidden md:block w-5/12 lg:w-auto">
        <img src="/join/people-cheering-2.svg" alt="People cheering" />
      </div>
      <div>
        <h2 className="text-blue">What we look for</h2>
        <hr className="w-20 mt-4 mb-10 text-blue" />
        <ul className="max-w-xl flex flex-col space-y-8">
          <li className="flex flex-col space-y-2">
            <h6 className="text-blue">Passion for social good</h6>
            <p>
              Do you love giving back to the community? Are you particularly
              passionate about a specific cause? Tell us about any prior
              volunteering experiences you may have had!
            </p>
          </li>
          <li className="flex flex-col space-y-2">
            <h6 className="text-blue">The drive to learn</h6>
            <p>
              Are you eager to learn new things, be they technical skills or
              social issues? Do you love a good challenge, even if it takes you
              out of your comfort zone?
            </p>
          </li>
          <li className="flex flex-col space-y-2">
            <h6 className="text-blue">A technical fit</h6>
            <p>
              Do you have the relevant experience or skills needed to make
              significant contributions? If not, do you have the technical
              foundations needed to learn them?
            </p>
          </li>
          <li className="flex flex-col space-y-2">
            <h6 className="text-blue">A team player</h6>
            <p>
              Do you enjoy collaborating and learning with others? Do you value
              everyone’s perspectives and experiences even when they challenge
              your own?
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default WhatWeLookFor;
