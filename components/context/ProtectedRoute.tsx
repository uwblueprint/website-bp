import { ReactChild, ReactElement, useEffect, useState } from "react";
import Loading from "@components/common/Loading";
import { queries } from "graphql/queries";
import { useRouter } from "next/router";
import { fetchGraphql } from "@utils/makegqlrequest";

type Props = {
  children: ReactChild;
  allowedRoles: Role[];
};

type Role = "Admin" | "User";

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
    fetchGraphql(queries.isAuthorizedByRole, {
      accessToken,
      roles: allowedRoles,
    }).then((result) => {
      if (result.data.isAuthorizedByRole) {
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
