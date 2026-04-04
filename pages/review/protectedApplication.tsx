import { ParsedUrlQuery } from "querystring";
import { ReactChild, ReactElement, useEffect, useState } from "react";
import Loading from "@components/common/Loading";
import { AuthStatus } from "types";
import { getApplicantRecordId } from "@components/review/shared/reviewUtils";

export type Props = {
  children: ReactChild;
  headerInformation: ParsedUrlQuery;
};

const ProtectedApplication = ({
  children,
  headerInformation,
}: Props): ReactElement => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    loading: true,
    isAuthorized: false,
  });

  const reviewIdKey =
    typeof headerInformation.reviewId === "string"
      ? headerInformation.reviewId
      : "";

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setAuthStatus({ loading: false, isAuthorized: false });
      return;
    }

    try {
      getApplicantRecordId({ reviewId: reviewIdKey });
    } catch {
      setAuthStatus({ loading: false, isAuthorized: false });
      return;
    }

    setAuthStatus({
      loading: false,
      isAuthorized: true,
    });
  }, [reviewIdKey]);

  return authStatus.loading ? (
    <Loading />
  ) : authStatus.isAuthorized ? (
    <>{children}</>
  ) : (
    <div>Unauthorized</div>
  );
};

export default ProtectedApplication;
