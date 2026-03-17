import { InterviewStep } from "./constants";

type NavItem = {
  label: string;
  step: InterviewStep;
  path: string;
};

type StepStatus = "not_started" | "in_progress" | "completed";

type InterviewProgressState = {
  currentStep: InterviewStep;
  stepStatuses: Record<InterviewStep, StepStatus>;
  updateStepStatus: (step: InterviewStep, status: StepStatus) => void;
};

export type { NavItem, StepStatus, InterviewProgressState };
