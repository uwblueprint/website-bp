import { InterviewStep, InterviewHeaderStep } from "./constants";

type NavItem = {
  label: string;
  step: InterviewStep;
  path: string;
};

// NOTE: Same shape as StepConfig in ReviewProgressHeader (review/shared/ReviewProgressHeader.tsx)
// but references InterviewHeaderStep instead of ReviewStage.
type HeaderStepConfig = {
  step: InterviewHeaderStep;
  label: string;
  index: number;
};

type StepStatus = "not_started" | "in_progress" | "completed";

type InterviewProgressState = {
  currentStep: InterviewStep;
  stepStatuses: Record<InterviewStep, StepStatus>;
  updateStepStatus: (step: InterviewStep, status: StepStatus) => void;
};

export type { NavItem, HeaderStepConfig, StepStatus, InterviewProgressState };
