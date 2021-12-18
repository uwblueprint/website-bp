import React from "react";
import { Member } from "@components/members/types";
import { Avatar } from "@components/members/Avatar";

export const List: React.FC<{ alumni: Member[] }> = ({ alumni }) => {
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
            {alumni.map((alum) => (
              <Avatar key={alum.name} {...alum} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
