import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import MUIDataTable, {
  MUIDataTableColumn,
} from "mui-datatables";
import React, { FC } from "react";

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
}

type PageProps = {
  readonly students: Student[];
};

const ApplicationsTable : FC<PageProps> = ({ students }) => {
  const getMuiTheme = () =>
    createTheme({
      overrides: {},
    });

  const getTableColumns = (): MUIDataTableColumn[] => {
    const columns: MUIDataTableColumn[] = [
      {
        name: "name",
        label: "Name",
        options: {},
      },
      {
        name: "application",
        label: "Application",
        options: {},
      },
      {
        name: "resume",
        label: "Resume",
        options: {},
      },
      {
        name: "reviewer #1",
        label: "Reviewer #1",
        options: {},
      },
      {
        name: "reviewer #2",
        label: "Reviewer #2",
        options: {},
      },
      {
        name: "score",
        label: "Score",
        options: {},
      },
      {
        name: "application status",
        label: "Application Status",
        options: {},
      },
      {
        name: "skill category",
        label: "Skill Category",
        options: {},
      },
    ];
    return columns;
  };

  const getTableRows = (): StudentRow[] => {
    const rows: StudentRow[] = [];
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
