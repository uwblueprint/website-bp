import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ApplyBar, APPLY_BAR_HEIGHT } from "@/components/layout/ApplyBar";
import Footer from "@/components/layout/Footer";
import MainContent from "@/components/layout/MainContent";
import { NavMenuProvider } from "@/components/layout/NavMenuContext";
import Navbar from "@/components/layout/Navbar";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { Geist } from "next/font/google";
import { APPLICATION_IS_LIVE } from "@constants/applications";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "UW Blueprint",
  description:
    "Build technology that improves the world. UW Blueprint pairs motivated teams with local non-profits to create solutions for social good, pro bono.",
  authors: [{ name: "UW Blueprint" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // When applications are live, the sticky ApplyBar occupies the top of the
  // viewport; `--apply-banner-h` offsets the navbar (see Navbar) and pushes all
  // page content down by exactly the bar's height.
  const bannerStyle = APPLICATION_IS_LIVE
    ? ({ "--apply-banner-h": APPLY_BAR_HEIGHT } as CSSProperties)
    : undefined;

  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className="flex min-h-screen flex-col antialiased pt-[var(--apply-banner-h,0px)]"
        style={bannerStyle}
      >
        <ApplyBar />
        <NavMenuProvider>
          <Navbar />
          <MainContent>{children}</MainContent>
          <ScrollToTopButton />
        </NavMenuProvider>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
