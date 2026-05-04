import { AboutHero } from "@/components/sections/AboutHero";
import { AboutSection } from "@/components/sections/AboutSection";
import { SocialsMarquee } from "@/components/sections/SocialsMarquee";
import { OurProcess } from "@/components/sections/OurProcess";

const VALUES_TABS = [
  {
    indexLabel: "01",
    title: "Amplifying Impact",
    description:
      "Projects are chosen to help social causes where technology as a solution makes sense and drives greatest levels of change within local communities.",
  },
  {
    indexLabel: "02",
    title: "Do good, for good",
    description:
      "It is our shared philosophy that pro-bono work in no way implies substandard work. Our teams treat all of our projects with the utmost care and integrity.",
  },
  {
    indexLabel: "03",
    title: "Learning is a team sport",
    description:
      "We are collectively curious and collaboratively learning from each other about how we can leverage our skills to drive meaningful change.",
  },
  {
    indexLabel: "04",
    title: "Culture is key to success",
    description:
      "We’re a team that cares about each other as much as we care about the causes we’re building for. We thrive to maintain a supportive and welcoming environment, always.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-primary-light">
      <AboutHero />

      <AboutSection />

      <OurProcess
        id="our-values"
        ariaLabel="Our values"
        heading="our values"
        topRightDecoration={
          <div className="w-[min(44vw,300px)] sm:w-[min(40vw,360px)] md:w-[min(34vw,400px)] lg:w-[min(46vw,500px)] max-w-[90%]">
            <div className="relative aspect-[812/490] w-full">
              <img
                src="/img/illos/puzzle.svg"
                alt=""
                width={812}
                height={490}
                className="h-full w-full object-contain"
                decoding="async"
              />
            </div>
          </div>
        }
        steps={VALUES_TABS.map((tab) => ({
          index: tab.indexLabel,
          title: tab.title,
          description: tab.description,
        }))}
      />

      <SocialsMarquee />
    </main>
  );
}
