import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { fetchGraphql } from "@utils/makegqlrequest";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { getTableColumns } from "./ApplicationsTableColumn";
import { theme } from "../../styles/Theme";

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  academicYear: string;
  program: string;
  resumeLink: string;
  firstChoiceRole: string;
  secondChoiceRole: string;
};

type PageProps = {
  readonly students: Student[];
};

const queries = {
  applicationsByRole: `
            query applicationsByRole($firstChoice: String!) {
              applicationsByRole(firstChoice: $firstChoice) {
                id
                firstName
                lastName
                academicYear
                resumeUrl
                program
                status
              }
            }
          `,
  dashboardsByApplicationId: `
          query dashboardsByApplicationId($applicationId: Int!) {
            dashboardsByApplicationId(applicationId: $applicationId) {
                reviewerEmail
                passionFSG
                teamPlayer
                desireToLearn
                skillCategory
            }
          }
        `,
  userByEmail: `
          query userByEmail($email: String!) {
            userByEmail(email: $email) {
              firstName
              lastName
            }
          }
  `,
};

const ApplicationsTable: React.FC = () => {
  const [applications, setApplications] = useState<any[]>([]);
  useEffect(() => {
    applications.map(async (app) => {
      const dashboards: any[] = await dashboardsByApplicationId(app.id);
      app.dashboards = dashboards;
      const reviewerNames = await Promise.all(
        dashboards.map(async (dash) => {
          const res = await nameByEmail(dash.reviewerEmail);
          return res;
        }),
      );
      app.reviewerNames = reviewerNames;
    });
  }, [applications]);

  useEffect(() => {
    applicationsByRole();
  }, []);

  const getSkillCategory = (application: any) => {
    if (application.dashboards?.length >= 2) {
      const reviewer1Skill = application.dashboards[0].skillCategory;
      const reviewer2Skill = application.dashboards[1].skillCategory;
      if (reviewer1Skill == "junior" || reviewer2Skill == "junior") {
        return "Junior";
      } else if (
        reviewer1Skill == "intermediate" ||
        reviewer2Skill == "intermediate"
      ) {
        return "Intermediate";
      } else {
        return "Senior";
      }
    }
    return "";
  };

  const nameByEmail = async (email: string) => {
    const response = await fetchGraphql(queries.userByEmail, { email });
    return response.data.userByEmail;
  };

  const applicationsByRole = () => {
    fetchGraphql(queries.applicationsByRole, {
      firstChoice: "project developer",
    }).then((result) => setApplications(result.data.applicationsByRole));
  };
  const dashboardsByApplicationId = async (id: number) => {
    const response = await fetchGraphql(queries.dashboardsByApplicationId, {
      applicationId: id,
    });
    const dashboards = await response.json();
    return [];
    return dashboards.data.dashboardsByApplicationId;
  };

  const getMuiTheme = () =>
    createTheme({
      overrides: {
        MuiPaper: {
          root: {
            border: `1px solid ${theme.colors.greys.border}`,
          },
        },
        MUIDataTable: {
          paper: {
            boxShadow: "none",
            marginBottom: "3em",
          },
          root: {
            fontFamily: "Source Sans Pro",
          },
        },
        MUIDataTableHeadCell: {
          data: {
            color: theme.colors.B10,
            fontFamily: "Source Sans Pro",
            fontWeight: 600,
          },
          sortActive: {
            color: theme.colors.B10,
          },
        },
        MUIDataTableBodyCell: {
          root: {
            fontFamily: "Source Sans Pro",
          },
        },
        MUIDataTableToolbar: {
          root: {
            display: "none",
          },
        },
        MuiTableSortLabel: {
          root: {
            color: `${theme.colors.B10} !important`,
          },
          active: {
            color: theme.colors.B10,
          },
          iconDirectionAsc: {
            color: theme.colors.B10,
          },
        },
      },
    });

  const getTableRows = (): StudentRow[] => {
    const rows: StudentRow[] = applications.map((application) => {
      return {
        name: application.firstName + " " + application.lastName,
        application: application.resumeUrl,
        term: application.academicYear,
        program: application.program,
        reviewerOne:
          application.reviewerNames?.length >= 1
            ? application.reviewerNames[0].firstName + " "
            : "",
        reviewerTwo:
          application.reviewerNames?.length >= 2
            ? application.reviewerNames[1].firstName
            : "",
        score: 100,
        status: application.status,
        skill: getSkillCategory(application),
      };
    });
    return rows;
  };

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
          {students.map((app: Student, i: number) => (
            <tr className="border-b-[1px] border-charcoal-400" key={i}>
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
                <a href={`/admin/student-details/${app.id}`}>Details</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsTable;
