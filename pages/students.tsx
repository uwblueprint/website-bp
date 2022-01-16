import React from "react";
import { Hero } from "@components/members/Hero";
import { List } from "@components/members/List";
import Layout from "@components/common/Layout";

import { ToAlumni } from "@components/members/ToAlumni";
import { GetStaticProps } from "next";
import { Team } from "@components/members/types";

import data from "constants/members.json";
import { roleType } from "@components/members/utils";

const teamLeftLines = "/students/students-team-bgleft.svg";
const teamLeftLightBulb = "/students/students-team-bgleftlow.svg";
const teamRightCircle = "/students/students-team-bgright.svg";
const landingSplashBackground = "/students/students-landing-bg.svg";
const landingGraphic = "/students/students-landing-graphic.svg";

type PageProps = {
  teams: Team[];
};

export default function Students({ teams }: PageProps): JSX.Element {
  return (
    <Layout title={`UW Blueprint | Students`}>
      <div className="flex flex-col w-full gap-24 relative pb-24">
        <section
          className="relative flex w-full bg-bottom bg-cover py-48"
          style={{
            backgroundImage: `url(${landingSplashBackground})`,
          }}
        >
          <Hero
            title={`Students`}
            description={`Meet Blueprint - we're a diverse group of friendly folks at the University of Waterloo dedicated to building tech for social good.`}
          />
          <img src={landingGraphic} className="absolute bottom-0 right-[15%]" />
        </section>
        <List
          title="Meet the Team"
          description="We are a diverse group of students specializing in a variety of
          disciplines, brought together by a common ambition to help
          non-profits with their technology needs."
          teams={teams}
        />
        <ToAlumni />

        {/* Background decals */}
        <img src={teamLeftLines} className="absolute left-0 top-80" />
        <img
          src={teamLeftLightBulb}
          className="absolute right-0 top-1/4 z-[-10]"
        />
        <img
          src={teamRightCircle}
          className="absolute right-0 top-2/4 z-[-10]"
        />
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const term = data.term;
  const members = data.members.filter((member) => member.term === term);
  const teams = data.teams.map((team) => ({
    id: team.id,
    name: team.name,
    members: members
      .filter((member) => (member.teams as string[]).includes(team.id))
      .sort((a, b) => roleType(a.role) - roleType(b.role)),
  }));

  return {
    props: {
      teams,
    },
  };
};
