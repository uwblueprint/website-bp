import React from "react";
import { AppProps } from "next/app";

import { ThemeProvider } from "styled-components";

import GlobalStyle from "@styles/GlobalStyle";
import { theme } from "@styles/Theme";

import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/footer";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
