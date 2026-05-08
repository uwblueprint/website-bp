type CalendlyLinkFormProps = {
  linkInput: string;
  onLinkChange: (value: string) => void;
  onSubmit: () => void;
};

const CalendlyLinkForm = ({
  linkInput,
  onLinkChange,
  onSubmit,
}: CalendlyLinkFormProps) => (
  <div className="flex flex-col gap-8 border border-[#C4C4C4] rounded-lg p-6">
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="font-poppins font-medium text-xl text-blue leading-[1.4]">
          Paste Calendly link below
        </p>
        <p className="font-source text-base text-black/75 leading-[1.4]">
          Paste your completed Calendly link here below. This link will be used
          by Admins to send out to your interviewees.
        </p>
      </div>
      <input
        type="text"
        placeholder="Paste link here"
        value={linkInput}
        onChange={(e) => onLinkChange(e.target.value)}
        className="w-full border border-[#7D7D7D] rounded-[5px] py-[10px] px-5 text-sm text-charcoal-400 font-normal leading-[1.43] outline-none focus:border-blue"
      />
    </div>
    <div className="flex justify-end">
      <button
        disabled={!linkInput}
        onClick={onSubmit}
        className={`rounded-full py-2 px-4 bg-blue text-white font-source text-base font-normal leading-[1.4] ${
          !linkInput ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
        }`}
      >
        Submit Link
      </button>
    </div>
  </div>
);

export default CalendlyLinkForm;
