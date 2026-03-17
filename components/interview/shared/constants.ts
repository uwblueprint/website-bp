import { NavItem, HeaderStepConfig } from "./types";

export enum InterviewStep {
  PROFILE = "PROFILE",
  SCHEDULE = "SCHEDULE",
  ASSESSMENT = "ASSESSMENT",
  REPORT = "REPORT",
}

export const InterviewHeaderStep = {
  INFO: "INFO",
  SCORING: "SCORING",
  COMMENTS: "COMMENTS",
} as const;

export type InterviewHeaderStep =
  typeof InterviewHeaderStep[keyof typeof InterviewHeaderStep];

export const INTERVIEW_NAV_ITEMS: NavItem[] = [
  {
    label: "Applicant Profile",
    step: InterviewStep.PROFILE,
    path: "/interview/profile",
  },
  {
    label: "Schedule Interview",
    step: InterviewStep.SCHEDULE,
    path: "/interview/schedule",
  },
  {
    label: "Interview Assessment",
    step: InterviewStep.ASSESSMENT,
    path: "/interview/assessment",
  },
  {
    label: "Report Issues",
    step: InterviewStep.REPORT,
    path: "/interview/report",
  },
];

export const PROFILE_HEADER_STEPS: HeaderStepConfig[] = [
  { step: InterviewHeaderStep.INFO, label: "INFO", index: 1 },
  { step: InterviewHeaderStep.SCORING, label: "SCORING", index: 2 },
  { step: InterviewHeaderStep.COMMENTS, label: "COMMENTS", index: 3 },
];

// Header steps for the Interview Assessment page
export const ASSESSMENT_HEADER_STEPS: HeaderStepConfig[] = [
  { step: "SCORES", label: "SCORES", index: 1 },
  { step: "NOTES", label: "NOTES", index: 2 },
];
