type ShortAnswerEntry = {
  question: string;
  response: string;
};

export const extractShortAnswerData = (
  shortAnswerJSON: ShortAnswerEntry[],
): {
  extractedQuestions: string[];
  extractedAnswers: string[];
} => ({
  extractedQuestions: shortAnswerJSON.map(({ question }) => question),
  extractedAnswers: shortAnswerJSON.map(({ response }) => response),
});

export const getApplicantRecordId = (
  query: Record<string, string | string[] | undefined>,
): string => {
  const applicantRecordId =
    typeof query["applicantRecordId"] === "string"
      ? query["applicantRecordId"]
      : (() => {
          throw new Error("applicantRecordId must be a String");
        })();

  if (applicantRecordId.trim().length === 0) {
    throw Error("applicantRecordId must be a non-empty string");
  }

  return applicantRecordId;
};
