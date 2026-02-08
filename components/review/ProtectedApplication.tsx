import { ParsedUrlQuery } from "querystring";
import { ReactChild, ReactElement, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { fetchGraphql } from "@utils/makegqlrequest";
import { queries } from "graphql/queries";
import Loading from "@components/common/Loading";
import { AuthStatus } from "types";

export type Props = {
  children: ReactChild;
  headerInformation: ParsedUrlQuery;
};

type AccessToken = {
  readonly user_id: string;
};

const ProtectedApplication = ({
  children,
  headerInformation,
}: Props): ReactElement => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    loading: true,
    isAuthorized: false,
  });
  // During prerender/export, query params aren't available. Treat missing reviewId as null.
  const reviewId =
    typeof headerInformation["reviewId"] === "string"
      ? headerInformation["reviewId"]
      : null;
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setAuthStatus({
        loading: false,
        isAuthorized: false,
      });
      return;
    }

    const decodedToken = jwt_decode<AccessToken>(accessToken);
    setAuthStatus({
      loading: false,
      isAuthorized: true,
    });
  }, [reviewId]);

  return authStatus.loading ? (
    <Loading />
  ) : authStatus.isAuthorized ? (
    <>{children}</>
  ) : (
    <div>Unauthorized</div>
  );
};

export default ProtectedApplication;
