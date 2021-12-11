import { FC } from "react";

/** Hero section of Projects page */
const Hero: FC = () => {
  return (
    <header className="h-[768px] w-full flex justify-center items-center bg-blue">
      <div className="max-w-xl">
        <h1 className="text-white">Projects</h1>
        <p className="text-white text-xl">
          All of Blueprint's work is open source because we believe in building
          technology that makes us more open and connected.
        </p>
      </div>
      <div>
        {/* TODO: Fix left whitespace in image */}
        <img src="/projects/people-at-table.svg" />
      </div>
    </header>
  );
};

export default Hero;
