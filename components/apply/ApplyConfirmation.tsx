import { FC } from "react";

const ApplyConfirmation: FC = () => {
  return (
    <section className="container max-w-4xl px-4 mx-auto mt-36 md:mt-40 text-center">
      <h3 className="my-12 text-blue-100">
        Thanks For Submitting Your Application!
      </h3>
      <p className="my-4 text-charcoal-500">
        A member of our team will reach out to you shortly.
      </p>
      <p className="my-4 text-charcoal-500">
        Please don't hesitate to contact us with any questions about your
        application.
      </p>
      <a href="https://www.uwblueprint.org" className="text-blue-100">
        Back to main site
      </a>
      <div className="flex justify-center">
        <img
          className="mt-12 w-80"
          src="/about/learning-is-a-team-sport.svg"
          alt="People at table"
        />
      </div>
    </section>
  );
};

export default ApplyConfirmation;
