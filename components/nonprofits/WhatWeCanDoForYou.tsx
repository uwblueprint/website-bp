import { FC } from "react";

const WhatWeCanDoForYou: FC = () => {
  return (
    <section className="content mb-0 lg:mb-16">
      <h2 className="text-blue">What we can do for you</h2>
      <hr className="w-20 mt-4 mb-10 text-blue" />
      <div className="flex flex-col space-y-12 lg:flex-row lg:space-x-20">
        {/* 3 points */}
        <ol className="flex-1 flex flex-col space-y-9">
          <li className="flex items-start space-x-4 md:space-x-6">
            <div className="relative">
              <img
                className="w-16"
                src="/nonprofits/process-blob-1.svg"
                alt="Process step 1 blob"
              />
              <h1 className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 row-start-1 text-blue text-[48px] font-medium">
                1
              </h1>
            </div>
            <div className="flex-1 flex flex-col space-y-2">
              <h6>HELP DETERMINE WHERE OUR SERVICES CAN MAKE AN IMPACT</h6>
              <p>
                We recognize that sometimes it can be challenging to pinpoint
                exactly how a technology solution can add value to your
                organization. However, with a proven track-record of delivering
                tech-enabled impact, we believe in the power of technology to
                better organizational efforts in the social sector. Which is why
                our process begins with a series of calls dedicated to
                project-scoping in order to help us identify what the best
                solution for your organization looks like.
              </p>
            </div>
          </li>
          <li className="flex items-start space-x-4 md:space-x-6">
            <div className="relative">
              <img
                className="w-16"
                src="/nonprofits/process-blob-2.svg"
                alt="Process step 2 blob"
              />
              <h1 className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 row-start-1 text-blue text-[48px] font-medium">
                2
              </h1>
            </div>
            <div className="flex-1 flex flex-col space-y-2">
              <h6>
                SPEARHEAD TECH-ENABLED PROJECTS WITH HIGH-CALIBRE TEAMS AND
                CLEAR COMMUNICATIONS
              </h6>
              <p>
                UW Blueprint leverages a comprehensive hiring process in order
                to bring on the most tenacious and passionate student leaders.
                Our skillful team of developers and designers have in-industry
                experience as product managers, software developers, designers,
                and technical leaders at companies including Facebook, Google,
                and Shopify to name a few. With that said, our committed
                students will get the job done with minimal hand holding - in
                order to support you in doing what you do best, <em>better</em>.
              </p>
            </div>
          </li>
          <li className="flex items-start space-x-4 md:space-x-6">
            <div className="relative">
              <img
                className="w-16"
                src="/nonprofits/process-blob-3.svg"
                alt="Process step 3 blob"
              />
              <h1 className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 row-start-1 text-blue text-[48px] font-medium">
                3
              </h1>
            </div>
            <div className="flex-1 flex flex-col space-y-2">
              <h6>DELIVER HIGH QUALITY SOFTWARE SOLUTIONS</h6>
              <p>
                From website redesigns and application developments, to system
                optimization efforts, our team delivers innovative products of
                the highest quality. With sustainability always top-of-mind, we
                are also committed to providing your team with the necessary
                training and resources to maintain the solutions built uniquely
                for you by your UW Blueprint team.
              </p>
            </div>
          </li>
        </ol>

        {/* Quote */}
        <div className="mx-auto md:max-w-2xl lg:w-[432px] flex flex-col items-end">
          <div className="relative z-10 px-8 py-8 rounded-3xl bg-sky-100">
            <p>
              “Each step of the way, Blueprint’s team asked lots of questions to
              ensure what they were developing matched expectations, and were
              transparent around their processes. From building in the ability
              to rank applications to ensuring the portal’s colours matched our
              brand, they were responsive to our requests, and fantastic to work
              with.”
            </p>
          </div>
          <div className="h-56 lg:w-80 relative -top-20 md:-right-12 lg:-right-6 flex flex-col justify-end -mt-8 px-8 pt-10 pb-8 rounded-3xl bg-charcoal-100">
            <div className="flex">
              <div className="mr-1">
                <p className="font-semibold">- </p>
              </div>
              <div>
                <p className="font-semibold">Taryn Graham</p>
                <p>Operations & Communications Manager at SVPWR</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeCanDoForYou;
