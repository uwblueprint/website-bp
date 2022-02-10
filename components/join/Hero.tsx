import { FC } from "react";
import Button from "@components/common/Button";
import { APPLICATION_IS_LIVE, APPLICATION_LINK } from "@constants/applications";

/** Hero section */
const Hero: FC = () => {
  return (
    <header className="mt-36 md:mt-0 md:h-[660px] w-full flex justify-around items-center bg-no-repeat bg-bottom bg-cover md:bg-join-hero pb-8 md:pb-0">
      <div className="max-w-6xl flex flex-col md:flex-row px-4">
        <div className="md:-mt-8 lg:mt-0 mb-6 md:mb-0">
          <h1 className="text-blue-100 mb-4 md:mb-0 md:text-white">
            Join our Team
          </h1>
          <div className="space-y-6">
            <p className="md:text-white text-xl w-full lg:w-11/12">
              We’re a diverse group of students dedicated to doing social good,
              improving ourselves, and having fun while we’re at it, and we
              would love for you to join us!
            </p>
            {APPLICATION_IS_LIVE && (
              <Button
                className="bg-transparent border-blue text-blue-100 md:border-white md:text-white"
                size="lg"
                variant="secondary"
                href={APPLICATION_LINK}
              >
                Apply now
              </Button>
            )}
          </div>
        </div>
        <div>
          <img
            className="mx-auto md:translate-y-36 md:scale-125 md:-translate-x-10 lg:translate-x-0 lg:translate-y-0 lg:scale-100"
            src="/join/people-cheering.svg"
            alt="People cheering"
          />
        </div>
      </div>
    </header>
  );
};

export default Hero;
