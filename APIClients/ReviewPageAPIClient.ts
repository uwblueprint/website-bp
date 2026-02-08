import { fetchGraphql } from "@utils/makegqlrequest";
import { mutations } from "graphql/queries";
import jwt_decode from "jwt-decode";
import BaseAPIClient from "./BaseAPIClient";

type AccessTokenPayload = {
  readonly user_id?: string;
};

export type ReportReviewConflictResult = {
  readonly applicantRecordId: string;
  readonly reviewerId: number;
  readonly status: string;
  readonly score: number;
  readonly reviewerHasConflict: boolean;
};

const reportReviewConflict = async (
  applicantRecordId: number,
): Promise<ReportReviewConflictResult> => {
  BaseAPIClient.handleAuthRefresh();
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("No access token provided");
  }

  const decodedToken = jwt_decode<AccessTokenPayload>(accessToken);
  const reviewerIdRaw = decodedToken?.user_id;
  if (!reviewerIdRaw) {
    throw new Error("Reviewer ID not found in access token");
  }
  const reviewerId = parseInt(reviewerIdRaw, 10);
  if (Number.isNaN(reviewerId)) {
    throw new Error("Reviewer ID in access token is not a number");
  }

  return fetchGraphql(mutations.reportReviewConflict, {
    applicantRecordId: String(applicantRecordId),
    reviewerId,
  }).then((result) => result.data.reportReviewConflict);
};

export default {
  reportReviewConflict,
};
