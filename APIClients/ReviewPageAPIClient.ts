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
  applicantRecordId: number,
  reviewerId: number,
): Promise<ReportReviewConflictResult> => {
  BaseAPIClient.handleAuthRefresh();
  if (!Number.isInteger(reviewerId)) {
    throw new Error("Reviewer ID is invalid");
  }

  return fetchGraphql(mutations.reportReviewConflict, {
    applicantRecordId: String(applicantRecordId),
    reviewerId,
  }).then((result) => result.data.reportReviewConflict);
};

export default {
  reportReviewConflict,
};
