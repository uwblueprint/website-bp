import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { fetchGraphql } from "@utils/makegqlrequest";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { getTableColumns } from "./ApplicationsTableColumn";

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

type StudentRow = {
  name: string;
  application: string;
  term: string;
  program: string;
  reviewerOne: string;
  reviewerTwo: string;
  score: number;
  status: string;
  skill: string;
};

const queries = {
  applicationsByRole: `
            query applicationTable($role: String!) {
              applicationTable(role: $role) {
                application {
                  firstName
                  lastName
                  academicYear
                  resumeUrl
                  program
                  status
              }
              reviewers {
                  firstName
                  lastName
              }
              reviewDashboards {
                  passionFSG
                  teamPlayer
                  desireToLearn
                  skillCategory
              }
              }
            }
          `,
};

const ApplicationsTable: React.FC = () => {
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    applicationsByRole();
  }, []);

  const getSkillCategory = (dashboards: any) => {
    if (dashboards?.length >= 2) {
      const reviewer1Skill = dashboards[0].skillCategory;
      const reviewer2Skill = dashboards[1].skillCategory;
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
    return dashboards.length == 1 ? dashboards[0].skillCategory : "";
  };

  const applicationsByRole = () => {
    fetchGraphql(queries.applicationsByRole, {
      role: "project developer",
    }).then((result) => setApplications(result.data.applicationTable));
  };

  const getMuiTheme = () =>
    createTheme({
      overrides: {
        MUIDataTableHeadCell: {
          data: { color: "blue" }, // @todo use real colour
        },
      },
    });

  const getTableRows = (): StudentRow[] => {
    const rows: StudentRow[] = applications.map((application) => {
      const app = application.application;
      const reviewers = application.reviewers;
      return {
        name: app.firstName + " " + app.lastName,
        application: app.resumeUrl,
        term: app.academicYear,
        program: app.program,
        reviewerOne:
          reviewers?.length >= 1
            ? reviewers[0].firstName + " " + reviewers[0].lastName
            : "",
        reviewerTwo:
          reviewers?.length >= 2
            ? reviewers[1].firstName + " " + reviewers[1].lastName
            : "",
        score: 100,
        status: app.status,
        skill: getSkillCategory(application.reviewDashboards),
      };
    });
    return rows;
  };

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        title={""}
        data={getTableRows()}
        columns={getTableColumns()}
      />
    </MuiThemeProvider>
  );
};

export default ApplicationsTable;
