import { ParsedUrlQuery } from "node:querystring";

export const getApplicantRecordId = (query: ParsedUrlQuery): string => {
  const parsedQuery = query.applicantRecordId;

  if (!parsedQuery) {
    throw new Error("Applicant record ID is required to access review page.");
  }

  if (Array.isArray(parsedQuery)) {
    throw new Error(
      "Multiple applicant record IDs provided. Only one is expected.",
    );
  }

  return parsedQuery;
};
