import React from "react";
import { Hero } from "@components/members/students/Hero";
import { List } from "@components/members/students/List";
import Layout from "@components/common/Layout";

import { ToAlumni } from "@components/members/students/ToAlumni";
import { GetStaticProps } from "next";
import { Member } from "@components/members/types";

const teamLeftLines = "/students/students-team-bgleft.svg";
const teamLeftLightBulb = "/students/students-team-bgleftlow.svg";
const teamRightCircle = "/students/students-team-bgright.svg";

type PageProps = {
  students: Member[];
};

export default function Students({ students }: PageProps): JSX.Element {
  return (
    <Layout title={`UW Blueprint | Students`}>
      <div className="flex flex-col w-full gap-24 relative pb-24">
        <Hero />
        <List students={students} />
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
  // TODO: get data from firebase

  return {
    props: {
      students: Array.from(Array(170).keys()).map((x) => ({
        name: `Oustan Ding ${x}`,
        position: "Developer",
      })),
    },
  };
};
