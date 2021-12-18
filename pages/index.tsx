import { NextPage } from "next";
import Layout from "@components/common/Layout";
import Impact from "@components/landing/Impact";
import HowItWorks from "@components/landing/HowItWorks";
import Hero from "@components/landing/Hero";
import IntroVideo from "@components/landing/IntroVideo";

/** Home page */
const Home: NextPage = () => {
  return (
    <Layout>
      <Hero />
      <Impact />
      <HowItWorks />
      <IntroVideo />
    </Layout>
  );
};

export default Home;
