import { fetchGraphql } from "@utils/makegqlrequest";
import { queries, mutations } from "graphql/queries";

const InterviewGroupStatus = {
  READY_TO_INTERVIEW: "Ready to Interview",
  INVITES_SENT: "Invites Sent",
  AVAILABILITY_PENDING: "Availability Pending",
} as const;

export type InterviewGroupStatus =
  typeof InterviewGroupStatus[keyof typeof InterviewGroupStatus];

export type InterviewGroup = {
  schedulingLink: string | null;
  status: InterviewGroupStatus;
};

export type Applicant = {
  firstName: string;
  lastName: string;
};

export type Interviewer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePictureFileId: string | null;
};

const InterviewGroupAPIClient = {
  updateSchedulingLink: async (
    id: string,
    schedulingLink: string,
    status: InterviewGroupStatus,
  ): Promise<InterviewGroup> => {
    return fetchGraphql(mutations.updateInterviewGroup, {
      id,
      status,
      schedulingLink,
    })
      .then((result) => result.data.updateInterviewGroup)
      .catch((e: Error) => {
        throw new Error(
          `Failed to update scheduling link. Cause: ${e.message}`,
        );
      });
  },
  getInterviewGroup: async (id: string): Promise<InterviewGroup> => {
    return fetchGraphql(queries.getInterviewGroup, { id })
      .then((result) => result.data.getInterviewGroup)
      .catch((e: Error) => {
        throw new Error(`Failed to fetch interview group. Cause: ${e.message}`);
      });
  },
  getInterviewersByGroupId: async (groupId: string): Promise<Interviewer[]> => {
    return fetchGraphql(queries.getInterviewersByGroupId, { groupId })
      .then((result) => result.data.getInterviewersByGroupId)
      .catch((e: Error) => {
        throw new Error(`Failed to fetch interviewers. Cause: ${e.message}`);
      });
  },
  getInterviewedApplicantsByGroupId: async (
    groupId: string,
  ): Promise<Applicant[]> => {
    return fetchGraphql(queries.getInterviewedApplicantsByGroupId, { groupId })
      .then((result) => result.data.getInterviewedApplicantsByGroupId)
      .catch((e: Error) => {
        throw new Error(
          `Failed to fetch interviewed applicants. Cause: ${e.message}`,
        );
      });
  },
};

export default InterviewGroupAPIClient;
