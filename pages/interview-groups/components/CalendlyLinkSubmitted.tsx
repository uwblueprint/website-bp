import { EditIcon } from "@components/icons/edit.icon";
import CheckCircleIcon from "@components/icons/check-circle.icon";

type CalendlyLinkSubmittedProps = {
  linkInput: string;
  onLinkChange: (value: string) => void;
  isEditing: boolean;
  onEdit: () => void;
  onResubmit: () => void;
};

const CalendlyLinkSubmitted = ({
  linkInput,
  onLinkChange,
  isEditing,
  onEdit,
  onResubmit,
}: CalendlyLinkSubmittedProps) => (
  <div className="flex gap-4 border border-[#C4C4C4] rounded-lg py-6 pr-6 pl-4">
    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#00A403] text-white shrink-0">
      <CheckCircleIcon />
    </div>
    <div className="flex flex-col gap-8 flex-1">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <p className="font-poppins font-medium text-xl text-[#00A403] leading-[1.4]">
            Link submitted!
          </p>
          <p className="font-source text-base text-black/75 leading-[1.4]">
            If you would like to re-submit your Calendly link press the edit
            icon below.
          </p>
        </div>
        {isEditing ? (
          <input
            type="text"
            value={linkInput}
            onChange={(e) => onLinkChange(e.target.value)}
            className="w-full border border-[#7D7D7D] rounded-[5px] py-[10px] px-5 text-sm text-charcoal-400 font-normal leading-[1.43] outline-none focus:border-blue"
          />
        ) : (
          <div className="flex items-center gap-[10px] border border-[#7D7D7D] rounded-[5px] py-[10px] px-5">
            <span className="flex-1 text-sm text-[#3279B7] font-normal leading-[1.43] truncate">
              {linkInput}
            </span>
            <button
              onClick={onEdit}
              className="shrink-0 hover:opacity-70"
              aria-label="Edit link"
            >
              <EditIcon />
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <button
          disabled={!isEditing || !linkInput}
          onClick={onResubmit}
          className={`rounded-full py-2 px-4 bg-blue text-white font-source text-base font-normal leading-[1.4] ${
            !isEditing || !linkInput
              ? "opacity-50 cursor-not-allowed"
              : "hover:opacity-90"
          }`}
        >
          Re-submit link
        </button>
      </div>
    </div>
  </div>
);

export default CalendlyLinkSubmitted;
