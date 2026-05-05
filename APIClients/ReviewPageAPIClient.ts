import { fetchGraphql } from "@utils/makegqlrequest";
import { mutations } from "graphql/queries";
import BaseAPIClient from "./BaseAPIClient";
import { ReviewedApplicantRecordDTO } from "types/review";

export const reportReviewConflict = async (
  applicantRecordId: string,
  reviewerId: number,
): Promise<ReviewedApplicantRecordDTO> => {
  BaseAPIClient.handleAuthRefresh();
  const rawResponse = await fetchGraphql(mutations.reportReviewConflict, {
    applicantRecordId,
    reviewerId,
  });
  const response = rawResponse?.data?.reportReviewConflict;

  if (!response) {
    throw new Error("Conflict report request returned no data");
  }

  return response;
};
