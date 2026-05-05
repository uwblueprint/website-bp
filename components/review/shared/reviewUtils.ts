import { ParsedUrlQuery } from "node:querystring";

export const extractShortAnswerData = (shortAnswerJSON: any) => {
  const extractedQuestions = shortAnswerJSON.map(
    (dict: { [key: string]: string }) => dict.question,
  );

  const extractedAnswers = shortAnswerJSON.map(
    (dict: { [key: string]: string }) => dict.response,
  );

  return { extractedQuestions, extractedAnswers };
};

export const getApplicantRecordId = (query: ParsedUrlQuery): string => {
  const parsedQuery = query.applicantRecordId;
  if (!parsedQuery) {
    throw new Error("Applicant record ID is required to access review page.");
  }

  if (Array.isArray(parsedQuery)) {
    throw new Error(
      "Multiple applicant record IDs provided. Only one is expected.",
    );
  }

  return parsedQuery;
};
