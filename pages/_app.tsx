import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import "@styles/globals.css";
import { AuthProvider } from "@components/context/AuthUserContext";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return <AuthProvider><>{getLayout(<Component {...pageProps} />)}</></AuthProvider>;
};

export default App;
