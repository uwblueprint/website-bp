export const extractShortAnswerData = (shortAnswerJSON: any) => {
  const extractedQuestions = shortAnswerJSON.map(
    (dict: { [key: string]: string }) => dict.question,
  );

  const extractedAnswers = shortAnswerJSON.map(
    (dict: { [key: string]: string }) => dict.response,
  );

  return { extractedQuestions, extractedAnswers };
};

/**
 * `reviewId` query param holds the applicant record id (string / UUID) for review APIs.
 */
export const getApplicantRecordId = (
  query: Record<string, string | string[] | undefined>,
): string => {
  const raw = query["reviewId"];
  if (typeof raw !== "string" || raw.trim() === "") {
    throw new Error("reviewId must be a non-empty string");
  }
  return raw.trim();
};
