import Button from "@components/common/Button";
import { ReviewStage } from "pages/review";
import React, { useMemo } from "react";
import { ReviewSetStageContext } from "./reviewContext";

interface Props {
  currentStage: ReviewStage;
  scores: Map<ReviewStage, number>;
}

type NavigationItemState = "current" | "past" | "future";

export const ReviewStepper: React.FC<Props> = ({ currentStage, scores }) => {
  const buttons = useMemo(
    () => [
      { title: "INFO", index: 1, stage: ReviewStage.INFO },
      { title: "PFSG", index: 2, stage: ReviewStage.PFSG },
      { title: "TP", index: 3, stage: ReviewStage.TP },
      { title: "D2L", index: 4, stage: ReviewStage.D2L },
      { title: "SKL", index: 5, stage: ReviewStage.SKL },
      { title: "END", index: 6, stage: ReviewStage.END },
    ],
    [],
  );

  const getButtonState: (button: {
    stage: ReviewStage;
  }) => NavigationItemState = (button) => {
    if (button.stage === currentStage) {
      return "current";
    }

    const buttonOrder = buttons.filter(
      (b) => b.stage === currentStage || b.stage === button.stage,
    );

    // the current page is before the button
    if (buttonOrder[0].stage === currentStage) {
      return "future";
    } else {
      return "past";
    }
  };

  const currentButtonIndex = useMemo(() => {
    return buttons.filter((b) => b.stage === currentStage)[0].index - 1;
  }, [buttons, currentStage]);

  const getNextStage = () => {
    if (currentButtonIndex < buttons.length) {
      return buttons[currentButtonIndex + 1].stage;
    }

    return ReviewStage.END_SUCCESS;
  };

  const getPreviousStage = () => {
    return buttons[Math.max(currentButtonIndex - 1, 0)].stage;
  };

  const isButtonDisabled = () => {
    if (
      currentStage == ReviewStage.INFO ||
      currentStage == ReviewStage.END_SUCCESS
    ) {
      return false;
    } else if (scores == undefined) {
      return false;
    } else {
      const currScore = scores.get(currentStage);
      if (currScore == undefined) {
        return false;
      } else if (currScore > 0 && currScore <= 5) {
        return false;
      } else {
        return true;
      }
    }
  };

  return (
    <div className="bottom-0 left-0 w-full">
      <div className="bg-sky-100 m-2 p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Stepper Section */}
        <div className="hidden lg:grid lg:grid-flow-col lg:auto-cols-fr gap-2">
          {buttons.map((buttonProps, idx) => (
            <NavigationItem
              {...buttonProps}
              state={getButtonState(buttonProps)}
              containerClassName="px-2 shrink-0"
              key={idx}
            />
          ))}
        </div>

        {/* Buttons Section */}
        <ReviewSetStageContext.Consumer>
          {(setStage) => (
            <div className="flex justify-end items-center gap-2 self-end lg:self-auto">
              {currentButtonIndex > 0 && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setStage?.(getPreviousStage())}
                >
                  Back
                </Button>
              )}
              {currentStage === ReviewStage.END ? (
                <Button
                  size="sm"
                  onClick={() => setStage?.(ReviewStage.END_SUCCESS)}
                >
                  Finish
                </Button>
              ) : (
                <Button
                  size="sm"
                  disabled={isButtonDisabled()}
                  onClick={() => {
                    setStage?.(getNextStage());
                  }}
                >
                  Save & continue
                </Button>
              )}
            </div>
          )}
        </ReviewSetStageContext.Consumer>
      </div>
    </div>
  );
};

interface NavigationItemProps {
  title: string;
  index: number;
  stage: ReviewStage;
  state: NavigationItemState;
  containerClassName: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  title,
  index,
  stage,
  state,
  containerClassName,
}) => {
  const getIconColour = () => {
    switch (state) {
      case "current":
        return "bg-white text-blue border-blue border";
      case "past":
        return "bg-blue text-white";
      case "future":
        return "bg-charcoal-200 text-charcoal-500 border-charcoal-500 border";
    }
  };

  const getTextColour = () => {
    switch (state) {
      case "current":
        return "text-blue";
      default:
        return "";
    }
  };

  return (
    <ReviewSetStageContext.Consumer>
      {(setStage) => (
        <button
          onClick={() => setStage?.(stage)}
          className="hover:cursor-pointer"
          aria-label={`Navigate to page ${index} of review process`}
        >
          <div className={containerClassName}>
            <div className="flex flex-col w-min text-center items-center m-auto">
              <div
                className={`rounded-full relative ${getIconColour()} w-6 h-6`}
              >
                <span className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 text-xs">
                  {index}
                </span>
              </div>
              <span className={`font-semibold ${getTextColour()}`}>
                {title}
              </span>
            </div>
          </div>
        </button>
      )}
    </ReviewSetStageContext.Consumer>
  );
};
