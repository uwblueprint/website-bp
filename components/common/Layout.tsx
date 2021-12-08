import { FC } from "react";
import Head from "next/head";
import Navbar from "@components/common/NavBar";
import Footer from "@components/common/Footer";

type Props = {
  readonly title?: string;
};

/** Layout component */
const Layout: FC<Props> = ({ children, title = "UW Blueprint" }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
