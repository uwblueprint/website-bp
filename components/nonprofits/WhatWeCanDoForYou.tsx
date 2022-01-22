import { FC } from "react";

const WhatWeCanDoForYou: FC = () => {
  return (
    <section className="content mb-28">
      <h2 className="text-blue">What we can do for you</h2>
      <hr className="w-20 mt-4 mb-10 text-blue" />
      <div className="flex flex-col space-y-12 lg:flex-row lg:space-x-20">
        {/* 3 points */}
        <ol className="flex-1 flex flex-col space-y-9">
          <li className="flex items-start space-x-5">
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
              <h6>Help you determine where you can use our services</h6>
              <p>
                We understand that sometimes it’s challenging to identify where
                you can make the best use of a technology solution. Our process
                begins with several scoping calls to determine what the best
                solution for your organization.
              </p>
            </div>
          </li>
          <li className="flex items-start space-x-5">
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
              <h6>Spearhead the project with clear communication</h6>
              <p>
                Our skillful students have experience as Product Managers,
                developers, designers, and technical leaders at companies
                including Facebook, Google and Shopify. Our team will get the
                job done with minimal hand holding, so you can focus on doing
                what you do best: serving your clients.{" "}
              </p>
            </div>
          </li>
          <li className="flex items-start space-x-5">
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
              <h6>Deliver high quality software solutions</h6>
              <p>
                Whether an application, website redesign or designing a more
                efficient system, our team delivers innovative and high quality
                products. We also ensure that your team is provided with the
                necessary training to maintain the solutions we build with you.
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
