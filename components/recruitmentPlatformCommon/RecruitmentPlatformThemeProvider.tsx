import React, { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  muiPaletteOptions,
  semanticColors,
} from "@constants/recruitmentPlatformPalette";

// Augment MUI Palette to include recruitment-specific colors under `palette.recruitment`
declare module "@mui/material/styles" {
  interface Palette {
    semantics: typeof semanticColors;
  }
  interface PaletteOptions {
    semantics?: typeof semanticColors;
  }
}

// Create the recruitment platform theme and attach custom colors under `palette.recruitment`
const recruitmentPlatformTheme = createTheme({
  palette: {
    ...muiPaletteOptions,
    semantics: semanticColors,
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

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
