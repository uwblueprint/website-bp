import { ValueOf } from "next/dist/shared/lib/constants";

export type ShortQuestionAnswer = {
  question: string;
  response?: string | null;
};

export type ApplicationDTO = {
  id: number;
  academicOrCoop: string;
  academicYear: string;
  email: string;
  firstChoiceRole: string;
  firstName: string;
  heardFrom: string;
  lastName: string;
  locationPreference: string;
  program: string;
  pronouns: string;
  pronounsSpecified: string;
  resumeUrl: string;
  roleSpecificQuestions: string[];
  secondChoiceRole: string;
  shortQuestionAnswers: ShortQuestionAnswer[];
  status: string;
  secondChoiceStatus: string;
  term: string;
  timesApplied: string;
  timestamp: bigint;
  comments?: string;
  skillsCategory?: string;
};

export type ReviewedApplicantRecordDTO = {
  applicantRecordId: string;
  reviewerId: number;
  review: Review;
  status: ReviewStatus;
  score?: number | null;
  reviewerHasConflict: boolean;
};

export const ReviewStatusEnum = {
  TODO: "Todo",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
  CONFLICT: "Conflict",
} as const;

export const SkillCategoryEnum = {
  JUNIOR: "Junior",
  INTERMEDIATE: "Intermediate",
  SENIOR: "Senior",
} as const;

export type SkillCategory = ValueOf<typeof SkillCategoryEnum>;

export type ReviewStatus = ValueOf<typeof ReviewStatusEnum>;

export type Review = {
  passionFSG?: number;
  teamPlayer?: number;
  desireToLearn?: number;
  skill?: number;
  skillCategory?: SkillCategory;
  comments?: string;
};
