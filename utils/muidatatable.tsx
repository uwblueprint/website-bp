import { createTheme, Theme } from "@material-ui/core/styles";
import { theme } from "../styles/Theme";
import React from "react";

export const getMuiTheme = (): Theme => {
  return createTheme({
    overrides: {
      MuiPaper: {
        root: {
          border: `1px solid ${theme.colors.greys.border}`,
        },
      },
      MUIDataTable: {
        paper: {
          boxShadow: "none",
          marginBottom: "3em",
        },
        root: {
          fontFamily: "Source Sans Pro",
        },
      },
      MuiTypography: {
        root: {
          fontFamily: "Source Sans Pro !important",
        },
        body1: {
          fontFamily: "Source Sans Pro",
        },
        body2: {
          fontFamily: "Source Sans Pro",
        },
      },
      MuiButtonBase: {
        root: {
          fontFamily: "Source Sans Pro",
        },
      },
      MUIDataTableHeadCell: {
        data: {
          color: theme.colors.near_black,
          fontFamily: "Source Sans Pro",
          fontWeight: 350,
          fontSize: 18,
        },
        sortActive: {
          color: theme.colors.B10,
        },
      },
      MUIDataTableBodyCell: {
        root: {
          color: theme.colors.near_black,
          fontFamily: "Source Sans Pro",
          fontWeight: 350,
          fontSize: 18,
        },
      },
      MuiTableSortLabel: {
        root: {
          color: `${theme.colors.B10} !important`,
        },
        active: {
          color: theme.colors.B10,
        },
        iconDirectionAsc: {
          color: theme.colors.B10,
        },
      },
      MuiSvgIcon: {
        root: {
          color: `${theme.colors.B10} !important`,
        },
      },
    },
  });
};

// utils/muidatatable.ts

export const getExpandableRowMuiTheme = (): Theme => {
  return createTheme({
    overrides: {
      MUIDataTable: {
        paper: {
          boxShadow: "none", // Removes the shadow around the table
        },
        responsiveScroll: {
          maxHeight: "none", // You might want to remove max height if it's set
        },
      },
      MUIDataTableToolbar: {
        root: {
          display: "",
        },
      },
      MUIDataTableHeadCell: {
        root: {
          color: "#0573E8", // If you want a white text color
        },
      },
      MUIDataTableDivider: {
        root: {
          display: "none", // This removes the border/divider below the table header
        },
      },
      MUIDataTableBodyCell: {
        root: {
          borderBottom: "none", // Removes the cell dividers within the table body
        },
      },
      MuiTableCell: {
        root: {
          borderBottom: "none", // Removes the cell dividers within the table as well
        },
      },
    },
  });
};

type StatusProps = {
  status: string;
};

type CategoryProps = {
  category: string;
};

const STATUS_BASE_CLASSES = "text-center rounded w-max px-2 py-1 ";
const SECOND_CHOICE_BASE_CLASSES = "text-center rounded w-max px-2 ";

export const Status: React.FC<StatusProps> = ({ status }) => {
  let className = STATUS_BASE_CLASSES;
  let text = "";

  switch (status) {
    case "accepted":
      className += "bg-green-100 ";
      text = "Accepted";
      break;
    case "applied":
      className += "bg-sky-200 ";
      text = "Applied";
      break;
    case "in review":
      className += "bg-yellow-100 ";
      text = "In Review";
      break;
    case "interviewed":
      className += "bg-orange-200 ";
      text = "Interviewed";
      break;
    case "pending":
      className += "bg-charcoal-300 ";
      text = "Pending";
      break;
    case "rejected":
      className += "bg-pink-300 ";
      text = "Rejected";
      break;
  }

  return <div className={className}>{text}</div>;
};

export const SecondChoiceStatus: React.FC<StatusProps> = ({ status }) => {
  let className = SECOND_CHOICE_BASE_CLASSES;
  let text = "";

  switch (status) {
    case "considered":
      className += "rounded-3xl text-green-300 border ";
      text = "Considered";
      break;
    case "n/a":
      className += "rounded-3xl text-red-500 border ";
      text = "N/A";
      break;
    case "not considered":
      className += "rounded-3xl border text-charcoal-400 ";
      text = "Not Considered";
      break;
    case "in review":
      className += "bg-yellow-100 py-1 ";
      text = "In Review";
      break;
    case "interview":
      className += "bg-green-100 py-1 ";
      text = "Interview";
      break;
    case "recommended":
      className += "bg-orange-200 py-1 ";
      text = "Recommended";
      break;
    case "no interview":
      className += "bg-charcoal-300 py-1 ";
      text = "No Interview";
      break;
  }

  return <div className={className}>{text}</div>;
};

export const SkillCategory: React.FC<CategoryProps> = ({ category }) => {
  let className = STATUS_BASE_CLASSES;
  let text = "";

  switch (category) {
    case "intermediate":
      className += "bg-pink-300 ";
      text = "Intermediate";
      break;
    case "junior":
      className += "bg-violet-200 ";
      text = "Junior";
      break;
    case "senior":
      className += "bg-pink-100 ";
      text = "Senior";
      break;
    default:
      className += "bg-charcoal-300 ";
      text = "Unavailable";
      break;
  }

  return <div className={className}>{text}</div>;
};
