import React, { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  muiPaletteOptions,
  customColors,
} from "@constants/recruitmentPlatformPalette";

// Extend MUI theme to include custom colors
declare module "@mui/material/styles" {
  interface Theme {
    custom: typeof customColors;
  }
  interface ThemeOptions {
    custom?: typeof customColors;
  }
}

// Create the recruitment platform theme with MUI palette and custom colors
const recruitmentPlatformTheme = createTheme({
  palette: muiPaletteOptions,
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

// Attach custom colors to theme
recruitmentPlatformTheme.custom = customColors;

interface RecruitmentPlatformThemeProviderProps {
  children: ReactNode;
}

/**
 * Theme Provider for the Recruitment Platform
 *
 * <RecruitmentPlatformThemeProvider>
 *   <Component />
 * </RecruitmentPlatformThemeProvider>
 */
export const RecruitmentPlatformThemeProvider: React.FC<
  RecruitmentPlatformThemeProviderProps
> = ({ children }) => (
  <ThemeProvider theme={recruitmentPlatformTheme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export default RecruitmentPlatformThemeProvider;
