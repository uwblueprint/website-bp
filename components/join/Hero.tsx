import { FC } from "react";
import Button from "@components/common/Button";
import {
  APPLICATION_OPEN_DATETIME,
  APPLICATION_CLOSE_DATETIME,
} from "@constants/applications";

/** Hero section */
const Hero: FC = () => {
  const currentDate = new Date();
  const openDate = new Date(APPLICATION_OPEN_DATETIME);
  const closeDate = new Date(APPLICATION_CLOSE_DATETIME);
  const applicationIsLive = openDate < currentDate && currentDate < closeDate;

  return (
    <header className="mt-36 md:mt-0 md:h-[660px] w-full flex justify-around items-center bg-no-repeat bg-bottom bg-cover md:bg-join-hero pb-8 md:pb-0">
      <div className="max-w-6xl flex flex-col md:flex-row px-4">
        <div className="md:-mt-8 lg:mt-0 mb-6 md:mb-0">
          <h1 className="text-blue-100 mb-4 md:mb-0 md:text-white">
            Join our Team
          </h1>
          <div className="space-y-6">
            <p className="md:text-white text-xl">
              We are a group of friendly folks at the University of Waterloo
              dedicated to building technology for social good.
            </p>
            {applicationIsLive && (
              <Button
                className="bg-transparent border-blue text-blue-100 md:border-white md:text-white"
                // invert={true}
                size="lg"
                variant="secondary"
                href="/nonprofits"
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
