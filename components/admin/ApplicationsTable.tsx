import { FC } from "react";

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  resumeLink: string;
  firstChoiceRole: string;
  secondChoiceRole: string;
};

type PageProps = {
  readonly students: Student[];
  roleSelected: string;
};

const ApplicationsTable: FC<PageProps> = ({ students, roleSelected }) => {
  return (
    <div className="flex flex-col space-y-2">
      <table className="table-fixed text-left border-collapse">
        <thead className="pt-4">
          <tr className="border-b-[2px]">
            <th className="py-2">#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Resume</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {students.map((app: Student, i: number) => {
            (app.firstChoiceRole == roleSelected ||
              app.secondChoiceRole == roleSelected) && (
              <tr className="border-b-[1px] border-charcoal-400">
                <td className="pr-4 py-4 w-4">{`${i + 1}`}</td>
                <td className="pr-4 w-32">{`${
                  app.firstName + " " + app.lastName
                }`}</td>
                <td className="pr-4 w-56">{`${app.email}`}</td>
                <td className="pr-4 w-20 text-blue-100">
                  <a
                    href={`${app.resumeLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resume
                  </a>
                </td>
                <td className="pr-4 w-16 text-blue-100">
                  <a
                    href={`https://uwblueprint.org/admin/student-details/${app.id}`}
                  >
                    Details
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsTable;
