import { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/common/Layout";
import Button from "@components/common/Button";
import Hero from "@components/about/Hero";

/** About Us page */
const About: NextPage = () => {
  return (
    <Layout>
      <Hero />

      {/* Our Mission section */}
      <section className="content flex flex-col md:items-center mb-8 pt-16 md:pt-10 pb-4 md:pb-0 md:h-80 bg-no-repeat bg-top md:bg-about-us-mission">
        <h2 className="text-blue mb-4 md:mb-0">Our Mission</h2>
        <hr className="hidden md:block w-20 mt-3 mb-8 text-blue" />
        <p className="max-w-lg text-lg md:text-center font-light font-poppins italic">
          Blueprint strives to make technology more accessible and useful for
          those who create communities and promote public welfare.
        </p>
      </section>

      {/* Who we are, What we do, Our story */}
      <section className="content flex md:space-x-12 lg:space-x-8 mt-16 mb-20">
        <div className="hidden md:block w-5/12 lg:w-1/2 md:bg-about-us-circles-md lg:bg-about-us-circles-lg bg-contain bg-no-repeat bg-center" />
        <div className="flex-1 flex flex-col space-y-12">
          <div className="flex flex-col">
            <h2 className="text-blue md:text-4xl mb-3 md:mb-1.5">Who we are</h2>
            <hr className="hidden md:block w-20 mt-3 mb-6 lg:mb-8 text-blue" />
            <p className="mb-2 text-lg font-semibold w-11/12">
              Passionate about the intersection between technology and social
              impact.
            </p>
            <p className="mb-6">
              We are a group of students at the University of Waterloo dedicated
              to building technology for social good and driving meaningful
              change. Each term, our project teams work alongside nonprofits in
              order to support their efforts toward better serving our
              communities.
            </p>
            <Link href="/students">
              <a className="flex space-x-1.5 items-center text-blue text-base font-extrabold">
                <p className="font-semibold">Meet the team</p>
                <img
                  className="relative top-[1px]"
                  src="/common/right-carat-blue.svg"
                  alt="Right carat"
                />
              </a>
            </Link>
          </div>
          <div className="flex flex-col">
            <h2 className="text-blue md:text-4xl mb-3 md:mb-1.5">What we do</h2>
            <hr className="hidden md:block w-20 mt-3 mb-6 lg:mb-8 text-blue" />
            <p className="mb-2 text-lg font-semibold">
              Amplify the impact of solutions that matter in the social sector.
            </p>
            <p className="mb-3">
              We partner with local nonprofits, working together to better
              understand their existing processes and provide technology
              services such as website and mobile application development, and
              data analytics to augment them - free of charge.
            </p>
            <Link href="/projects">
              <a className="flex space-x-1.5 items-center text-blue text-base font-extrabold">
                <p className="font-semibold">See our work</p>
                <img
                  className="relative top-[1px]"
                  src="/common/right-carat-blue.svg"
                  alt="Right carat"
                />
              </a>
            </Link>
          </div>
          <div className="flex flex-col">
            <h2 className="text-blue md:text-4xl mb-3 md:mb-1.5">Our Story</h2>
            <hr className="hidden md:block w-20 mt-3 mb-6 lg:mb-8 text-blue" />
            <p className="mb-2 text-lg font-semibold">
              A community built across universities.
            </p>
            <p className="mb-3">
              Founded in 2012 at UC Berkeley, Blueprint aims to promote
              technology for social good by developing pro-bono software
              solutions for nonprofits. The University of Waterloo is
              Blueprint’s first chapter outside of Berkeley, serving communities
              in Canada.
            </p>
            {/* TODO: Link to other Blueprint chapters */}
            <Link href="https://calblueprint.org/chapters">
              <a className="flex space-x-1.5 items-center text-blue text-base font-extrabold">
                <p className="font-semibold">
                  Check out other Blueprint chapters
                </p>
                <img
                  className="relative top-[1px]"
                  src="/common/right-carat-blue.svg"
                  alt="Right carat"
                />
              </a>
            </Link>
          </div>
        </div>
      </section>
      {/* Our Values section */}
      <section className="content flex flex-col mb-4">
        <h2 className="text-blue mb-4 md:mb-0">Our Values</h2>
        <hr className="hidden md:block w-20 mt-3 md:mb-10 text-blue" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-20 gap-y-14 lg:gap-16">
          <div className="flex flex-col space-y-2.5">
            <img
              className="mb-5 w-5/6 mx-auto lg:w-full"
              src="/about/amplifying-impact.svg"
              alt="Woman holding laptop"
            />
            <h6 className="mb-1">Amplifying impact</h6>
            <p className="text-charcoal-500">
              Projects are chosen to help social causes where technology as a
              solution makes sense and drives greatest levels of change within
              local communities.
            </p>
          </div>
          <div className="flex flex-col space-y-2.5">
            <img
              className="mb-5 w-5/6 mx-auto lg:w-full"
              src="/about/do-good-for-good.svg"
              alt="Man projecting Earth"
            />
            <h6>Do good for good</h6>
            <p className="text-charcoal-500">
              It is our shared philosophy that pro-bono work in no way implies
              substandard work. Our teams treat all of our projects with the
              utmost care and integrity.
            </p>
          </div>
          <div className="flex flex-col space-y-2.5">
            <img
              className="mb-5 w-5/6 mx-auto lg:w-full"
              src="/about/learning-is-a-team-sport.svg"
              alt="People at table"
            />
            <h6>Learning is a team sport</h6>
            <p className="text-charcoal-500">
              Collectively curious, and collaboratively learning from each other
              and our communities about how we can leverage our skills to drive
              meaningful change.
            </p>
          </div>
          <div className="flex flex-col space-y-2.5">
            <img
              className="mb-5 w-5/6 mx-auto lg:w-full"
              src="/about/culture-is-key.svg"
              alt="People holding flag"
            />
            <h6>Culture is key</h6>
            <p className="text-charcoal-500">
              We’re a team that cares about each other as much as we care about
              the causes we’re building for. We thrive to maintain a supportive
              and welcoming environment, always.
            </p>
          </div>
        </div>
      </section>
      {/* Our Sponsors section */}
      <section className="content flex flex-col items-center space-y-8 py-8">
        <h2 className="text-blue mb-4 md:mb-0">Our Sponsors</h2>
        <hr className="hidden md:block w-20 text-blue" />
        <p className="max-w-lg text-lg mb-5 md:text-center font-light font-poppins italic">
          A huge thank you to our sponsors for supporting our team and our
          mission!
        </p>
        <Link href="mailto:info@uwblueprint.org">
          <a>
            <Button className="leading-relaxed mb-5">Become a sponsor</Button>
          </a>
        </Link>
        <div className="grid grid-cols-1 justify-items-center lg:grid-cols-2 gap-x-20 gap-y-14 lg:gap-16 pt-16">
          <img
            className="h-32 object-contain"
            src="/about/mef-logo.png"
            alt="Math Endowment Fund Logo"
          />
          <img
            className="h-32 object-contain"
            src="/about/roblox-logo.png"
            alt="Roblox Logo"
          />
          <img
            className="h-32 object-contain"
            src="/about/techyon-logo.png"
            alt="Techyon Logo"
          />
          <img
            className="h-32 object-contain"
            src="/about/weef-logo.png"
            alt="Waterloo Engineering Endowment Fund Logo"
          />
        </div>
      </section>
      {/* Interested in the work we do? */}
      <section className="content flex flex-col items-center space-y-8 py-24 gap-x-20 gap-y-14">
        <h2 className="text-blue text-2xl md:text-4xl uppercase">
          Interested in the work we do?
        </h2>
        <hr className="hidden md:block w-20 text-blue" />
        <Link href="/nonprofits">
          <a>
            <Button className="leading-relaxed">
              Learn about our project selection process
            </Button>
          </a>
        </Link>
      </section>
    </Layout>
  );
};

export default About;
