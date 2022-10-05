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
      <div className="flex flex-col space-y-2">
        <div className="mb-8">
          <h2 className="text-blue mb-1.5">{title}</h2>
          <p className="text-lg">{description}</p>
        </div>
        <div className="flex flex-col space-y-24">
          {teams.map((team) => (
            <TeamSection key={team.id} team={team} />
          ))}
        </div>
      </div>
    </section>
  );
};
