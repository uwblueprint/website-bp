import { MUIDataTableColumn } from "mui-datatables";
import { LinkIcon } from "@components/icons/link.icon";
import { Status, SecondChoiceStatus, SkillCategory } from "@utils/muidatatable";
import { router } from "next/router";

export const getReviewTableColumns = (): MUIDataTableColumn[] => {
  // const handleNameClick = (appId: string) => {
  //   router.push(`/review?reviewId=${appId}`);
  // };

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
        customBodyRender(value, tableMeta, updateValue) {
          const appId = tableMeta.rowData[0];
          return (
            <div
              // onClick={() => handleNameClick(appId)}
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
      name: "timesApplied",
      label: "Times Applied",
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
        customBodyRender(value, tableMeta, updateValue) {
          return <Status status={value} />;
        },
      },
    },
    {
      name: "skillCategory",
      label: "Skill Category",
      options: {
        filter: true,
        sort: true,
        searchable: true,
        filterOptions: {
          names: ["intermediate", "junior", "senior"],
        },
        filterType: "multiselect",
        customBodyRender(value, tableMeta, updateValue) {
          return <SkillCategory category={value} />;
        },
      },
    },
    {
      name: "score",
      label: "Review Score",
      options: {
        filter: false,
        sort: true,
        searchable: true,
      },
    },
  ];
  return columns;
};
