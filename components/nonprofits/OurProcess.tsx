import { FC, useState } from "react";
import PHASES from "@constants/nonprofit-process.json";

const OurProcess: FC = () => {
  const [selectedPhase, setSelectedPhase] = useState(0);

  return (
    <section className="content flex flex-col space-y-18 mb-32">
      <div>
        <h2 className="text-blue">Our Process</h2>
        <hr className="w-20 mt-4 mb-10 text-blue" />
      </div>
      <div className="flex items-stretch divide-x divide-blue">
        {/* List of phases */}
        <ol className="flex flex-col space-y-7 pr-8">
          {PHASES.map(({ step, name }, i) => (
            <li key={step}>
              <button onClick={() => setSelectedPhase(i)}>
                <h4
                  className={`text-blue ${
                    i !== selectedPhase && "opacity-50"
                  } uppercase text-left`}
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
          <div className="h-full flex space-x-5 p-8 rounded-3xl bg-sky-100">
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
                className="h-full w-72 rounded-3xl object-cover"
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
