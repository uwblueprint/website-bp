import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import React, { FC } from "react";
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
  resume: string;
  reviewerOne: string;
  reviewerTwo: string;
  score: number;
  status: string;
  skill: string;
};

type PageProps = {
  readonly students: Student[];
};

const ApplicationsTable: FC<PageProps> = () => {
  const getMuiTheme = () =>
    createTheme({
      overrides: {},
    });

  const getTableRows = (): StudentRow[] => {
    // TO DO: replace mock data
    const rows: StudentRow[] = [
      {
        name: "Test",
        application: "Test",
        resume: "Test",
        reviewerOne: "Test",
        reviewerTwo: "Test",
        score: 100,
        status: "Test",
        skill: "Test",
      },
    ];
    return rows;
  };

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        title={"Applicant Entry"}
        data={getTableRows()}
        columns={getTableColumns()}
      />
    </ThemeProvider>
  );
};

export default ApplicationsTable;
