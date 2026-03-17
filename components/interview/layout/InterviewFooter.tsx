import Button from "@components/common/Button";

interface InterviewFooterProps {
  // Only shown if provided.
  onBack?: () => void;
  backLabel?: string;
  // Only shown if provided.
  onContinue?: () => void;
  continueLabel?: string;
}

// NOTE: Follows the same button layout pattern as ReviewStepper (review/shared/ReviewStepper.tsx) —
// flex justify-end with sm secondary/primary button pair — but with interview-specific behavior.
// Duplicated to keep the two flows decoupled.
//
// Each page controls which buttons appear and what they do by passing props via getInterviewLayout.
// Pages with sub-step navigation (e.g. profile INFO → SCORING → COMMENTS) will need to manage
// their own footer state and pass updated props as the user progresses.
export const InterviewFooter = ({
  onBack,
  backLabel = "Back to home",
  onContinue,
  continueLabel = "Continue",
}: InterviewFooterProps) => {
  return (
    <div className="w-full bg-white px-6 py-3">
      <div className="flex items-center justify-end gap-3">
        {onBack && (
          <Button size="sm" variant="secondary" onClick={onBack}>
            {backLabel}
          </Button>
        )}
        {onContinue && (
          <Button size="sm" onClick={onContinue}>
            {continueLabel}
          </Button>
        )}
      </div>
    </div>
  );
};
