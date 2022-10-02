import AppForm from "@components/apply/AppForm";
import Layout from "@components/common/Layout";
import { NextPage } from "next";

/** Apply to Blueprint! */
const Apply: NextPage = () => {
  return (
    <Layout>
      <AppForm />
    </Layout>
  );
};

export default Apply;
