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
    <section className="content flex flex-col gap-18">
      <div>
        <h2 className="text-blue">Our Process</h2>
        <hr className="w-20 mt-4 mb-10 text-blue" />
      </div>
      <div className="flex divide-x divide-charcoal-300">
        <div className="flex-1 flex flex-col gap-4 pr-6">
          <div className="h-20 w-20 relative">
            <img
              className="absolute -left-5"
              src="/join/process-blob-1.svg"
              alt="Process step 1 blob"
            />
            <h1 className="relative z-10 text-blue text-[64px] font-bold">1</h1>
          </div>
          <h6>Learn about Blueprint</h6>
          <p>
            Check out our current projects and team on our{" "}
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
        </div>
        <div className="flex-1 flex flex-col gap-4 px-6">
          <div className="h-20 w-20 relative">
            <img
              className="absolute -left-4"
              src="/join/process-blob-2.svg"
              alt="Process step 1 blob"
            />
            <h1 className="relative z-10 text-blue text-[64px] font-bold">2</h1>
          </div>
          <h6>Submit your application</h6>
          <p>
            Tell us a little bit about yourself and why you're interested in
            joining Blueprint. We make sure to go through every application
            thoroughly. If we think you might be a good fit, we will extend you
            an invite to a coffee chat! Applications open{" "}
            <span className="text-blue">{APPLICATION_OPEN_DATETIME}</span> and
            close{" "}
            <span className="text-blue">{APPLICATION_CLOSE_DATETIME}</span>.
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-4 px-6">
          <div className="h-20 w-20 relative">
            <img
              className="absolute -left-5"
              src="/join/process-blob-3.svg"
              alt="Process step 1 blob"
            />
            <h1 className="relative z-10 text-blue text-[64px] font-bold">3</h1>
          </div>
          <h6>Chat with us</h6>
          <p>
            Let's chat! We'll send out invites on{" "}
            <span className="text-blue">{INVITE_DATE}</span>, to schedule a time
            for us to connect. These chats will take place over the upcoming
            week, and will be a casual conversation between you and a couple of
            our members. We want to learn more about you, and you can also use
            this time to ask us any questions you might have!
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-4 pl-6">
          <div className="h-20 w-20 relative">
            <img
              className="absolute -left-4"
              src="/join/process-blob-4.svg"
              alt="Process step 1 blob"
            />
            <h1 className="relative z-10 text-blue text-[64px] font-bold">4</h1>
          </div>
          <h6>Final decision</h6>
          <p>
            We will get back to you by{" "}
            <span className="text-blue">{FINAL_DECISION_DATE}</span> to let you
            know our final decision. If we feel you’d be a good fit for the
            team, we would love for you to join! Get back to us as soon as
            possible regarding whether you would like to be part of our team
            next term, so we can get started with onboarding.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
