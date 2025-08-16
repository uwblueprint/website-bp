import { ReactChild, ReactElement, useEffect, useState } from "react";
import Loading from "@components/common/Loading";
import { useRouter } from "next/router";
import AuthAPIClient from "APIClients/AuthAPIClient";
import { AuthStatus } from "types";

type Props = {
  children: ReactChild;
  allowedRoles: Role[];
};

type Role = "Admin" | "User";

const ProtectedRoute = ({ children, allowedRoles }: Props): ReactElement => {
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    loading: true,
    isAuthorized: false,
  });
  useEffect(() => {
    // check if we have an accessToken cached
    if (localStorage.getItem("accessToken") == null) {
      setAuthStatus({
        loading: false,
        isAuthorized: false,
      });
      return;
    }
    AuthAPIClient.isAuthorizedAdmin()
      .then(async (isAuthorized) => {
        if (isAuthorized) {
          setAuthStatus({
            loading: false,
            isAuthorized: true,
          });
        } else {
          setAuthStatus({
            loading: false,
            isAuthorized: false,
          });
        }
      })
      .catch((e) => {
        console.error("Auth Validation Error");
        console.error(e);
      });
  }, [allowedRoles]);

  if (!authStatus.loading && !authStatus.isAuthorized)
    router.push("/admin/login");
  // TODO: handle redirect to 404 here

  return authStatus.loading ? (
    <Loading />
  ) : authStatus.isAuthorized ? (
    <>{children}</>
  ) : (
    <></>
  );
};

export default ProtectedRoute;
