import { NextPage } from "next";
import Layout from "@components/common/Layout";
import UploadFile from "@components/common/UploadFile";

const UploadFilePage: NextPage = () => {
  return (
    <Layout title="Upload File | UW Blueprint">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
        <UploadFile />
      </div>
    </Layout>
  );
};

export default UploadFilePage;
