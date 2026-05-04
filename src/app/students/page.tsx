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
  ["internal director", 1],
  ["external director", 1],
  ["vp engineering", 2],
  ["vp design", 3],
  ["vp product", 4],
  ["vp scoping", 5],
  ["vp internal", 6],
  ["vp external", 7],
  ["vp communications", 8],
  ["vp finance", 9],
  ["vp talent", 10],
  // Club support
  ["finance coordinator", 10],
  ["graphic designer", 11],
  ["content strategist", 12],
  ["user researcher", 13],
  ["internal operations lead", 14],
  ["design system", 15],
  // Project teams
  ["technical lead", 16],
  ["product manager", 17],
  ["project mentor", 18],
  ["designer", 19],
  ["design mentor", 20],
  ["developer", 21],
  ["developer mentor", 22],
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
