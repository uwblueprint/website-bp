import { ReactChild, ReactElement } from "react";
import { useAuth } from "./AuthUserContext";
import Login from "../common/Login";

type Props = {
  children: ReactChild;
};

const ProtectedRoute = ({ children }: Props): ReactElement => {
  const { user } = useAuth();

  return user ? <>{children}</> : <Login />;
};

export default ProtectedRoute;
