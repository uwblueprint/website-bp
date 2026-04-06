import { StudentCard } from "@/components/students/StudentCard";

export interface Student {
  id: string;
  name: string;
  role: string;
  headshotSrc: string;
}

interface TeamSectionProps {
  teamName: string;
  students: Student[];
  /** CSS line-height for the team name header. Defaults to 0.8. */
  headingLineHeight?: number | string;
  /** When true, images in this section load eagerly (above the fold). */
  priority?: boolean;
}

export function TeamSection({
  teamName,
  students,
  headingLineHeight = 0.8,
  priority = false,
}: TeamSectionProps) {
  return (
    <section aria-label={`${teamName} team`} className="pt-16 md:pt-32">
      <div className="grid w-full grid-cols-12 gap-0 px-8">
        <h2
          className="col-span-12 px-4 text-xl lowercase text-[var(--bp-blue)] pb-4 md:pb-8"
          style={{ lineHeight: headingLineHeight }}
        >
          {teamName}
        </h2>

        {/* <div className="col-span-12 hidden md:col-span-4 md:block" aria-hidden /> */}

        <div className="col-span-12 md:col-span-12">
          <div className="grid grid-cols-12 gap-x-0">
            {students.map((student) => (
              <StudentCard
                key={student.id}
                name={student.name}
                role={student.role}
                headshotSrc={student.headshotSrc}
                priority={priority}
              />
            ))}
          </div>
        </div>

        <div className="hidden md:col-span-1 md:block" aria-hidden />
      </div>
    </section>
  );
}
