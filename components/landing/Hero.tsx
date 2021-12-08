import { FC } from "react";
import Button from "@components/common/Button";

/** Hero section */
const Hero: FC = () => {
  return (
    <header
      className="min-h-screen w-full relative z-10 flex flex-col items-center gap-10"
      // style={{ backgroundImage: "url(/landing/hero-background.svg)" }}
    >
      {/* Background image (need section height to be defined by background dimensions) */}
      <img
        className="w-full"
        src="/landing/hero-background.svg"
        alt="People supporting social good"
      />

      <div className="h-full absolute flex flex-col items-center">
        <div className="flex-[4]">
          {/* Hero section */}
          <div
            className="w-full flex flex-col justify-center items-center gap-5"
            // Workaround to always keep hero text in centre of page or graphic
            style={{ height: "min(100vh, 100%)" }}
          >
            <div className="flex flex-col items-center">
              <img src="/landing/hero-logo.svg" alt="UW Blueprint logo" />
              <h4 className="text-white">
                tech for social good. built by students.
              </h4>
            </div>
            <div className="flex gap-4">
              <Button variant="secondary" invert>
                See our work
              </Button>
              <Button variant="secondary" invert href="/join">
                Join our team
              </Button>
            </div>
          </div>
        </div>

        {/* Mission statement (overflowed) */}
        <div className="flex-[1]">
          <h3 className="max-w-5xl text-blue text-center">
            Blueprint strives to make technology accessible and useful for those
            who create communities and promote social good.
          </h3>
        </div>
      </div>
    </header>
  );
};

export default Hero;
