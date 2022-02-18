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
          title="Alumni"
          description="We stand on the shoulders of giants. We appreciate all of our past members who have put in countless hours to help Blueprint become what it is today."
          teams={alumni}
        />
        <ToStudents />

        {/* Background decals */}
        <img
          src={teamLeftLines}
          className="hidden lg:block absolute left-0 top-80"
        />
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
