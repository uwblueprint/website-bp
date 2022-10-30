import { FC } from "react";
import { AppProps } from "next/app";
import "@styles/globals.css";
import { AuthProvider } from "@components/context/AuthUserContext";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default App;
