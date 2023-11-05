import { createTheme, Theme } from "@material-ui/core/styles";
import { theme } from "../styles/Theme";

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
