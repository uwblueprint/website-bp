import { FC } from "react";

/** Why Join section */
const WhyJoin: FC = () => {
  return (
    <section className="content flex justify-end mt-8 mb-32">
      <div>
        <h2 className="text-blue">Why join?</h2>
        <hr className="w-20 mt-4 mb-10 text-blue" />
        <div className="max-w-xl flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h6 className="text-blue">Make a meaningful impact</h6>
            <p>
              We work with NPOs on causes we are passionate about and create
              solutions that amplify their positive impact in our community.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h6 className="text-blue">Join our community</h6>
            <p>
              We develop meaningful relationships that extend beyond the scope
              of the projects we work on. We value time spent together,
              celebrate our differences, and have a lot of fun.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h6 className="text-blue">Level up!</h6>
            <p>
              We value the technical, social, and personal growth of our peers.
              Our strong culture of mentorship perpetuates a cycle of non-stop
              teaching and learning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyJoin;
