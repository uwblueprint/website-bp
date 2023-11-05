import { MUIDataTableColumn } from "mui-datatables";
import { LinkIcon } from "@components/icons/link.icon";
import { Status, SecondChoiceStatus } from "@utils/muidatatable";
import { router } from "next/router";

// const extractLastName = (data: any) => {
//   const fullNameArray = data.props.children[1].props.children;
//   const fullName = fullNameArray[0] + " " + fullNameArray[2];
//   return fullName;
// };

// const createSortFunction =
//   (order: "asc" | "desc") => (obj1: any, obj2: any) => {
//     const name1 = extractLastName(obj1.data);
//     const name2 = extractLastName(obj2.data);

//     if (order === "asc") {
//       return name1.localeCompare(name2);
//     } else {
//       return name2.localeCompare(name1);
//     }
//   };

export const getApplicationTableColumns = (): MUIDataTableColumn[] => {
  const handleNameClick = (appId: string) => {
    router.push(`/review?reviewId=${appId}`);
  };

  const columns: MUIDataTableColumn[] = [
    {
      name: "id",
      options: {
        display: "excluded",
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
          console.log(tableMeta.rowData);
          const appId = tableMeta.rowData[0];
          return (
            <div
              onClick={() => handleNameClick(appId)}
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
      name: "secondChoice",
      label: "2nd Choice",
      options: {
        filter: true,
        sort: true,
        searchable: true,
        filterType: "multiselect",
      },
    },
    {
      name: "secondChoiceStatus",
      label: "2nd Choice Status",
      options: {
        filter: true,
        sort: true,
        searchable: true,
        filterOptions: {
          names: [
            "considered",
            "not considered",
            "n/a",
            "recommended",
            "in review",
            "interview",
            "no interview",
          ],
        },
        filterType: "multiselect",
        customBodyRender(value, tableMeta, updateValue) {
          return <SecondChoiceStatus status={value} />;
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
  ];
  return columns;
};
