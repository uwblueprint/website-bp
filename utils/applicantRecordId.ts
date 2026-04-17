import { ParsedUrlQuery } from "querystring";

const getQueryValue = (
  query: ParsedUrlQuery,
  key: string,
): string | undefined => {
  const raw = query[key];
  if (typeof raw === "string") {
    return raw;
  }

  if (Array.isArray(raw)) {
    return raw[0];
  }

  return undefined;
};

export const tryGetApplicantRecordId = (
  query: ParsedUrlQuery,
): string | null => {
  const applicantRecordId = getQueryValue(query, "applicantRecordId")?.trim();

  if (applicantRecordId == null || applicantRecordId.length === 0) {
    return null;
  }

  return applicantRecordId;
};

export const getApplicantRecordId = (query: ParsedUrlQuery): string => {
  const applicantRecordId = tryGetApplicantRecordId(query);

  if (applicantRecordId == null) {
    throw new Error("applicantRecordId must be a non-empty string");
  }

  return applicantRecordId;
};
