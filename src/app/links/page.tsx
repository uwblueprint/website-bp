import type { Metadata } from "next";

import { LinkHub } from "@/components/links/LinkHub";

export const metadata: Metadata = {
  title: "Links",
  description:
    "Everything Blueprint, in one place — hiring, Blueprint Nights, the Impact-A-thon, and merch.",
};

export default function LinksPage() {
  return <LinkHub />;
}
