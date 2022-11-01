import { ReactChild, ReactElement, useEffect, useState } from "react";
import { useAuth } from "./AuthUserContext";
import Login from "../common/Login";
import Loading from "@components/common/Loading";

type Props = {
  children: ReactChild;
};

const ProtectedRoute = ({ children }: Props): ReactElement => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  return loading ? <Loading /> : user ? <>{children}</> : <Login />;
};

export default ProtectedRoute;
