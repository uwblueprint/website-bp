import { MUIDataTableColumn } from "mui-datatables";

export const getApplicationTableColumns = (): MUIDataTableColumn[] => {
  const columns: MUIDataTableColumn[] = [
    {
      name: "application",
      label: "Application",
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
      name: "status",
      label: "Status",
      options: {},
    },
    {
      name: "secondChoice",
      label: "2nd Choice",
      options: {},
    },
    {
      name: "secondChoiceStatus",
      label: "2nd Choice Status",
      options: {},
    },
    {
      name: "resume",
      label: "",
      options: {},
    },
  ];
  return columns;
};
