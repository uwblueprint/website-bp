export const InterviewGroupStatusEnum = {
  READY_TO_INTERVIEW: "Ready to Interview",
  INVITES_SENT: "Invites Sent",
  AVAILABILITY_PENDING: "Availability Pending",
} as const;

export type InterviewGroupStatus =
  typeof InterviewGroupStatusEnum[keyof typeof InterviewGroupStatusEnum];

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
