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
          Projects selected to be apart of our next cohort will be determined
          against the following criteria:
        </p>
        <ol className="flex flex-col space-y-6">
          <li>
            <h6 className="text-blue">1. Impact Potential</h6>
            <p>
              What is the breadth and depth of impact this project will provide
              toward the community? Projects that generate the greatest levels
              of social impact will be prioritized for selection by our team.
            </p>
          </li>
          <li>
            <h6 className="text-blue">2. Necessity</h6>
            <p>
              To what extent is project execution crucial to the nonprofit? Are
              there alternative ways that the organization can overcome their
              challenges without technology? We want to ensure that we are
              helping organizations that truly need our services.
            </p>
          </li>
          <li>
            <h6 className="text-blue">3. Scope</h6>
            <p>
              Is project completion realistic within our team’s timeline? We
              want to uphold accountability to completing high calibre projects
              and delivering results within a reasonable time frame.
            </p>
          </li>
          <li>
            <h6 className="text-blue">4. Technical fit</h6>
            <p>
              Is the core of the project rooted in technology and aligned with
              our core capabilities? In order to ensure best results, we want to
              make sure only projects that fit well within our team’s area of
              expertise are selected.
            </p>
          </li>
          <li>
            <h6 className="text-blue">5. Credibility</h6>
            <p>
              Is it clear that the project will generate a measurable and
              intentional impact? Working with nonprofits that have a proven
              track record of doing good is highly important for our team, and
              we love to be able to provide evidence of project impact!
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
};

export default DecisionCriteria;
