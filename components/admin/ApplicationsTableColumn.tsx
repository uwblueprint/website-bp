import { MUIDataTableColumn, MUIDataTableColumnOptions } from "mui-datatables";

export const getApplicationTableColumns = (): MUIDataTableColumn[] => {
  const columns: MUIDataTableColumn[] = [
    {
      name: "name",
      label: "Application",
      options: {
        customSort: (data1: any[], data2: any[]) => {
          const name1 = data1[0].props.children[1].props.children
            .split(" ")
            .slice(-1)
            .join(" ");
          const name2 = data2[0].props.children[1].props.children
            .split(" ")
            .slice(-1)
            .join(" ");

          return name1.localeCompare(name2);
        },
      } as MUIDataTableColumnOptions,
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
