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
      // MUIDataTableToolbar: {
      //   root: {
      //     display: "",
      //   },
      // },
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

type StatusProps = {
  status: string;
};

const STATUS_BASE_CLASSES = "text-center rounded px-2 py-1";
const SECOND_CHOICE_BASE_CLASSES = "rounded-3xl text-center w-fit px-2";

export const Status: React.FC<StatusProps> = ({ status }) => {
  let className = STATUS_BASE_CLASSES;
  let text = "";

  switch (status) {
    case "applied":
      className += " bg-sky-200";
      text = "Applied";
      break;
    case "in review":
      className += " bg-yellow-100";
      text = "In Review";
      break;
    case "interview":
      className += " bg-green-100";
      text = "Interview";
      break;
    case "pending":
      className += " bg-charcoal-300";
      text = "Pending";
  }

  return <div className={className}>{text}</div>;
};

export const SecondChoiceStatus: React.FC<StatusProps> = ({ status }) => {
  let className = SECOND_CHOICE_BASE_CLASSES;
  let text = "";

  switch (status) {
    case "n/a":
      className += " text-red-500 border";
      text = "N/A";
      break;
    case "considered":
      className += " text-green-300 border";
      text = "Considered";
      break;
    case "not considered":
      className += " border text-charcoal-400";
      text = "Not Considered";
      break;
    case "in review":
      className += " bg-yellow-100";
      break;
    case "interview":
      className += " bg-green-100";
      break;
    case "recommended":
      className += " bg-orange-300";
      text = "Recommended";
      break;
    case "no interview":
      className += " bg-charcoal-300";
      text = "No Interview";
      break;
  }

  return <div className={className}>{text}</div>;
};
