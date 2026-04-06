import { AlumniHero } from "@/components/sections/AlumniHero";
import { TeamSection, type Student } from "@/components/students/TeamSection";
import {
  get_current_members,
  get_old_members,
  get_term,
  DEFAULT_PHOTO,
} from "@constants/headshot-constants";

function buildAlumni(): Student[] {
  const currentTerm = get_term();
  const currentMembers = get_current_members(currentTerm);
  const oldMembers = get_old_members(currentMembers, currentTerm);

  // Deduplicate by name (keep first occurrence)
  const seen = new Set<string>();
  const alumni: Student[] = [];

  for (const member of oldMembers) {
    const key = member.name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    alumni.push({
      id: member.name.toLowerCase().replace(/\s+/g, "-"),
      name: member.name,
      role: member.role,
      headshotSrc: member.img || DEFAULT_PHOTO,
    });
  }

  return alumni;
}

const ALUMNI = buildAlumni();

export default function AlumniPage() {
  return (
    <main>
      <AlumniHero />
      <TeamSection
        teamName="Previous Blueprint Members"
        students={ALUMNI}
        headingLineHeight={1}
      />
    </main>
  );
}
