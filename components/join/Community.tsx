import { FC } from "react";

const Community: FC = () => {
  return (
    <section className="content mb-24 md:mb-36 space-y-12 md:space-y-8">
      <div className="w-full relative">
        <img
          className="w-full h-80 object-cover rounded-xl md:h-auto"
          src="/join/blueprint-members.png"
          alt="Blueprint 2019 team"
        />

        {/* Caption */}
        <div className="md:absolute inset-x-16 bottom-12 text-charcoal-600 md:text-white">
          <h2 className="mt-4 md:mt-0 font-semibold md:font-medium">
            Incredible community...
          </h2>
          <p>Our Fall 2019 team showing Blueprint spirit!</p>
        </div>
      </div>
      <div className="w-full relative">
        <img
          className="w-full h-80 object-cover rounded-xl md:h-auto"
          src="/join/blueprint-members-online.png"
          alt="Blueprint 2019 team"
        />

        {/* Caption */}
        <div className="md:absolute inset-x-16 bottom-12 md:text-right text-charcoal-600 md:text-white">
          <h2 className="mt-4 md:mt-0 font-semibold md:font-medium">
            ...even online!
          </h2>
          <p>
            Going online hasn’t slowed us down... our team is bigger and better
            than ever!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Community;
