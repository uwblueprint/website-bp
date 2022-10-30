import { FC } from "react";
import { useRouter } from "next/router";
import AppDetails from "@components/admin/AppDetails";
import { useAuth } from "@components/context/AuthUserContext";

const Post: FC = () => {
  const router = useRouter();
  const { pid } = router.query;
  const { user } = useAuth();

  console.log(user);

  return <AppDetails id={pid as string} />;
};

export default Post;
