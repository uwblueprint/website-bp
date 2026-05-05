import Button from "@components/common/Button";
import { Dialogue } from "@components/common/Dialogue";

type ReportConflictSuccessDialogueProps = {
  open: boolean;
  onClose: () => void;
};

export const ReportConflictSuccessDialogue = ({
  open,
  onClose,
}: ReportConflictSuccessDialogueProps) => {
  return (
    <Dialogue
      open={open}
      onClose={onClose}
      header="Conflict reported!"
      text="This applicant has been reported as a conflict of interest and will be re-assigned to another reviewer."
    >
      <Button
        variant="primary"
        size="md"
        onClick={onClose}
        className="whitespace-nowrap"
      >
        Back to homepage
      </Button>
    </Dialogue>
  );
};
