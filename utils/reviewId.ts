import { ParsedUrlQuery } from "querystring";

export function tryGetReviewId(query: ParsedUrlQuery): number | null {
  const raw = query?.["reviewId"];
  const value =
    typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : undefined;

  if (typeof value !== "string" || value.length === 0) {
    return null;
  }

  const id = parseInt(value, 10);
  return Number.isNaN(id) ? null : id;
}
