import Button from "@components/common/Button";
import { Dialogue } from "@components/common/Dialogue";

type ConflictDialogueProps = {
  open: boolean;
  hasError: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const ReportConflictDialogue = ({
  open,
  hasError,
  onClose,
  onConfirm,
}: ConflictDialogueProps) => {
  return (
    <Dialogue
      open={open}
      onClose={onClose}
      header="Report as conflict of interest?"
      text="Clicking yes will notify admins and cannot be undone."
      errorText={
        hasError
          ? "An error occurred while reporting. Please try again."
          : undefined
      }
    >
      <Button
        variant="secondary"
        size="md"
        onClick={onClose}
        className="whitespace-nowrap"
      >
        Cancel
      </Button>
      <Button
        variant="primary"
        size="md"
        onClick={onConfirm}
        className="whitespace-nowrap"
      >
        Yes, report
      </Button>
    </Dialogue>
  );
};
