import { InterviewStep } from "./constants";

type NavItem = {
  label: string;
  step: InterviewStep;
  path: string;
};

// NOTE: Same shape as StepConfig in ReviewProgressHeader (review/shared/ReviewProgressHeader.tsx).
// step is a string so any page can define its own step values without being locked to a single enum.
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
  // Sub-step tracking: keyed by nav section so each section has its own slot.
  // currentSubStep is derived from the current section's slot — no reset needed on navigation.
  // See pages/interview/assessment.tsx for a full usage example.
  currentSubStep: string | null;
  setCurrentSubStep: (subStep: string | null) => void;
};

export type { NavItem, HeaderStepConfig, StepStatus, InterviewProgressState };
