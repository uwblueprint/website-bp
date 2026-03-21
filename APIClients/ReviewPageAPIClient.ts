import { fetchGraphql } from "@utils/makegqlrequest";
import { mutations } from "graphql/queries";
import BaseAPIClient from "./BaseAPIClient";

export type ReportReviewConflictResult = {
  readonly applicantRecordId: string;
  readonly reviewerId: number;
  readonly status: string;
  readonly score: number;
  readonly reviewerHasConflict: boolean;
};

const reportReviewConflict = async (
  applicantRecordId: string,
  reviewerId: number,
): Promise<ReportReviewConflictResult> => {
  BaseAPIClient.handleAuthRefresh();
  if (!Number.isInteger(reviewerId)) {
    throw new Error("Reviewer ID is invalid");
  }

  const result = await fetchGraphql(mutations.reportReviewConflict, {
    applicantRecordId,
    reviewerId,
  });
  const conflictResult = result?.data?.reportReviewConflict;

  if (!conflictResult) {
    throw new Error("Conflict report request returned no data");
  }

  return conflictResult;
};

export default {
  reportReviewConflict,
};
