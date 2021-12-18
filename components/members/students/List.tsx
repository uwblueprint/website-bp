import { Student } from "@components/members/students/types";
import { Avatar } from "@components/members/Avatar";
import React from "react";

export const List: React.FC<{ students: Student[] }> = ({ students }) => {
  return (
    <section className="container mx-auto">
      <div className="flex flex-col gap-2">
        <div className="mb-40">
          <h2 className="text-blue">Meet the Team</h2>
          <p className="text-lg">
            We are a diverse group of students specializing in a variety of
            disciplines, brought together by a common ambition to help
            non-profits with their technology needs.
          </p>
        </div>
        <h4 className="text-blue mb-8">Executive Team</h4>
        <div className="grid grid-cols-6 gap-y-12">
          {students.map((student) => (
            <Avatar {...student} />
          ))}
        </div>
      </div>
    </section>
  );
};
