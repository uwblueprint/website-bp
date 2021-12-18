import React from "react";

import { Hero } from "@components/alumni/Hero";
import { List } from "@components/alumni/List";
import { ToStudents } from "@components/alumni/ToStudents";

import Layout from "@components/common/Layout";
import { GetStaticProps } from "next";
import { Student } from "common/Student";

const teamLeftLines = "/students/students-team-bgleft.svg";
const teamLeftGear = "/alumni/alumni-team-bgleft.svg";
const teamRightLines = "/alumni/alumni-team-bgright.svg";

type PageProps = {
  students: Student[];
};

export default function Alumni({ students }: PageProps): JSX.Element {
  return (
    <Layout title={`UW Blueprint | Alumni`}>
      <div className="flex flex-col w-full gap-24 pb-24 relative">
        <Hero />
        <List students={students} />
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
  // TODO: get data from firebase

  return {
    props: {
      students: Array.from(Array(170).keys()).map((x) => ({
        name: `Oustan Ding ${x}`,
        position: "Developer",
        profile:
          "https://firebasestorage.googleapis.com/v0/b/uw-blueprint.appspot.com/o/img%2Fwinter2021headshots%2FOustan_Ding.jpg?alt=media&token=56ecfc35-3313-4add-b57c-3359c3b669c6",
      })),
    },
  };
};
