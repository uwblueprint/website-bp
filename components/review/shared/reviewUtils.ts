export const extractShortAnswerData = (shortAnswerJSON: any) => {
  const extractedQuestions = shortAnswerJSON.map(
    (dict: { [key: string]: string }) => dict.question,
  );

  const extractedAnswers = shortAnswerJSON.map(
    (dict: { [key: string]: string }) => dict.response,
  );

  return { extractedQuestions, extractedAnswers };
};

export const getReviewId = (
  query: Record<string, string | string[] | undefined>,
): number => {
  const reviewId =
    typeof query["reviewId"] === "string"
      ? parseInt(query["reviewId"])
      : (() => {
          throw new Error("reviewId must be a String");
        })();
  if (Number.isNaN(reviewId))
    throw Error("reviewId must be parsable into an int");

  return reviewId;
};
