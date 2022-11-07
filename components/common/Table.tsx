import { FC } from "react";

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  resumeLink: string;
  detailsLink: string;
}

type PageProps = {
  readonly Students: Student[];
};

const Table: FC<PageProps> = ({ Students }) => {
  return (
    <div className="max-w-2xl mx-auto">
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
            {Students.map((app: Student, i: number) => (
              <tr className="border-b-[1px] border-indigo-500">
                <td className="pr-4 py-4 w-4">{`${i + 1}`}</td>
                <td className="pr-4 w-32">{`${
                  app.firstName + " " + app.lastName
                }`}</td>
                <td className="pr-4 w-56">{`${app.email}`}</td>
                <td className="pr-4 w-20">
                  <a
                    href={`${app.resumeLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resume Link
                  </a>
                </td>
                <td className="pr-4 w-16">
                  <a
                    href={`https://uwblueprint.org/admin/student-details/${app.detailsLink}`}
                  >
                    Details
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
