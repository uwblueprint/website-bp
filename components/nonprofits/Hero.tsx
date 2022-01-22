import { FC } from "react";

const Hero: FC = () => {
  return (
    <header className="pt-36 md:pt-48 w-full mb-36 md:mb-60 bg-no-repeat bg-bottom bg-cover md:bg-nonprofits-md lg:bg-nonprofits-lg">
      <div className="relative h-full w-full content flex flex-col md:flex-row lg:items-end">
        <div className="max-w-2xl md:pb-40 lg:pt-32 lg:pb-0">
          <h1 className="text-blue md:text-white lg:text-blue mb-3">
            For Nonprofits
          </h1>
          <h5 className="text-charcoal-600 md:text-white lg:text-blue font-normal md:text-xl md:w-1/2 lg:w-5/6">
            We're a group of University of Waterloo students that solve
            technical problems for nonprofit organizations - all free of charge.
          </h5>
        </div>
        <img
          className="block mx-auto w-120 md:absolute md:-bottom-8 md:-right-8 md:w-120 lg:w-160 lg:-right-24"
          src="/nonprofits/superheroes.svg"
          alt="Superheroes"
        />
      </div>
    </header>
  );
};

export default Hero;
