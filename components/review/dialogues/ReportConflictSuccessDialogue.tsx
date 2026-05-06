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
      <div className="flex gap-4 w-full">
        <Button
          variant="primary"
          size="sm"
          onClick={onClose}
          className="flex-1 min-w-0 flex justify-center items-center whitespace-nowrap !m-0"
        >
          <span className="text-[16px] font-normal font-source">
            Back to homepage
          </span>
        </Button>
      </div>
    </Dialogue>
  );
};
