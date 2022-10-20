import { FC } from "react";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  MEDIUM_URL,
} from "@constants/social-media";
import {
  APPLICATION_OPEN_DATETIME,
  APPLICATION_CLOSE_DATETIME,
  INVITE_DATE,
  FINAL_DECISION_DATE,
} from "@constants/applications";

const OurProcess: FC = () => {
  return (
    <section className="content flex flex-col space-y-18 mb-24">
      <div>
        <h2 className="text-blue">Our Process</h2>
        <hr className="w-20 mt-4 mb-10 text-blue" />
      </div>
      <ol className="flex flex-col md:flex-row md:divide-x md:divide-charcoal-300 space-y-10 md:space-y-0">
        <li className="flex-1 flex flex-col space-y-4 md:pr-6">
          <div className="relative w-16 h-16 mb-3">
            <img
              className="w-full h-full"
              src="/join/process-blob-1.svg"
              alt="Process step 1 blob"
            />
            <h1 className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 row-start-1 text-blue text-[48px] font-medium">
              1
            </h1>
          </div>
          <h6>Learn about Blueprint</h6>
          <p>
            Check out our current projects and find us on{" "}
            <a className="text-blue" href={FACEBOOK_URL} target="_blank">
              Facebook
            </a>
            ,{" "}
            <a className="text-blue" href={INSTAGRAM_URL} target="_blank">
              Instagram
            </a>{" "}
            and{" "}
            <a className="text-blue" href={MEDIUM_URL} target="_blank">
              Medium
            </a>
            .
          </p>
        </li>
        <li className="flex-1 flex flex-col space-y-4 md:px-6">
          <div className="relative w-16 h-16 mb-3">
            <img
              className="w-full h-full"
              src="/join/process-blob-2.svg"
              alt="Process step 1 blob"
            />
            <h1 className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 row-start-1 text-blue text-[48px] font-medium">
              2
            </h1>
          </div>
          <h6>Submit your application</h6>
          <p>
            Tell us about yourself and why you're interested in joining
            Blueprint. We take a great amount of care to review every
            application, so please be as detailed as possible. If we think you
            might be a good fit, we will send you an invite to have a coffee
            chat with us! Applications open{" "}
            <span className="text-blue">{APPLICATION_OPEN_DATETIME}</span> and
            close{" "}
            <span className="text-blue">{APPLICATION_CLOSE_DATETIME}</span>.
          </p>
        </li>
        <li className="flex-1 flex flex-col space-y-4 md:px-6">
          <div className="relative w-16 h-16 mb-3">
            <img
              className="w-full h-full"
              src="/join/process-blob-3.svg"
              alt="Process step 1 blob"
            />
            <h1 className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 row-start-1 text-blue text-[48px] font-medium">
              3
            </h1>
          </div>
          <h6>Chat with us</h6>
          <p>
            Let's talk! We'll send out invites by{" "}
            <span className="text-blue">{INVITE_DATE}</span> to schedule a time
            for us to connect. These chats will take place over the upcoming
            week, and you’ll have a casual conversation with a couple of our
            members. You can use this time to ask us any questions you might
            have, and we can get to know each other better!
          </p>
        </li>
        <li className="flex-1 flex flex-col space-y-4 md:pl-6">
          <div className="relative w-16 h-16 mb-3">
            <img
              className="w-full h-full"
              src="/join/process-blob-4.svg"
              alt="Process step 1 blob"
            />
            <h1 className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 row-start-1 text-blue text-[48px] font-medium">
              4
            </h1>
          </div>
          <h6>Final decision</h6>
          <p>
            We’ll let you know our final decision around{" "}
            <span className="text-blue">{FINAL_DECISION_DATE}</span>. If we feel
            you’d be a good fit at Blueprint, we’d appreciate it if you replied
            as soon as possible regarding whether you’ll be joining our team
            next term or not so we can get started with onboarding.
          </p>
        </li>
      </ol>
    </section>
  );
};

export default OurProcess;
