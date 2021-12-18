import React from "react";
import { Student } from "common/Student";

const StudentProfile = ({ name, position, profile }: Student): JSX.Element => {
  return (
    <figure key={`${name}:${position}`} className="flex flex-col items-center">
      <img className="rounded-full w-32" src={profile.toString()} />
      <p>{name}</p>
      <p>{position}</p>
    </figure>
  );
};

export const List: React.FC<{ students: Student[] }> = ({ students }) => {
  return (
    <>
      <section className="container mx-auto">
        <div className="flex flex-col gap-2">
          <div className="mb-40">
            <h2 className="text-blue">Alumni</h2>
            <p className="text-lg">
              Special thanks to all of our alumni who have given their time and
              effort to our cause for social good. We couldn't have done it
              without you!
            </p>
          </div>
          <h4 className="text-blue mb-8">Executive Team</h4>
          <div className="grid grid-cols-6 gap-y-12">
            {students.map((student) => (
              <StudentProfile {...student} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
