import AppForm from "@components/apply/AppForm";
import InfoText from "@components/apply/InfoText";
import Layout from "@components/common/Layout";
import { NextPage } from "next";

/** Apply to Blueprint! */
const Apply: NextPage = () => {
  return (
    <Layout>
      <AppForm />
      <InfoText />
    </Layout>
  );
};

export default Apply;
