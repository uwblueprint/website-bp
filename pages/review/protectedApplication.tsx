import { ParsedUrlQuery } from "querystring";
import { ReactChild, ReactElement, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { fetchGraphql } from "@utils/makegqlrequest";
import { queries } from "graphql/queries";
import Loading from "@components/common/Loading";

export type Props = {
  children: ReactChild;
  headerInformation: ParsedUrlQuery;
};

type AccessToken = {
  readonly user_id: string;
};

export const getReviewId = (query: any): number => {
  // verify reviewId
  const reviewId =
    typeof query["reviewId"] === "string"
      ? parseInt(query["reviewId"])
      : (() => {
          throw new Error("reviewId must be a String");
        })();
  if (Number.isNaN(reviewId)) throw Error("reviewId must be parsable into an int");

  return reviewId;
};

// export default getReviewId;

interface AuthStatus {
  loading: boolean;
  isAuthorized: boolean;
}

const ProtectedApplication = ({
  children,
  headerInformation,
}: Props): ReactElement => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    loading: true,
    isAuthorized: false,
  });
  const reviewId = getReviewId(headerInformation);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw Error("undefined accessToken");

    const decodedToken = jwt_decode<AccessToken>(accessToken);
    const reviewerUserId = decodedToken.user_id;

    fetchGraphql(queries.isAuthorizedToReview, {
      applicationId: reviewId,
      reviewerUserId,
    }).then((result) => {
      if (result.data && result.data.isAuthorizedToReview) {
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