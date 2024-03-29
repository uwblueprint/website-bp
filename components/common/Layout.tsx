import { FC } from "react";
import Head from "next/head";
import Navbar from "@components/common/NavBar";
import Footer from "@components/common/Footer";

type Props = {
  readonly title?: string;
  readonly hideFooter?: boolean;
};

/** Layout component */
const Layout: FC<Props> = ({
  children,
  title = "UW Blueprint",
  hideFooter = false,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <div className="min-h-screen overflow-x-hidden">{children}</div>
      {!hideFooter && <Footer />}
    </>
  );
};

export default Layout;
