import Button from "@components/common/Button";
import CheckIcon from "@components/icons/check.icon";
import WarningIcon from "@components/icons/warning.icon";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ReviewStage } from "./constants";
import { ReviewSetStageContext } from "./reviewContext";

interface Props {
  currentStage: ReviewStage;
  onConflictClick?: () => void;
}

type StepState = "current" | "completed" | "future";

interface StepConfig {
  label: string;
  index: number;
  stage: ReviewStage;
}

const steps: StepConfig[] = [
  { label: "Info", index: 1, stage: ReviewStage.INFO },
  { label: "PFSG", index: 2, stage: ReviewStage.PFSG },
  { label: "TEAM", index: 3, stage: ReviewStage.TP },
  { label: "LEARN", index: 4, stage: ReviewStage.D2L },
  { label: "SKILL", index: 5, stage: ReviewStage.SKL },
  { label: "END", index: 6, stage: ReviewStage.END },
];

export const ReviewProgressHeader: React.FC<Props> = ({
  currentStage,
  onConflictClick,
}) => {
  const getStepState = (step: StepConfig): StepState => {
    if (step.stage === currentStage) {
      return "current";
    }

    const currentIndex = steps.findIndex((s) => s.stage === currentStage);
    const stepIndex = steps.findIndex((s) => s.stage === step.stage);

    if (stepIndex < currentIndex) {
      return "completed";
    }
    return "future";
  };

  return (
    <header className="bg-blue w-full">
      <div className="flex items-center justify-between px-9 py-4 w-full">
        {/* Left side - Logo */}
        <Link href="/admin">
          <Image
            src="/common/logo-with-text.svg"
            alt="Blueprint Logo"
            width={206}
            height={41}
            className="cursor-pointer"
          />
        </Link>

        {/* Right side - Progress Stepper */}
        <div className="hidden md:flex items-center gap-9">
          {steps.map((step) => (
            <StepIndicator
              key={step.index}
              step={step}
              state={getStepState(step)}
            />
          ))}
        </div>
      </div>

      {/* Secondary bar with actions */}
      <div className="bg-white px-6 py-3 flex items-center justify-between border-b border-gray-200">
        <Link href="/admin">
          <Button variant="secondary" size="sm">
            <span className="flex items-center gap-2">
              <span>&larr;</span>
              <span>Back to home</span>
            </span>
          </Button>
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-blue text-sm hidden sm:inline">
            Is the applicant a conflict of interest?
          </span>
          {onConflictClick && (
            <Button variant="secondary" size="sm" onClick={onConflictClick}>
              <div className="flex items-center gap-2">
                <WarningIcon />
                <span>Report</span>
              </div>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

interface StepIndicatorProps {
  step: StepConfig;
  state: StepState;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ step, state }) => {
  const getCircleStyles = (): string => {
    switch (state) {
      case "completed":
        return "bg-success border-success";
      case "current":
        return "bg-white border-white";
      case "future":
        return "bg-transparent border-white/60";
    }
  };

  const getNumberStyles = (): string => {
    switch (state) {
      case "completed":
        return "text-white";
      case "current":
        return "text-blue font-bold";
      case "future":
        return "text-white/80";
    }
  };

  return (
    <ReviewSetStageContext.Consumer>
      {(setStage) => (
        <button
          onClick={() => setStage?.(step.stage)}
          className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity"
          aria-label={`Navigate to ${step.label} step`}
        >
          <div
            className={`w-9 h-9 rounded-full border-2 flex items-center justify-center ${getCircleStyles()}`}
          >
            {state === "completed" ? (
              <CheckIcon className="w-5 h-5 text-white" />
            ) : (
              <span className={`text-sm ${getNumberStyles()}`}>
                {step.index}
              </span>
            )}
          </div>
          <span className="text-white text-xs font-medium uppercase tracking-wide">
            {step.label}
          </span>
        </button>
      )}
    </ReviewSetStageContext.Consumer>
  );
};

export default ReviewProgressHeader;
