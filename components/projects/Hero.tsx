import { FC } from "react";
import Button from "@components/common/Button";

/** Hero section of Projects page */
const Hero: FC = () => {
  return (
    <header className="h-[768px] w-full flex flex-col justify-center bg-blue">
      <div className="content flex flex-col md:flex-row space-y-10 md:space-y-0 justify-between items-center">
        <div className="md:max-w-sm lg:max-w-xl">
          <h1 className="text-white mb-4 md:mb-0">Projects</h1>
          <p className="text-white text-xl mb-8">
            With transparency and accessibility always top-of-mind, all of
            Blueprint’s work is open source. We believe in building technology
            that makes our community more open and connected.
          </p>
          <div className="w-full flex md:items-end">
            <Button
              className="md:ml-auto h-auto py-4 bg-transparent"
              size="md"
              variant="secondary"
              invert
              href="/nonprofits"
            >
              Apply to be our next nonprofit partner!
            </Button>
          </div>
        </div>
        <div className="w-full">
          {/* TODO: Fix left whitespace in image */}
          <img src="/projects/people-at-table.svg" />
        </div>
      </div>
    </header>
  );
};

export default Hero;
