import { StudentsHero } from "@/components/sections/StudentsHero";
import { TeamSection, type Student } from "@/components/students/TeamSection";
import Link from "next/link";
import CenterUnderline from "@/components/fancy/text/underline-center";
import membersData from "@constants/members.json";
import {
  get_current_members,
  get_term,
  DEFAULT_PHOTO,
} from "@constants/headshot-constants";

/** Role priority — lower number = displayed first within a team. */
const ROLE_PRIORITY = new Map<string, number>([
  // Exec
  ["president", 0],
  ["co-president", 0],
  ["director lead", 0],
  ["vp engineering", 1],
  ["vp design", 2],
  ["vp product", 3],
  ["vp scoping", 4],
  // Community, in the team sheet's function order, each VP ahead of their directors
  ["vp internal logistics", 5],
  ["vp culture", 6],
  ["culture director", 7],
  ["vp events", 8],
  ["events director", 9],
  ["vp communications", 10],
  ["vp partnerships", 11],
  ["partnerships director", 12],
  ["vp finance", 13],
  ["vp talent", 14],
  ["vp growth", 15],
  ["growth director", 16],
  ["marketing director", 17],
  // Club support
  ["finance coordinator", 18],
  ["content strategist", 19],
  ["user researcher", 20],
  ["internal operations lead", 21],
  ["design system", 22],
  ["graphic designer", 23],
  ["photographer", 24],
  // Operations
  ["vp strategic operations", 25],
  ["builder in residence", 26],
  // Project teams
  ["technical lead", 27],
  ["product manager", 28],
  ["designer", 29],
  ["design mentor", 30],
  ["developer", 31],
  ["developer mentor", 32],
  // Support — kept above the unknown-role fallback (100) so it always sorts last
  ["technical mentor", 200],
  ["product mentor", 201],
  ["graphic design mentor", 202],
]);

function rolePriority(role: string): number {
  let r = role.toLowerCase();
  if (r.includes("&")) r = r.split("&")[0].trim();
  return ROLE_PRIORITY.get(r) ?? 100;
}

function buildTeams(): { teamName: string; students: Student[] }[] {
  const currentTerm = get_term();
  const currentMembers = get_current_members(currentTerm);

  // Build a map: teamId -> team name
  const teamIdToName: Record<string, string> = {};
  for (const team of membersData.teams) {
    teamIdToName[team.id] = team.name;
  }

  // Group current members by their first team
  const teamGroups: Record<string, { role: string; student: Student }[]> = {};

  for (const member of currentMembers) {
    const teamId = member.teams[0] || "other";
    const teamName = teamIdToName[teamId] || teamId;

    if (!teamGroups[teamName]) {
      teamGroups[teamName] = [];
    }

    teamGroups[teamName].push({
      role: member.role,
      student: {
        id: member.name.toLowerCase().replace(/\s+/g, "-"),
        name: member.name,
        role: member.role,
        headshotSrc: member.img || DEFAULT_PHOTO,
      },
    });
  }

  // Order teams by the order they appear in members.json teams array,
  // and sort members within each team by role priority.
  const orderedTeams: { teamName: string; students: Student[] }[] = [];
  for (const team of membersData.teams) {
    const group = teamGroups[team.name];
    if (group) {
      group.sort((a, b) => rolePriority(a.role) - rolePriority(b.role));
      orderedTeams.push({
        teamName: team.name,
        students: group.map((g) => g.student),
      });
    }
  }

  return orderedTeams;
}

const TEAMS = buildTeams();

export default function StudentsPage() {
  return (
    <main className="bg-primary-light">
      <StudentsHero />

      {TEAMS.map((team, idx) => (
        <TeamSection
          key={team.teamName}
          teamName={team.teamName}
          students={team.students}
          headingLineHeight={1}
          priority={idx === 0}
        />
      ))}

      <div className="pt-12 md:py-12 bg-primary-light">
 
        <div className="grid w-full grid-cols-12 gap-0 px-8">
          <div className="col-span-12 text-xl lowercase text-[var(--bp-blue)] pb-8">
            <Link href="/students/alumni" className="inline-block">
              <CenterUnderline as="span">check out alumni</CenterUnderline>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
