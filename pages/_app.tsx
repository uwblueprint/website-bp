import React from "react";
import { AppProps } from "next/app";

import { ThemeProvider } from "styled-components";
import CssBaseline from "@material-ui/core/CssBaseline";

import GlobalStyle from "@styles/GlobalStyle";
import { theme } from "@styles/Theme";

import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/footer";
import "typeface-poppins";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    React.useEffect(() => {
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles && jssStyles.parentElement) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <NavBar />
                <CssBaseline />
                <Component {...pageProps} />
                <Footer />
            </ThemeProvider>
        </>
    );
}

export default MyApp;
