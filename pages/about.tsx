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
      <section className="content h-80 flex flex-col md:items-center mb-8 pt-20 md:pt-10 bg-no-repeat bg-top md:bg-about-us-mission">
        <h2 className="text-blue mb-4 md:mb-0">Our Mission</h2>
        <hr className="hidden md:block w-20 mt-3 mb-8 text-blue" />
        <p className="max-w-xl text-lg font-light font-poppins italic">
          Blueprint strives to make technology accessible and useful for those
          who create communities and promote public welfare.
        </p>
      </section>

      {/* Who we are, What we do, Our story */}
      <section className="content flex md:space-x-12 lg:space-x-4 mt-16 mb-20">
        <div className="hidden md:block w-5/12 lg:w-1/2 md:bg-about-us-circles-md lg:bg-about-us-circles-lg bg-contain bg-no-repeat bg-center" />
        <div className="flex-1 flex flex-col space-y-12">
          <div className="flex flex-col">
            <h2 className="text-blue md:text-4xl mb-3 md:mb-1.5">Who we are</h2>
            <hr className="hidden md:block w-20 mt-3 mb-6 lg:mb-8 text-blue" />
            <p className="mb-2 text-lg font-semibold">Passionate to help.</p>
            <p className="mb-3">
              We are a group of students at the University of Waterloo dedicated
              to building and promoting technology for social good. Each term,
              teams of five students work with non-profit organizations on
              projects to help them better serve their communities.
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
              Amplifying the impact of solutions that matter.
            </p>
            <p className="mb-3">
              We partner with non-profits to provide technology services such as
              websites, mobile applications and analysis tools - free of charge.
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
              Blueprint was founded in 2012 at UC Berkeley. The University of
              Waterloo is Blueprint's first chapter outside of Berkeley.
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
        <h2 className="text-blue mb-8">Our Values</h2>
        <hr className="hidden md:block w-20 mt-3 md:mb-10 text-blue" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-20 gap-y-14 lg:gap-16">
          <div className="flex flex-col space-y-2.5">
            <img
              className="mb-5"
              src="/about/amplifying-impact.svg"
              alt="Woman holding laptop"
            />
            <h6 className="mb-1">Amplifying impact</h6>
            <p className="text-charcoal-500">
              Projects are chosen to help social causes where technology as a
              solution makes sense.
            </p>
          </div>
          <div className="flex flex-col space-y-2.5">
            <img
              className="mb-5"
              src="/about/do-good-for-good.svg"
              alt="Man projecting Earth"
            />
            <h6>Do good for good</h6>
            <p className="text-charcoal-500">
              Pro-bono work doesn't need to mean substandard work. We treat all
              of our projects with the utmost care and integrity.
            </p>
          </div>
          <div className="flex flex-col space-y-2.5">
            <img
              className="mb-5"
              src="/about/learning-is-a-team-sport.svg"
              alt="People at table"
            />
            <h6>Learning is a team sport</h6>
            <p className="text-charcoal-500">
              Blueprint supports students to learn from each other, and hone in
              on their technical craft in a team environment.
            </p>
          </div>
          <div className="flex flex-col space-y-2.5">
            <img
              className="mb-5"
              src="/about/culture-is-key.svg"
              alt="People holding flag"
            />
            <h6>Culture is key</h6>
            <p className="text-charcoal-500">
              We're a team that cares about each other as much as we care about
              the causes we're building for.
            </p>
          </div>
        </div>
      </section>

      {/* Interested in the work we do? */}
      <section className="content flex flex-col items-center space-y-8 py-32">
        <h2 className="text-blue text-2xl md:text-4xl uppercase">
          Interested in the work we do?
        </h2>
        <hr className="hidden md:block w-20 text-blue" />
        {/* TODO: Link to nonprofits page */}
        <Link href="#">
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
