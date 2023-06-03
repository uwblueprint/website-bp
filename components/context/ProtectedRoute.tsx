import { ReactChild, ReactElement, useEffect, useState } from "react";
import Loading from "@components/common/Loading";
import { useRouter } from "next/router";
import AuthAPIClient, { Role } from "APIClients/AuthAPIClient";

type Props = {
  children: ReactChild;
  allowedRoles: Role[];
};

interface AuthStatus {
  loading: boolean;
  isAuthorized: boolean;
}

const ProtectedRoute = ({ children, allowedRoles }: Props): ReactElement => {
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    loading: true,
    isAuthorized: false,
  });
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken == null) {
      setAuthStatus({
        loading: false,
        isAuthorized: false,
      });
      return;
    }

    const handleAuthorization = async (
      accessToken: string,
      allowedRoles: Role[],
    ) => {
      const isAuthorized = await AuthAPIClient.isAuthorizedByRole(
        accessToken,
        allowedRoles,
      );
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
    };

    handleAuthorization(accessToken, allowedRoles);
  }, []);

  if (!authStatus.loading && !authStatus.isAuthorized)
    router.push("/admin/login");

  return authStatus.loading ? (
    <Loading />
  ) : authStatus.isAuthorized ? (
    <>{children}</>
  ) : (
    <></>
  );
};

export default ProtectedRoute;
