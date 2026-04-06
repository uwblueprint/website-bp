import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import MainContent from "@/components/layout/MainContent";
import { NavMenuProvider } from "@/components/layout/NavMenuContext";
import Navbar from "@/components/layout/Navbar";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { Geist } from "next/font/google";
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
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="flex min-h-screen flex-col antialiased">
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
