import { MUIDataTableColumn } from "mui-datatables";
import { LinkIcon } from "@components/icons/link.icon";
import { Status } from "@utils/muidatatable";
import router from "next/router";

export const getApplicationTableColumns = (): MUIDataTableColumn[] => {
  const columns: MUIDataTableColumn[] = [
    {
      name: "id",
      options: {
        display: "excluded",
        filter: false,
        searchable: false,
        sort: false,
      },
    },
    {
      name: "name",
      label: "Application",
      options: {
        filter: false,
        // sortCompare: (order: "asc" | "desc") => createSortFunction(order),
        searchable: true,
        customBodyRender(value, tableMeta) {
          const appId = tableMeta.rowData[0];
          return (
            <div
              onClick={() => router.push(`/review?reviewId=${appId}`)}
              className="flex items-center cursor-pointer"
            >
              <LinkIcon />
              <span className="ml-2 underline">{value}</span>
            </div>
          );
        },
      },
    },
    {
      name: "resume",
      label: "Resume",
      options: {
        filter: false,
        sort: true,
        searchable: true,
      },
    },
    {
      name: "firstChoice",
      label: "Role",
      options: {
        filter: false,
        sort: true,
        searchable: true,
      },
    },
    {
      name: "firstChoiceApplication",
      label: "First Choice",
      options: {
        filter: false,
        sort: true,
        searchable: true,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
        searchable: true,
        filterOptions: {
          names: [
            "accepted",
            "applied",
            "interviewed",
            "in review",
            "pending",
            "rejected",
          ],
        },
        filterType: "multiselect",
        customBodyRender(value) {
          return <Status status={value} />;
        },
      },
    },
    {
      name: "reviewerOne",
      label: "Reviewer #1",
      options: {
        filter: false,
        sort: true,
        searchable: true,
      },
    },
    {
      name: "reviewerTwo",
      label: "Reviewer #2",
      options: {
        filter: false,
        sort: true,
        searchable: true,
      },
    },
  ];
  return columns;
};
