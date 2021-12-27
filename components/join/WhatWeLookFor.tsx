import { FC } from "react";

const WhatWeLookFor: FC = () => {
  return (
    <section className="content flex gap-24 mb-24">
      <div>
        <img src="/join/people-cheering-2.svg" alt="People cheering" />
      </div>
      <div>
        <h2 className="text-blue">What we look for</h2>
        <hr className="w-20 mt-4 mb-10 text-blue" />
        <ul className="max-w-xl flex flex-col gap-8">
          <li className="flex flex-col gap-2">
            <h6 className="text-blue">Passion for social good</h6>
            <p>
              How passionate are you about working for social good? Do you have
              prior volunteering experience? Is there a specific project for
              social good that you are particularly interested in?
            </p>
          </li>
          <li className="flex flex-col gap-2">
            <h6 className="text-blue">Drive to learn</h6>
            <p>
              Are you willing to learn new things, both technically and in terms
              of social good? Do you like to challenge yourself with problems
              that you've never solved before?
            </p>
          </li>
          <li className="flex flex-col gap-2">
            <h6 className="text-blue">Technical fit</h6>
            <p>
              Do you have experience that is relevant to the type of projects we
              work on? If not, are you technically capable of learning to make
              sure you can make significant contributions?
            </p>
          </li>
          <li className="flex flex-col gap-2">
            <h6 className="text-blue">Team player</h6>
            <p>
              Do you enjoy collaborating and learning with others? Do you value
              others' perspectives and experiences?
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default WhatWeLookFor;
