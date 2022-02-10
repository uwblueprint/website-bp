import { FC } from "react";
import Button from "@components/common/Button";

/** Hero section */
const Hero: FC = () => {
  return (
    <>
      <header
        className="w-full relative z-10 flex flex-col items-center bg-blue"
        // style={{ backgroundImage: "url(/landing/hero-background.svg)" }}
      >
        {/* Background image (need section height to be defined by background dimensions) */}
        <div className="w-full relative mt-80 md:mt-48 lg:mt-40 -mb-16">
          <img
            className="h-72 object-cover md:h-144 lg:w-full lg:h-auto"
            src="/landing/hero-background.svg"
            alt="People supporting social good"
          />
          <div className="absolute -top-1/2 md:top-0 lg:top-1/4 left-1/2 -translate-x-1/2 flex flex-col items-center w-full">
            {/* Hero section */}
            <div className="w-full flex flex-col justify-center items-center space-y-5">
              <div className="flex flex-col items-center">
                <img
                  className="hidden md:block"
                  src="/landing/hero-logo.svg"
                  alt="UW Blueprint logo"
                />
                <div className="text-white text-center flex flex-col lg:flex-row lg:space-x-2">
                  <h4 className="font-normal">tech for social good.</h4>
                  <h4 className="font-normal">built by students.</h4>
                </div>
              </div>
              <div className="flex flex-col md:ml-3 lg:ml-0 space-y-2 md:flex-row md:space-x-4 md:space-y-0">
                <Button variant="secondary" invert href="/projects">
                  See our work
                </Button>
                <Button variant="secondary" invert href="/join">
                  Join our team
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mission statement (overflowed) */}
      </header>
      <div className="bg-sky pt-36 lg:pt-32 pb-24 ld:pb-12">
        <h3 className="w-full px-4 lg:w-3/4 mx-auto text-blue text-left md:text-center font-normal lg:font-semibold">
          Blueprint is a student-run organization that creates technological
          solutions for nonprofit organizations.
        </h3>
      </div>
      <img
        className="w-full z-20"
        src="/landing/hero-wave.svg"
        alt="People supporting social good"
      />
    </>
  );
};

export default Hero;
