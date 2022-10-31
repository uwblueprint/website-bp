import { ReactChild, ReactElement } from "react";
import { useAuth } from "./AuthUserContext";
import FirebaseLogin from "./FirebaseLogin";

type Props = {
  children: ReactChild;
};

const ProtectedRoute = ({ children }: Props): ReactElement => {
  const { user } = useAuth();

  return user ? (
    <>{children}</>
  ) : (
    <>
      <FirebaseLogin />
    </>
  );
};

export default ProtectedRoute;
