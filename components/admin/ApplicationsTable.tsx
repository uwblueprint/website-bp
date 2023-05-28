import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import React, { FC, useEffect, useState } from "react";
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
};

const ApplicationsTable = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [dashboards, setDashboards] = useState<any[]>([]);
  useEffect(() => {
    applications.map(async (app) => {
      const dashboards = await dashboardsByApplicationId(app.id);
      app.dashboards = dashboards;
    });
  }, [applications]);

  useEffect(() => {
    applicationsByRole();
  }, []);

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
      overrides: {},
    });

  const getTableRows = (): StudentRow[] => {
    const rows: StudentRow[] = applications.map((application) => {
      return {
        name: application.firstName + " " + application.lastName,
        application: application.resumeUrl,
        term: application.academicYear,
        program: application.program,
        reviewerOne: application.dashboards?.length >= 1 ? application.dashboards[0].reviewerEmail : "",
        reviewerTwo: application.dashboards?.length >= 2 ? application.dashboards[1].reviewerEmail : "",
        score: 100,
        status: application.status,
        skill: application.dashboard,
      }
    });
    return rows;
  };

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        title={""}
        data={getTableRows()}
        columns={getTableColumns()}
      />
    </ThemeProvider>
  );
};

export default ApplicationsTable;
