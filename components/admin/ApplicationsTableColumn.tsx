import { MUIDataTableColumn } from "mui-datatables";

export const getTableColumns = (): MUIDataTableColumn[] => {
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
      name: "term",
      label: "Term",
      options: {},
    },
    {
      name: "program",
      label: "Program",
      options: {},
    },
    {
      name: "reviewerOne",
      label: "Reviewer #1",
      options: {},
    },
    {
      name: "reviewerTwo",
      label: "Reviewer #2",
      options: {},
    },
    {
      name: "score",
      label: "Score",
      options: {},
    },
    {
      name: "status",
      label: "Application Status",
      options: {},
    },
    {
      name: "skill",
      label: "Skill Category",
      options: {},
    },
  ];
  return columns;
};
