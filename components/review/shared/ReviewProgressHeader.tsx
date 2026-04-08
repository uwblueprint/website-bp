import CheckIcon from "@components/icons/check.icon";
import Image from "next/image";
import Link from "next/link";
import { ReviewStage } from "./constants";
import { ReviewSetStageContext } from "./ReviewContext";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";

interface Props {
  currentStage: ReviewStage;
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

const getStepState = (step: StepConfig, currentIndex: number): StepState => {
  const stepIndex = steps.indexOf(step);
  if (stepIndex === currentIndex) return "current";
  if (stepIndex < currentIndex) return "completed";
  return "future";
};

interface StepIndicatorProps {
  step: StepConfig;
  state: StepState;
}

const StepIndicator = ({ step, state }: StepIndicatorProps) => {
  const setStage = useContext(ReviewSetStageContext);
  const theme = useTheme();

  const circleStyleObjects: Record<StepState, React.CSSProperties> = {
    completed: {
      backgroundColor: theme.palette.success.main,
      borderColor: theme.palette.success.main,
    },
    current: {
      backgroundColor: theme.palette.background.default,
      borderColor: theme.palette.primary.contrastText,
    },
    future: {
      backgroundColor: "transparent",
      borderColor: theme.palette.primary.contrastText,
    },
  };

  const numberStyleObjects: Record<StepState, React.CSSProperties> = {
    completed: { color: theme.palette.primary.contrastText },
    current: { color: theme.palette.primary.main, fontWeight: 700 },
    future: { color: theme.palette.primary.contrastText },
  };

  return (
    <button
      onClick={() => setStage?.(step.stage)}
      className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity"
      aria-label={`Navigate to ${step.label} step`}
    >
      <div
        className="w-9 h-9 rounded-full border-2 flex items-center justify-center"
        style={circleStyleObjects[state]}
      >
        {state === "completed" ? (
          <CheckIcon
            className="w-5 h-5"
            style={{ color: theme.palette.primary.contrastText }}
          />
        ) : (
          <span className={`text-sm`} style={numberStyleObjects[state]}>
            {step.index}
          </span>
        )}
      </div>
      <span className="text-white text-xs font-medium uppercase tracking-wide">
        {step.label}
      </span>
    </button>
  );
};

export const ReviewProgressHeader = ({ currentStage }: Props) => {
  const currentIndex = steps.findIndex((s) => s.stage === currentStage);
  const theme = useTheme();

  return (
    <header
      className="w-full"
      style={{ backgroundColor: theme.palette.primary.main }}
    >
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
              state={getStepState(step, currentIndex)}
            />
          ))}
        </div>
      </div>
    </header>
  );
};
