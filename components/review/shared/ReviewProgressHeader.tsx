import CheckIcon from "@components/icons/check.icon";
import Image from "next/image";
import Link from "next/link";
import { ReactElement, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { ReviewStage } from "./constants";
import { ReviewSetStageContext } from "./ReviewContext";
import { ReviewScores } from "./types";
import { getMaxAccessibleStageIndex } from "./reviewUtils";

interface Props {
  currentStage: ReviewStage;
  scores?: ReviewScores;
  allCompleted?: boolean;
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
  canNavigate: boolean;
}

const StepIndicator = ({
  step,
  state,
  canNavigate,
}: StepIndicatorProps): ReactElement => {
  const setStage = useContext(ReviewSetStageContext);
  const theme = useTheme();

  const circleStyleObjects: Record<StepState, React.CSSProperties> = {
    completed: {
      backgroundColor: theme.palette.success.main,
      borderColor: theme.palette.success.main,
    },
    current: {
      backgroundColor: theme.palette.background.default,
      borderColor: theme.palette.background.default,
    },
    future: {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.contrastText,
    },
  };

  const numberStyleObjects: Record<StepState, React.CSSProperties> = {
    completed: { color: theme.palette.primary.contrastText, fontWeight: 700 },
    current: { color: theme.palette.primary.main, fontWeight: 700 },
    future: { color: theme.palette.primary.contrastText, fontWeight: 700 },
  };

  return (
    <button
      type="button"
      disabled={!canNavigate}
      onClick={() => {
        if (!canNavigate) {
          return;
        }

        setStage?.(step.stage);
      }}
      className={`flex flex-col items-center gap-1 transition-opacity ${
        canNavigate ? "hover:opacity-80" : "cursor-default"
      }`}
      aria-label={`Navigate to ${step.label} step`}
    >
      <div
        className="flex h-8 w-8 items-center justify-center rounded-full border-2"
        style={circleStyleObjects[state]}
      >
        {state === "completed" ? (
          <CheckIcon className="h-4 w-4 text-white" />
        ) : (
          <span
            className="text-[11px] font-poppins"
            style={numberStyleObjects[state]}
          >
            {step.index}
          </span>
        )}
      </div>
      <span className="font-poppins text-[15px] font-medium uppercase leading-[1.4] text-white">
        {step.label}
      </span>
    </button>
  );
};

export const ReviewProgressHeader = ({
  currentStage,
  scores,
  allCompleted = false,
}: Props): ReactElement => {
  const currentIndex = allCompleted
    ? steps.length
    : Math.max(
        steps.findIndex((step) => step.stage === currentStage),
        0,
      );
  const maxAccessibleIndex =
    allCompleted || !scores
      ? steps.length - 1
      : getMaxAccessibleStageIndex(scores);
  const theme = useTheme();

  return (
    <header
      className="w-full"
      style={{ backgroundColor: theme.palette.primary.main }}
    >
      <div className="flex min-h-[78px] w-full items-center justify-between px-6 py-3 md:px-9">
        <Link href="/admin">
          <a className="flex">
            <Image
              src="/common/logo-with-text.svg"
              alt="Blueprint Logo"
              width={206}
              height={41}
              className="cursor-pointer"
            />
          </a>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {steps.map((step) => (
            <StepIndicator
              key={step.index}
              step={step}
              state={getStepState(step, currentIndex)}
              canNavigate={steps.indexOf(step) <= maxAccessibleIndex}
            />
          ))}
        </div>
      </div>
    </header>
  );
};
