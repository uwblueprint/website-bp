import { FC } from "react";
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import { APPLICATION_TERM } from "@constants/applications";

type Props = {
  readonly onClose: () => void;
};

// they missed the deadline even with the 5 min grace
const DeadlinePassedModal: FC<Props> = ({ onClose }) => (
  <Modal titleId="deadline-passed-title" onDismiss={onClose}>
    <h4 id="deadline-passed-title" className="text-blue-100 mb-4">
      The application window has closed!
    </h4>
    <p className="text-charcoal-500 mb-6">
      We&apos;re no longer accepting applications for the {APPLICATION_TERM}{" "}
      team, so this application can&apos;t be submitted. Thank you for your
      interest in joining us!
    </p>
    <Button type="button" variant="primary" onClick={onClose}>
      Close
    </Button>
  </Modal>
);

export default DeadlinePassedModal;
