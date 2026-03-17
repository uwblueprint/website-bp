import { createContext, ReactNode, useContext, useState } from "react";
import { useRouter } from "next/router";
import { InterviewStep, INTERVIEW_NAV_ITEMS } from "./constants";
import { InterviewProgressState, StepStatus } from "./types";

export const InterviewProgressContext =
  createContext<InterviewProgressState | null>(null);

const PATH_TO_STEP = INTERVIEW_NAV_ITEMS.reduce<Record<string, InterviewStep>>(
  (acc, item) => {
    acc[item.path] = item.step;
    return acc;
  },
  {},
);

const INITIAL_STATUSES: Record<InterviewStep, StepStatus> = {
  [InterviewStep.PROFILE]: "not_started",
  [InterviewStep.SCHEDULE]: "not_started",
  [InterviewStep.ASSESSMENT]: "not_started",
  [InterviewStep.REPORT]: "not_started",
};

interface InterviewProgressProviderProps {
  children: ReactNode;
}

export const InterviewProgressProvider = ({
  children,
}: InterviewProgressProviderProps) => {
  const router = useRouter();
  const [stepStatuses, setStepStatuses] = useState(INITIAL_STATUSES);
  const [subStepsBySection, setSubStepsBySection] = useState<
    Record<InterviewStep, string | null>
  >({
    [InterviewStep.PROFILE]: null,
    [InterviewStep.SCHEDULE]: null,
    [InterviewStep.ASSESSMENT]: null,
    [InterviewStep.REPORT]: null,
  });

  const currentStep = PATH_TO_STEP[router.pathname] ?? InterviewStep.PROFILE;

  // Derive current sub-step from the section-keyed map — no reset needed on navigation
  // since each section has its own slot. Navigating away and back preserves sub-step state.
  const currentSubStep = subStepsBySection[currentStep];

  const setCurrentSubStep = (subStep: string | null) => {
    setSubStepsBySection((prev) => ({ ...prev, [currentStep]: subStep }));
  };

  const updateStepStatus = (step: InterviewStep, status: StepStatus) => {
    setStepStatuses((prev) => ({ ...prev, [step]: status }));
  };

  return (
    <InterviewProgressContext.Provider
      value={{
        currentStep,
        stepStatuses,
        updateStepStatus,
        currentSubStep,
        setCurrentSubStep,
      }}
    >
      {children}
    </InterviewProgressContext.Provider>
  );
};

export const useInterviewProgress = (): InterviewProgressState => {
  const context = useContext(InterviewProgressContext);
  if (!context) {
    throw new Error(
      "useInterviewProgress must be used within an InterviewProgressProvider",
    );
  }
  return context;
};
