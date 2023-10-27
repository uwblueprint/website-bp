import { MUIDataTableColumn } from "mui-datatables";

export const getApplicationTableColumns = (): MUIDataTableColumn[] => {
  const columns: MUIDataTableColumn[] = [
    {
      name: "name",
      label: "Application",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "reviewerOne",
      label: "Reviewer #1",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "reviewerTwo",
      label: "Reviewer #2",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "secondChoice",
      label: "2nd Choice",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "secondChoiceStatus",
      label: "2nd Choice Status",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "resume",
      label: "Resume",
      options: {
        filter: false,
        sort: true,
      },
    },
  ];
  return columns;
};
