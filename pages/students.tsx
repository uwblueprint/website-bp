import React from "react";
import { StudentsLanding } from "@components/StudentsPage/StudentsLanding";
import { MeetTheTeam } from "@components/StudentsPage/MeetTheTeam";
import Layout from "@components/common/Layout";

import { AlumniButton } from "@components/StudentsPage/AlumniButton";
import { GetStaticProps } from "next";
import { Student } from "common/Student";

const teamLeftLines = "/students/students-team-bgleft.svg";
const teamLeftLightBulb = "/students/students-team-bgleftlow.svg";
const teamRightCircle = "/students/students-team-bgright.svg";

type PageProps = {
  students: Student[];
};

export default function Students({ students }: PageProps): JSX.Element {
  return (
    <Layout title={`UW Blueprint | Students`}>
      <div className="flex flex-col w-full gap-24 pb-24 relative">
        <StudentsLanding />
        <MeetTheTeam students={students} />
        <AlumniButton />

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
        profile:
          "https://firebasestorage.googleapis.com/v0/b/uw-blueprint.appspot.com/o/img%2Fwinter2021headshots%2FOustan_Ding.jpg?alt=media&token=56ecfc35-3313-4add-b57c-3359c3b669c6",
      })),
    },
  };
};
