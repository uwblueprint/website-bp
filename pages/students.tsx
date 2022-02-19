import React from "react";
import { Hero } from "@components/members/Hero";
import { List } from "@components/members/List";
import Layout from "@components/common/Layout";

import { ToAlumni } from "@components/members/ToAlumni";
import { GetStaticProps } from "next";
import { Team } from "@components/members/types";

import data from "constants/members.json";
import { roleType } from "@components/members/utils";

const teamLeftLightBulb = "/students/students-team-bgleftlow.svg";
const teamRightCircle = "/students/students-team-bgright.svg";
const landingGraphic = "/students/students-landing-graphic.svg";

type PageProps = {
  teams: Team[];
};

export default function Students({ teams }: PageProps): JSX.Element {
  return (
    <Layout title={`UW Blueprint | Students`}>
      <div className="flex flex-col w-full space-y-24 relative pb-24">
        <section className="relative flex w-full bg-bottom bg-cover pt-36 pb-8 md:py-48 md:bg-students-hero">
          <div className="content relative flex flex-col md:flex-row items-center justify-between md:space-x-12 lg:space-x-16 space-y-8 md:space-y-0">
            <Hero
              title={`Students`}
              description={`A team is only as good as its members. Meet Blueprint, a diverse group of students and alumni with the drive to change the world.`}
            />
            <img
              className="md:w-5/12 translate-x-1 translate-y-2"
              src={landingGraphic}
            />
          </div>
        </section>
        <List
          title="Meet the Team"
          description="Our community specializes in a variety of disciplines, but our passion for helping nonprofits and our interest in technology brings us together."
          teams={teams}
        />
        <ToAlumni />

        {/* Background decals */}
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
