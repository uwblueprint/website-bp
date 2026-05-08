import type { InterviewStep } from "./constants";

type NavItem = {
  label: string;
  step: InterviewStep;
  path: string;
};

type HeaderStepConfig = {
  step: string;
  label: string;
  index: number;
};

type StepStatus = "not_started" | "in_progress" | "completed";

type InterviewProgressState = {
  currentStep: InterviewStep;
  stepStatuses: Record<InterviewStep, StepStatus>;
  updateStepStatus: (step: InterviewStep, status: StepStatus) => void;
  currentSubStep: string | null;
  setCurrentSubStep: (subStep: string | null) => void;
};

export type { NavItem, HeaderStepConfig, StepStatus, InterviewProgressState };
