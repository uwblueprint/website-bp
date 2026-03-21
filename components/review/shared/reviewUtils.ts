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
): number => {
  const reviewId =
    typeof query["applicantRecordId"] === "string"
      ? parseInt(query["applicantRecordId"])
      : (() => {
          throw new Error("applicantRecordId must be a String");
        })();
  if (Number.isNaN(reviewId))
    throw Error("applicantRecordId must be parsable into an int");

  return reviewId;
};
