import { NextPage } from "next";
import Layout from "@components/common/Layout";
import Hero from "@components/join/Hero";
import WhyJoin from "@components/join/WhyJoin";
import Community from "@components/join/Community";
import WhatWeLookFor from "@components/join/WhatWeLookFor";
import OurProcess from "@components/join/OurProcess";
import FAQ from "@components/join/FAQ";

/** Join Our Team page */
const Join: NextPage = () => {
  return (
    <Layout>
      <Hero />
      <WhyJoin />
      <Community />
      <WhatWeLookFor />
      <OurProcess />
      <FAQ />
    </Layout>
  );
};

export default Join;
