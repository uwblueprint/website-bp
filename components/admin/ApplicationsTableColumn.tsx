import { MUIDataTableColumn, MUIDataTableColumnOptions } from "mui-datatables";
import { LinkIcon } from "@components/icons/link.icon";
import { get } from "http";

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

const STATUS_BASE_CLASSES = "text-center rounded px-2 py-1";
const SECOND_CHOICE_BASE_CLASSES = "rounded-3xl text-center w-fit px-2";

export const getApplicationTableColumns = (): MUIDataTableColumn[] => {
  const handleNameClick = (appId: string) => {
    window.location.href = `/review?reviewId=${appId}`;
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "applied":
        return (
          <div className={`${STATUS_BASE_CLASSES} bg-sky-200`}>Applied</div>
        );
      case "in review":
        return (
          <div className={`${STATUS_BASE_CLASSES} bg-yellow-100`}>
            In Review
          </div>
        );
      case "interview":
        return (
          <div className={`${STATUS_BASE_CLASSES} bg-green-100`}>Interview</div>
        );
      default:
        return (
          <div className={`${STATUS_BASE_CLASSES} bg-charcoal-300`}>
            Pending
          </div>
        );
    }
  };

  const getSecondChoiceStatusStyle = (status: string) => {
    switch (status) {
      case "n/a":
        return (
          <div className={`${SECOND_CHOICE_BASE_CLASSES}  text-red-500 border`}>
            N/A
          </div>
        );
      case "considered":
        return (
          <div
            className={`${SECOND_CHOICE_BASE_CLASSES} text-green-300 border`}
          >
            Considered
          </div>
        );
      case "not considered":
        return (
          <div
            className={`${SECOND_CHOICE_BASE_CLASSES}  border text-charcoal-400`}
          >
            Not Considered
          </div>
        );
      case "in review":
        return (
          <div className={`${STATUS_BASE_CLASSES} bg-yellow-100`}>
            In Review
          </div>
        );
      case "interview":
        return (
          <div className={`${STATUS_BASE_CLASSES} bg-green-100`}>Interview</div>
        );
      case "recommended":
        return (
          <div className={`${STATUS_BASE_CLASSES} bg-orange-300`}>
            Recommended
          </div>
        );
      case "no interview":
        return (
          <div className={`${STATUS_BASE_CLASSES} bg-charcoal-300`}>
            No Interview
          </div>
        );
    }
  };

  const columns: MUIDataTableColumn[] = [
    {
      name: "name",
      label: "Application",
      options: {
        filter: false,
        // sortCompare: (order: "asc" | "desc") => createSortFunction(order),
        searchable: true,
        customBodyRender(value, tableMeta, updateValue) {
          console.log(tableMeta.rowData);
          return (
            <div
              onClick={() => handleNameClick(tableMeta.rowData[8])}
              className="flex items-center cursor-pointer"
            >
              <LinkIcon />
              <span className="ml-2 underline">
                {tableMeta.rowData[0] + " " + tableMeta.rowData[1]}
              </span>
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
          return getStatusStyle(value);
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
          return getSecondChoiceStatusStyle(value);
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
