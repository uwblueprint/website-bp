import { FC } from "react";
import AppDetails from "@components/admin/AppDetails";
import { useAuth } from "@components/context/AuthUserContext";
import ProtectedRoute from "@components/context/ProtectedRoute";
import { useRouter } from "next/router";

const Post: FC = () => {
  const { user } = useAuth();
  const { pid } = useRouter().query;

  console.log(user);

  return (
    <ProtectedRoute>
      <>
        Hi
        <AppDetails id={pid as string} />
      </>
    </ProtectedRoute>
  );
};

export default Post;
