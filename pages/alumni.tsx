import React from "react";

import { Hero } from "@components/members/Hero";
import { List } from "@components/members/List";
import { ToStudents } from "@components/members/ToStudents";

import Layout from "@components/common/Layout";
import { GetStaticProps } from "next";
import { Team } from "@components/members/types";

import data from "constants/members.json";
import { roleType } from "@components/members/utils";

const teamLeftLines = "/students/students-team-bgleft.svg";
const teamLeftGear = "/alumni/alumni-team-bgleft.svg";
const teamRightLines = "/alumni/alumni-team-bgright.svg";
const landingSplashBackground = "/alumni/alumni-landing-bg.svg";
const landingGraphic = "/alumni/alumni-landing-graphic.svg";

type PageProps = {
  alumni: Team[];
};

export default function Alumni({ alumni }: PageProps): JSX.Element {
  return (
    <Layout title={`UW Blueprint | Alumni`}>
      <div className="flex flex-col w-full space-y-24 pb-24 relative">
        <section
          className="relative flex w-full bg-bottom bg-cover py-48"
          style={{
            backgroundImage: `url(${landingSplashBackground})`,
          }}
        >
          <Hero
            title="Alumni"
            description="Meet Blueprint - we're a diverse group of Students and Waterloo graduates who care about building tech for social good."
          />
          <img src={landingGraphic} className="absolute bottom-0 right-[15%]" />
        </section>

        <List
          title="Alumni"
          description="Special thanks to all of our alumni who have given their time and effort to our cause for social good. We couldn't have done it without you!"
          teams={alumni}
        />
        <ToStudents />

        {/* Background decals */}
        <img src={teamLeftLines} className="absolute left-0 top-80" />
        <img src={teamLeftGear} className="absolute left-0 top-1/2 z-[-10]" />
        <img
          src={teamRightLines}
          className="absolute right-0 top-1/2 z-[-10]"
        />
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const term = data.term;
  const members = data.members
    .filter((member) => member.term !== term)
    .sort((a, b) => a.name.localeCompare(b.name));
  return {
    props: {
      alumni: [
        {
          id: "alumni",
          name: "",
          members,
        },
      ],
    },
  };
};
