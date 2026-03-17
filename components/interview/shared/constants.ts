import { NavItem } from "./types";

export enum InterviewStep {
  PROFILE = "PROFILE",
  SCHEDULE = "SCHEDULE",
  ASSESSMENT = "ASSESSMENT",
  REPORT = "REPORT",
}

export const INTERVIEW_NAV_ITEMS: NavItem[] = [
  { label: "Applicant Profile", step: InterviewStep.PROFILE, path: "/interview/profile" },
  { label: "Schedule Interview", step: InterviewStep.SCHEDULE, path: "/interview/schedule" },
  { label: "Interview Assessment", step: InterviewStep.ASSESSMENT, path: "/interview/assessment" },
  { label: "Report Issues", step: InterviewStep.REPORT, path: "/interview/report" },
];
