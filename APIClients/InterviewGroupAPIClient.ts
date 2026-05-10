import { fetchGraphql } from "@utils/makegqlrequest";
import { queries, mutations } from "graphql/queries";
import type {
  InterviewGroupDTO,
  UpdateInterviewGroupDTO,
} from "types/interviewGroup";

export const updateInterviewGroup = async (
  id: string,
  interviewGroup: UpdateInterviewGroupDTO,
): Promise<InterviewGroupDTO> => {
  return fetchGraphql(mutations.updateInterviewGroup, {
    id,
    interviewGroup,
  })
    .then((result) => result.data.updateInterviewGroup)
    .catch((e: Error) => {
      throw new Error(`Failed to update interview group. Cause: ${e.message}`);
    });
};

export const getInterviewGroupById = async (
  id: string,
): Promise<InterviewGroupDTO> => {
  return fetchGraphql(queries.getInterviewGroupById, { id })
    .then((result) => result.data.getInterviewGroupById)
    .catch((e: Error) => {
      throw new Error(`Failed to get interview group. Cause: ${e.message}`);
    });
};

export default { updateInterviewGroup, getInterviewGroupById };
