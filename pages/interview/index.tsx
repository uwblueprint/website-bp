import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/interview/profile",
      permanent: false,
    },
  };
};

const InterviewIndex = () => null;

export default InterviewIndex;
