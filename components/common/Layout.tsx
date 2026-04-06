import { FC, ReactNode } from "react";
import Head from "next/head";
import Navbar from "@components/common/NavBar";
import Footer from "@components/common/Footer";

type Props = {
  readonly children?: ReactNode;
  readonly title?: string;
  readonly hideFooter?: boolean;
  /** When true, navbar and footer render without navigation links. */
  readonly minimal?: boolean;
};

/** Layout component */
const Layout: FC<Props> = ({
  children,
  title = "UW Blueprint",
  hideFooter = false,
  minimal = false,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar minimal={minimal} />
      <div className="min-h-screen overflow-x-hidden">{children}</div>
      {!hideFooter && <Footer minimal={minimal} />}
    </>
  );
};

export default Layout;
