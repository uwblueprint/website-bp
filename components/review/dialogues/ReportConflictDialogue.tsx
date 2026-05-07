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
      <div className="flex gap-4 w-full">
        <Button
          variant="secondary"
          size="sm"
          onClick={onClose}
          className="flex-1 min-w-0 flex justify-center items-center whitespace-nowrap !m-0"
        >
          <span className="text-[16px] font-normal font-source">Cancel</span>
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={onConfirm}
          className="flex-1 min-w-0 flex justify-center items-center whitespace-nowrap !m-0"
        >
          <span className="text-[16px] font-normal font-source">
            Yes, report
          </span>
        </Button>
      </div>
    </Dialogue>
  );
};
