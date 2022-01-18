import React from "react";
import { Team } from "@components/members/types";
import { TeamSection } from "./TeamSection";

export const List: React.FC<{
  title: string;
  description: string;
  teams: Team[];
}> = ({ title, description, teams }) => {
  return (
    <section className="content container">
      <div className="flex flex-col gap-2">
        <div className="mb-20">
          <h2 className="text-blue">{title}</h2>
          <p className="text-lg">{description}</p>
        </div>
        <div className="flex flex-col gap-y-24">
          {teams.map((team) => (
            <TeamSection team={team} />
          ))}
        </div>
      </div>
    </section>
  );
};
