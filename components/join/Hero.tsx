import { FC } from "react";

/** Hero section */
const Hero: FC = () => {
  return (
    <header
      className="h-[660px] w-full flex justify-around items-center bg-no-repeat bg-bottom bg-cover"
      style={{ backgroundImage: "url('/join/hero-background.svg')" }}
    >
      <div className="max-w-xl">
        <h1 className="text-white">Join our Team</h1>
        <p className="text-white text-xl">
          We are a group of friendly folks at the University of Waterloo
          dedicated to building technology for social good.
        </p>
        {/* TODO: Apply now button */}
      </div>
      <div>
        <img src="/join/people-cheering.svg" alt="People cheering" />
      </div>
    </header>
  );
};

export default Hero;
