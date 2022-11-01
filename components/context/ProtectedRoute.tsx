import { ReactChild, ReactElement } from "react";
import { useAuth } from "./AuthUserContext";
import Loading from "@components/common/Loading";
import Login from "@components/common/Login";

type Props = {
  children: ReactChild;
};

const ProtectedRoute = ({ children }: Props): ReactElement => {
  const { user, isLoading } = useAuth();

  return isLoading ? <Loading /> : user ? <>{children}</> : <Login />;
};

export default ProtectedRoute;
