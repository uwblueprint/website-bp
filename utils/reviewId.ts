import { ParsedUrlQuery } from "querystring";

const getQueryValue = (
  query: ParsedUrlQuery,
  key: string,
): string | undefined => {
  const raw = query?.[key];
  return typeof raw === "string"
    ? raw
    : Array.isArray(raw)
    ? raw[0]
    : undefined;
};

export function tryGetApplicantRecordId(query: ParsedUrlQuery): string | null {
  const value = getQueryValue(query, "applicantRecordId");

  if (typeof value !== "string" || value.length === 0) {
    return null;
  }

  return value;
}
