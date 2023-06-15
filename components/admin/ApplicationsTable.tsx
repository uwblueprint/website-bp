import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
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
    const response = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: queries.userByEmail,
        variables: {
          email: email,
        },
      }),
    });
    const users = await response.json();
    return users.data.userByEmail;
  };

  const applicationsByRole = () => {
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: queries.applicationsByRole,
        variables: {
          firstChoice: "project developer",
        },
      }),
    }).then(
      async (res) =>
        await res
          .json()
          .then((result) => setApplications(result.data.applicationsByRole)),
    );
  };
  const dashboardsByApplicationId = async (id: number) => {
    const response = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: queries.dashboardsByApplicationId,
        variables: {
          applicationId: id,
        },
      }),
    });
    const dashboards = await response.json();
    return dashboards.data.dashboardsByApplicationId;
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
