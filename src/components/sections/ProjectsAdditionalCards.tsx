"use client";

import Link from "next/link";

import { FadeUp } from "@/components/ui/FadeUp";
import { ArrowUpRight } from "@/components/ui/icons";

type ProjectMiniCard = {
  title: string;
  category: string;
  about: string;
  solution: string;
  href: string;
};

export function ProjectsAdditionalCards() {
  const cards: ProjectMiniCard[] = [
    {
      title: "Project READ Literacy Network",
      category: "Admin Tooling",
      about:
        "Project READ Literacy Network is an organization that empowers families in the Waterloo region with access to literacy and essential skills training.",
      solution:
        "Our team built a system to streamline outreach and operations for Project READ by tracking interactions with families. The product ultimately allowed staff to more efficiently make strategic decisions that would drive organizational growth.",
      href: "#project-read-literacy-network",
    },
    {
      title: "The Shoe Project",
      category: "Storytelling",
      about:
        "The Shoe Project provides educational and leadership opportunities to immigrant and refugee women. They have created a platform for women to showcase their moving stories using a shoe as a metaphor.",
      solution:
        "To celebrate their 10th anniversary, our team developed an interactive visualization tool leveraging geo-mapping technology to capture the stories of women across the world, collected throughout the organization's 10-year history.",
      href: "#the-shoe-project",
    },
    {
      title: "The Pregnancy Centre (TPC)",
      category: "Donations",
      about:
        "The Pregnancy Centre (TPC) supports mothers and families in Waterloo Region in making healthy and informed relationship and pregnancy decisions.",
      solution:
        "Our team built a web portal that would enable TPC to facilitate the collection and distribution of high quality, essential items between local donors and those in need.",
      href: "#pregnancy-centre-tpc",
    },
    {
      title: "Building Up",
      category: "Fundraising",
      about:
        "Building Up is a nonprofit construction contractor that provides long term career pathways for individuals facing employment barriers.",
      solution:
        "One of their main fundraising efforts in partnership with Raising the Roof is their Toque Campaign. Our team built an online platform to streamline toque ordering and better engage third party sellers.",
      href: "#building-up",
    },
  ];

  return (
    <section
      aria-label="Other projects"
      className="bg-[var(--primary-light)] md:pb-24 pt-12 text-left"
    >
      <div className="grid w-full grid-cols-12 gap-0 px-8">
        <h2 className="col-span-12 text-xxl text-[var(--bp-blue)]">
          other projects
        </h2>

        <div className="col-span-12 grid grid-cols-12 items-stretch gap-0 pt-8 text-left">
          {cards.map((card, index) => (
            <FadeUp
              key={card.title}
              index={index}
              inView
              className="col-span-12 h-full md:col-span-6 lg:col-span-3"
            >
              <Link
                href={card.href}
                aria-label={`Open ${card.title}`}
                className="group relative block h-full rounded-none bg-white py-8 md:px-8 text-left shadow-none transition-colors duration-200 hover:bg-[var(--off-white)]"
              >
                <ArrowUpRight
                  className="absolute right-4 top-4 size-5 text-[var(--primary-dark)] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  aria-hidden
                />

                <div
                  id={card.href.slice(1)}
                  className="relative flex h-full flex-col text-left"
                >
                  {/* Category tag (cursortrail-like) */}

                  <div className="pb-8">
                    <h3 className="pt-4 text-md font-roobert text-[var(--primary-dark)]">
                      {card.title}
                    </h3>

                    <p className="pt-4 text-sm font-roobert text-[var(--primary-dark)]">
                      {card.about}
                    </p>

                    <p className="pt-4 text-sm font-roobert text-[var(--primary-dark)]">
                      {card.solution}
                    </p>
                  </div>

                  <div className="inline-flex items-center rounded-none bg-[var(--bp-blue)] w-fit px-2 py-1 font-roobert text-sm text-[var(--primary-light)] shadow-none whitespace-nowrap mt-auto">
                    {card.category}
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
