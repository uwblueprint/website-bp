import { FC } from "react";

/** UW Blueprint Impact section */
const Impact: FC = () => {
  return (
    <>
      <section className="w-full relative pt-24 pb-24 md:pb-20 px-4 md:px-0 bg-top bg-cover bg-origin-border">
        {/* Background image */}
        <div className="absolute -top-8 inset-x-0 bottom-0 overflow-hidden">
          <img
            className="w-full absolute -top-80"
            src="/landing/impact-background.svg"
            alt="Impact section background"
          />
        </div>

        <div className="relative z-10 flex flex-col items-start md:items-center space-y-4">
          {/* Section header */}
          <h2 className="text-blue mb-6 md:text-center md:mb-0 w-5/6 md:w-3/4 lg:w-full">
            Here's how we measure our impact
          </h2>
          <hr className="hidden md:block w-48 text-blue" />

          {/* Impact metrics */}
          <div className="w-full flex flex-col items-start md:flex-row md:items-center justify-around space-y-12 md:space-y-0 md:py-12 lg:px-32">
            <div className="flex flex-col md:items-center space-y-2 md:space-y-4">
              <p className="text-7xl text-sky-400 font-semibold font-poppins">
                22
              </p>
              <h6 className="md:text-center">Non-profit projects</h6>
            </div>
            <div className="flex flex-col md:items-center space-y-2 md:space-y-4">
              <p className="text-7xl md:text-8xl text-blue font-semibold font-poppins">
                70,000
              </p>
              <h6 className="md:text-center">Accumulated volunteer hours</h6>
            </div>
            <div className="flex flex-col md:items-center space-y-2 md:space-y-4">
              <p className="text-7xl text-sky-400 font-semibold font-poppins">
                468
              </p>
              <h6 className="md:text-center">Student volunteers</h6>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Impact;
