import { ParsedUrlQuery } from "querystring";
import { ReactChild, ReactElement, useEffect, useState } from "react";
import Loading from "@components/common/Loading";
import { AuthStatus } from "types";

export type Props = {
  children: ReactChild;
  headerInformation: ParsedUrlQuery;
};

const ProtectedApplication = ({
  children,
  headerInformation: _headerInformation,
}: Props): ReactElement => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    loading: true,
    isAuthorized: false,
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setAuthStatus({
        loading: false,
        isAuthorized: false,
      });
      return;
    }

    setAuthStatus({
      loading: false,
      isAuthorized: true,
    });
  }, []);

  return authStatus.loading ? (
    <Loading />
  ) : authStatus.isAuthorized ? (
    <>{children}</>
  ) : (
    <div>Unauthorized</div>
  );
};

export default ProtectedApplication;
