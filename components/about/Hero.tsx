import { FC } from "react";

const Hero: FC = () => {
  return (
    <header
      className="h-[670px] w-full relative flex flex-col justify-end pb-32 bg-cover bg-center"
      style={{ backgroundImage: "url('/about/blueprint-team.png')" }}
    >
      <div className="wrapper">
        <div className="max-w-xl">
          <h1 className="text-white">About Us</h1>
          <h3 className="text-white">
            Making technology accessible and useful for those who create
            communities.
          </h3>
        </div>
      </div>
    </header>
  );
};

export default Hero;
