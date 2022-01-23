import { FC, useState } from "react";
import PHASES from "@constants/nonprofit-process.json";

const OurProcess: FC = () => {
  const [selectedPhase, setSelectedPhase] = useState(0);

  return (
    <section className="content flex flex-col space-y-18 mb-32 pr-0 md:pr-4">
      <div>
        <h2 className="text-blue mb-4 md:mb-0">Our Process</h2>
        <hr className="hidden md:block w-20 mt-4 mb-10 text-blue" />
      </div>
      {/* Mobile */}
      <ol className="flex md:hidden space-x-4 overflow-x-auto snap-mandatory snap-x">
        {PHASES.map(({ step, name, description }, i) => (
          <li
            key={step}
            className="flex-none snap-start last:pr-4"
            style={{ width: "calc(100% - 32px)" }}
          >
            <div className="bg-sky p-6 rounded-lg">
              <h4 className={`text-blue md:uppercase text-left`}>
                Phase {step}
              </h4>
              <p className={`text-blue text-left mb-4`}>{name}</p>
              <p className="text-left">{description}</p>
            </div>
          </li>
        ))}
      </ol>
      {/* Tablet and Desktop */}
      <div className="hidden md:flex items-stretch md:divide-x divide-blue">
        {/* List of phases */}
        <ol className="flex flex-col space-y-7 md:pr-8">
          {PHASES.map(({ step, name }, i) => (
            <li key={step}>
              <button onClick={() => setSelectedPhase(i)}>
                <h4
                  className={`text-blue ${
                    i !== selectedPhase && "opacity-50"
                  } md:uppercase text-left`}
                >
                  Phase {step}
                </h4>
                <p
                  className={`text-blue ${
                    i !== selectedPhase && "opacity-50"
                  } text-left`}
                >
                  {name}
                </p>
              </button>
            </li>
          ))}
        </ol>

        {/* Description for selected phase */}
        <div className="flex-1 pl-8">
          <div className="h-full flex flex-col md:space-y-8 lg:flex-row lg:space-x-5 lg:space-y-0 p-10 rounded-3xl bg-sky-100">
            <div className="flex-1 flex flex-col space-y-2">
              <h6 className="text-blue normal-case">
                {PHASES[selectedPhase].name}
              </h6>
              <hr className="w-16 text-blue" />
              <p>{PHASES[selectedPhase].description}</p>
            </div>
            <div>
              {/* TODO: Replace image dependent on phase */}
              <img
                className="h-full w-full lg:w-72 rounded-3xl object-cover"
                src="/nonprofits/product-polish.png"
                alt="Blueprint member pointing at whiteboard"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
