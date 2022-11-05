import AppForm from "@components/apply/AppForm";
import Layout from "@components/common/Layout";
import { APPLICATION_IS_LIVE, APPLICATION_TERM } from "@constants/applications";
import { NextPage } from "next";

/** Apply to Blueprint! */
const Apply: NextPage = () => {
  return (
    <Layout>
      {APPLICATION_IS_LIVE ? (
        <AppForm />
      ) : (
        <div className="container max-w-4xl px-4 mx-auto mt-44 mb-12 md:mt-40 md:mb-16">
          <h2 className="text-blue">Applications are now closed.</h2>
          <p className="text-charcoal-500 text-xl mt-8">
            Applications for the {APPLICATION_TERM} team are now closed.{" "}
          </p>
          <p className="text-charcoal-500 text-xl mt-2">
            {" "}
            If you have any questions, please contact us at{" "}
            <a
              href="mailto:info@uwblueprint.org"
              className="text-blue underline"
            >
              info@uwblueprint.org
            </a>
            .
          </p>
        </div>
      )}
    </Layout>
  );
};

export default Apply;
