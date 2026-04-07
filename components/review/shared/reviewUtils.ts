import { ReviewShortAnswer } from "./types";

const parseJsonArray = <T>(value?: string): T[] => {
  if (!value) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(value);
    return Array.isArray(parsedValue) ? (parsedValue as T[]) : [];
  } catch {
    return [];
  }
};

export const getParsedShortAnswers = (
  serializedShortAnswers?: string,
): ReviewShortAnswer[] =>
  parseJsonArray<ReviewShortAnswer>(serializedShortAnswers);

export const extractShortAnswerData = (
  shortAnswerJSON: ReviewShortAnswer[],
): { extractedQuestions: string[]; extractedAnswers: string[] } => {
  const extractedQuestions = shortAnswerJSON.map((dict) => dict.question);

  const extractedAnswers = shortAnswerJSON.map((dict) => dict.response ?? "");

  return { extractedQuestions, extractedAnswers };
};

export const getReviewId = (
  query: Record<string, string | string[] | undefined>,
): number => {
  const reviewId =
    typeof query["reviewId"] === "string"
      ? parseInt(query["reviewId"], 10)
      : (() => {
          throw new Error("reviewId must be a String");
        })();
  if (Number.isNaN(reviewId))
    throw Error("reviewId must be parsable into an int");

  return reviewId;
};
