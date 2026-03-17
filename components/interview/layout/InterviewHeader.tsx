import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import {
  InterviewHeaderStep,
  INTERVIEW_HEADER_STEPS,
} from "../shared/constants";

interface InterviewHeaderProps {
  currentStep?: InterviewHeaderStep;
}

// NOTE: Follows the same structure as ReviewProgressHeader (review/shared/ReviewProgressHeader.tsx) —
// blue bar + logo + numbered step circles — but with interview-specific steps (INFO/SCORING/COMMENTS)
// and without the completed/future states or CheckIcon. Duplicated to keep the two flows decoupled.
// Could be extracted into a shared header component if both flows stay visually identical.
export const InterviewHeader = ({
  currentStep = InterviewHeaderStep.INFO,
}: InterviewHeaderProps) => {
  const theme = useTheme();

  return (
    <header
      className="w-full"
      style={{ backgroundColor: theme.palette.primary.main }}
    >
      <div className="flex items-center justify-between px-9 py-4">
        <Link href="/admin">
          <a>
            <Image
              src="/common/logo-with-text.svg"
              alt="Blueprint Logo"
              width={206}
              height={41}
            />
          </a>
        </Link>

        <div className="flex items-center gap-9">
          {INTERVIEW_HEADER_STEPS.map(({ step, label, index }) => {
            const active = step === currentStep;
            return (
              <div key={step} className="flex flex-col items-center gap-1">
                <div
                  className="w-9 h-9 rounded-full border-2 flex items-center justify-center"
                  style={{
                    backgroundColor: active
                      ? theme.palette.background.default
                      : "transparent",
                    borderColor: theme.palette.primary.contrastText,
                  }}
                >
                  <span
                    className="text-sm font-medium"
                    style={{
                      color: active
                        ? theme.palette.primary.main
                        : theme.palette.primary.contrastText,
                    }}
                  >
                    {index}
                  </span>
                </div>
                <span className="text-xs font-medium uppercase tracking-wide text-white">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
};
