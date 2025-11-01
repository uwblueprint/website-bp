import { FC } from "react";

const Hero: FC = () => {
  return (
    <header
      className="h-144 md:h-[670px] w-full relative flex flex-col justify-end pb-24 md:pb-32 bg-cover bg-center"
      style={{ backgroundImage: "url('/about/f25-bot.png')" }}
    >
      <div className="content">
        <div className="max-w-xl space-y-3">
          <h1 className="text-white">About Us</h1>
          <h3 className="text-white font-normal">
            Making technology accessible and useful for those who create
            communities.
          </h3>
        </div>
      </div>
    </header>
  );
};

export default Hero;
