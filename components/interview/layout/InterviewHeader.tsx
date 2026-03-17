import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { PROFILE_HEADER_STEPS } from "../shared/constants";
import { InterviewProgressContext } from "../shared/InterviewProgressContext";

interface HeaderStep {
  step: string;
  label: string;
  index: number;
}

interface InterviewHeaderProps {
  steps?: HeaderStep[];
  currentStep?: string;
}

export const InterviewHeader = ({
  steps = PROFILE_HEADER_STEPS,
  currentStep = steps[0]?.step,
}: InterviewHeaderProps) => {
  const { palette } = useTheme();
  const { primary, background } = palette;
  const progressContext = useContext(InterviewProgressContext);
  const activeStep = progressContext?.currentSubStep ?? currentStep;

  return (
    <header className="w-full" style={{ backgroundColor: primary.main }}>
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
          {steps.map(({ step, label, index }) => {
            const active = step === activeStep;
            return (
              <div key={step} className="flex flex-col items-center gap-1">
                <div
                  className="w-9 h-9 rounded-full border-2 flex items-center justify-center"
                  style={{
                    backgroundColor: active
                      ? background.default
                      : "transparent",
                    borderColor: primary.contrastText,
                  }}
                >
                  <span
                    className="text-sm font-medium"
                    style={{
                      color: active ? primary.main : primary.contrastText,
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
