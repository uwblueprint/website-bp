import Button from "@components/common/Button";

interface InterviewFooterProps {
  // Only shown if provided.
  onBack?: () => void;
  backLabel?: string;
  // Only shown if provided.
  onContinue?: () => void;
  continueLabel?: string;
}

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
