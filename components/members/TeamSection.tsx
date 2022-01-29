import React from "react";
import { Team } from "@components/members/types";
import { Avatar } from "@components/members/Avatar";

export const TeamSection: React.FC<{ team: Team }> = ({ team }) => {
  return (
    <div className="flex flex-col space-y-6">
      <h4 className="text-blue">{team.name}</h4>
      <div className="grid grid-cols-auto-fill gap-x-8 md:gap-x-10 gap-y-10 md:gap-y-12">
        {team.members.map((member) => (
          <Avatar {...member} />
        ))}
      </div>
    </div>
  );
};
