import { FC } from "react";

const Community: FC = () => {
  return (
    <section className="content mb-36">
      <div className="w-full relative">
        <img
          className="w-full"
          src="/join/blueprint-members.png"
          alt="Blueprint 2019 team"
        />

        {/* Caption */}
        <div className="absolute inset-x-16 bottom-12">
          <h2 className="text-white">Incredible community...</h2>
          <p className="text-white">
            Our Fall 2019 team showing Blueprint spirit!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Community;
