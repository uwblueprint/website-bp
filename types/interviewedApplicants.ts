export const InterviewStatusEnum = {
  NEEDS_REVIEW: "Need Review",
  IN_PROGRESS: "In Progress",
  COMPLETE: "Complete",
} as const;

export type InterviewStatus =
  typeof InterviewStatusEnum[keyof typeof InterviewStatusEnum];
