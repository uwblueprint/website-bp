export const InterviewGroupStatusEnum = {
  READY_TO_INTERVIEW: "Ready to Interview",
  INVITES_SENT: "Invites Sent",
  AVAILABILITY_PENDING: "Availability Pending",
} as const;

export type InterviewGroupStatus =
  typeof InterviewGroupStatusEnum[keyof typeof InterviewGroupStatusEnum];

export type InterviewGroupDTO = {
  id: string;
  schedulingLink?: string;
  status: InterviewGroupStatus;
};

export type UpdateInterviewGroupDTO = Omit<InterviewGroupDTO, "id">;
