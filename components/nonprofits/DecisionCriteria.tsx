import { FC } from "react";

const DecisionCriteria: FC = () => {
  return (
    <section className="content flex lg:space-x-12 mb-32 md:mb-20">
      {/* Image */}
      <div className="flex-1 hidden lg:block">
        <img
          src="/nonprofits/people-on-phone.svg"
          alt="People sitting on a phone"
        />
      </div>

      {/* Criteria list */}
      <div className="md:w-5/6 lg:flex-1">
        <h2 className="text-blue">Decision Criteria</h2>
        <hr className="w-20 mt-4 mb-8 text-blue" />
        <p className="mb-5">
          These are the primary criteria we use to determine project fit:
        </p>
        <ol className="flex flex-col space-y-6">
          <li>
            <h6 className="text-blue">1. Impact</h6>
            <p>
              How much will the project impact the community? We prefer projects
              that will provide the maximal benefit to the target community.
            </p>
          </li>
          <li>
            <h6 className="text-blue">2. Necessity</h6>
            <p>
              How vital is the project to the non-profit organization, and does
              the organization have other means to complete the project? We want
              to ensure that we are helping organizations that truly need our
              services.
            </p>
          </li>
          <li>
            <h6 className="text-blue">3. Scope</h6>
            <p>
              Is completing the project feasible within our timeline? We want to
              ensure that we can finish the project and deliver quality results
              within a reasonable time.
            </p>
          </li>
          <li>
            <h6 className="text-blue">4. Technical fit</h6>
            <p>
              Does your project use the capabilities of technology? Does it fit
              well with our team's areas of expertise?
            </p>
          </li>
          <li>
            <h6 className="text-blue">5. Credibility</h6>
            <p>
              Is it clear that the project will have an impact? We like to see
              evidence that supports this! We also prefer to work with
              non-profits that have a proven track record of doing good.
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
};

export default DecisionCriteria;
