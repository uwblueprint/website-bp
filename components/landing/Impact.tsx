import { FC } from "react";

/** UW Blueprint Impact section */
const Impact: FC = () => {
  return (
    <>
      <section className="w-full relative pt-24 pb-20 bg-top bg-cover bg-origin-border">
        {/* Background image */}
        <div className="absolute -top-16 inset-x-0 bottom-0 overflow-hidden">
          <img
            className="w-full absolute -top-80"
            src="/landing/impact-background.svg"
            alt="Impact section background"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-4">
          {/* Section header */}
          <h2 className="text-blue">Here's how we measure our impact</h2>
          <hr className="w-48 text-blue" />

          {/* Impact metrics */}
          <div className="w-full flex items-center justify-around py-12 px-32">
            <div className="flex flex-col items-center gap-4">
              <p className="text-7xl text-sky-400 font-semibold font-poppins">
                22
              </p>
              <h6>Non-profit projects</h6>
            </div>
            <div className="flex flex-col items-center gap-4">
              <p className="text-8xl text-blue font-semibold font-poppins">
                70,000
              </p>
              <h6>Accumulated volunteer hours</h6>
            </div>
            <div className="flex flex-col items-center gap-4">
              <p className="text-7xl text-sky-400 font-semibold font-poppins">
                468
              </p>
              <h6>Student volunteers</h6>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Impact;
