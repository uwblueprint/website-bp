import { FC } from "react";
import AppDetails from "@components/admin/AppDetails";
import ProtectedRoute from "@components/context/ProtectedRoute";
import { useRouter } from "next/router";

const Post: FC = () => {
  const { pid } = useRouter().query;

  return (
    <ProtectedRoute>
      <AppDetails id={pid as string} />
    </ProtectedRoute>
  );
};

export default Post;
