export const extractShortAnswerData = (shortAnswerJSON: any) => {
  const extractedQuestions = shortAnswerJSON.map(
    (dict: { [key: string]: string }) => dict.question,
  );

  const extractedAnswers = shortAnswerJSON.map(
    (dict: { [key: string]: string }) => dict.response,
  );

  return { extractedQuestions, extractedAnswers };
};

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
