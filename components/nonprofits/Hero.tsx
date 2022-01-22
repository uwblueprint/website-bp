import { FC } from "react";

const Hero: FC = () => {
  return (
    <header
      className="h-[660px] w-full mb-60 bg-no-repeat bg-bottom bg-cover"
      style={{ backgroundImage: "url('/nonprofits/hero-background.svg')" }}
    >
      <div className="relative h-full w-full content flex items-end">
        <div className="max-w-2xl pb-32">
          <h1 className="text-blue mb-3">For Nonprofits</h1>
          <h5 className="text-blue text-xl">
            We're a group of University of Waterloo students that solve
            technical problems for nonprofit organizations - all free of charge.
          </h5>
        </div>
        <img
          className="h-[420px] absolute bottom-[-50px] right-[-320px]"
          src="/nonprofits/superheroes.svg"
          alt="Superheroes"
        />
      </div>
    </header>
  );
};

export default Hero;
