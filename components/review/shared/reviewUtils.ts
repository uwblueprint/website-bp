import { REVIEW_SCORE_STAGES, REVIEW_STAGES, ReviewStage } from "./constants";
import {
  ReviewRoleSpecificQuestion,
  ReviewRoleSpecificSection,
  ReviewScores,
  ReviewShortAnswer,
} from "./types";

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

export const getParsedRoleSpecificSections = (
  serializedRoleSpecificQuestions?: string,
): ReviewRoleSpecificSection[] =>
  parseJsonArray<ReviewRoleSpecificSection>(serializedRoleSpecificQuestions);

export const getShortAnswerAtIndex = (
  serializedShortAnswers: string | undefined,
  index: number,
): ReviewShortAnswer =>
  getParsedShortAnswers(serializedShortAnswers)[index] ?? { question: "" };

export const getRoleSpecificQuestions = (
  serializedRoleSpecificQuestions?: string,
): ReviewRoleSpecificQuestion[] =>
  getParsedRoleSpecificSections(serializedRoleSpecificQuestions)[0]
    ?.questions ?? [];

export const extractShortAnswerData = (
  shortAnswerJSON: ReviewShortAnswer[],
): {
  extractedQuestions: string[];
  extractedAnswers: string[];
} => {
  const extractedQuestions = shortAnswerJSON.map((dict) => dict.question);

  const extractedAnswers = shortAnswerJSON.map((dict) => dict.response ?? "");

  return { extractedQuestions, extractedAnswers };
};

export const hasScore = (score: number): boolean => score > 0 && score <= 5;

export const hasAllRequiredScores = (scores: ReviewScores): boolean =>
  REVIEW_SCORE_STAGES.every((stage) => hasScore(scores[stage]));

export const getFirstIncompleteScoreStage = (
  scores: ReviewScores,
): ReviewStage | null =>
  REVIEW_SCORE_STAGES.find((stage) => !hasScore(scores[stage])) ?? null;

export const getMaxAccessibleStageIndex = (scores: ReviewScores): number => {
  const firstIncompleteStage = getFirstIncompleteScoreStage(scores);
  if (firstIncompleteStage === null) {
    return REVIEW_STAGES.length - 1;
  }

  return Math.max(REVIEW_STAGES.indexOf(firstIncompleteStage), 1);
};

const getReviewIdParam = (
  query: Record<string, string | string[] | undefined>,
): string | null => {
  const value = query["reviewId"];
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value) && value.length > 0) {
    return value[0];
  }

  return null;
};

export const getReviewIdOrNull = (
  query: Record<string, string | string[] | undefined>,
): number | null => {
  const reviewIdParam = getReviewIdParam(query);
  if (reviewIdParam === null) {
    return null;
  }

  const reviewId = parseInt(reviewIdParam, 10);
  return Number.isNaN(reviewId) ? null : reviewId;
};

export const getReviewId = (
  query: Record<string, string | string[] | undefined>,
): number => {
  const reviewId = getReviewIdOrNull(query);
  if (reviewId === null) {
    throw new Error("reviewId must be a parsable query parameter");
  }

  return reviewId;
};
