import { NextPage } from "next";
import Layout from "@components/common/Layout";
import Hero from "@components/nonprofits/Hero";
import WhatWeCanDoForYou from "@components/nonprofits/WhatWeCanDoForYou";
import OurProcess from "@components/nonprofits/OurProcess";
import DecisionCriteria from "@components/nonprofits/DecisionCriteria";
import ContactUs from "@components/nonprofits/ContactUs";
import FAQ from "@components/nonprofits/FAQ";

const Nonprofits: NextPage = () => {
  return (
    <Layout>
      <Hero />
      <WhatWeCanDoForYou />
      <OurProcess />
      <DecisionCriteria />
      <ContactUs />
      <FAQ />
    </Layout>
  );
};

export default Nonprofits;
