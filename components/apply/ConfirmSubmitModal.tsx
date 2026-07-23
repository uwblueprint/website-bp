import { FC } from "react";
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";

type Props = {
  readonly submitting: boolean;
  readonly onConfirm: () => void;
  readonly onCancel: () => void;
};

// user confirms they're ready to submit
const ConfirmSubmitModal: FC<Props> = ({ submitting, onConfirm, onCancel }) => (
  <Modal
    titleId="confirm-submit-title"
    onDismiss={submitting ? undefined : onCancel}
  >
    <h4 id="confirm-submit-title" className="text-blue-100 mb-4 font-semibold">
      Ready to submit?
    </h4>
    <p className="text-charcoal-500 mb-6">
      You won&apos;t be able to edit your application after submitting. Make
      sure you've double-checked everything!
    </p>
    <div className="flex justify-center gap-4">
      <Button
        type="button"
        variant="secondary"
        onClick={onCancel}
        disabled={submitting}
      >
        Keep editing
      </Button>
      <Button
        type="button"
        variant="primary"
        onClick={onConfirm}
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Looks good!"}
      </Button>
    </div>
  </Modal>
);

export default ConfirmSubmitModal;
