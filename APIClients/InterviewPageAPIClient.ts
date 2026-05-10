import { fetchGraphql } from "@utils/makegqlrequest";
import { queries } from "graphql/queries";
import { UserDTO } from "types/auth";
import type { InterviewedApplicantsDTO } from "types/interviewPage";

export const getInterviewedApplicantsByUserId = async (
  userId: number,
): Promise<InterviewedApplicantsDTO[]> => {
  return fetchGraphql(queries.getInterviewedApplicantsByUserId, { userId })
    .then((result) => result.data.getInterviewedApplicantsByUserId)
    .catch((e: Error) => {
      throw new Error(
        `Failed to get interviewed applicants. Cause: ${e.message}`,
      );
    });
};

export const getInterviewersByGroupId = async (
  groupId: string,
): Promise<UserDTO[]> => {
  return fetchGraphql(queries.getInterviewersByGroupId, { groupId })
    .then((result) => result.data.getInterviewersByGroupId)
    .catch((e: Error) => {
      throw new Error(
        `Failed to get interviewers by group id. Cause: ${e.message}`,
      );
    });
};

export default { getInterviewedApplicantsByUserId, getInterviewersByGroupId };
