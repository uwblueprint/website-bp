import React from "react";

interface Props {
  id: string;
  value: number | "";
  min: number;
  max: number;
  placeholder: string;
  ariaLabel: string;
  onChange: (value: number) => void;
}

/** Up caret for increment button */
const UpCaret: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={className} aria-hidden>
    <path d="M6 3L10 9H2L6 3Z" fill="currentColor" />
  </svg>
);

/** Down caret for decrement button */
const DownCaret: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={className} aria-hidden>
    <path d="M6 9L2 3H10L6 9Z" fill="currentColor" />
  </svg>
);

export const ReviewScoreInput: React.FC<Props> = ({
  id,
  value,
  min,
  max,
  placeholder,
  ariaLabel,
  onChange,
}) => {
  const numericValue = value === "" ? NaN : value;
  const canIncrement = Number.isNaN(numericValue) || numericValue < max;
  const canDecrement = Number.isNaN(numericValue) || numericValue > min;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "") {
      onChange(min);
      return;
    }
    const n = parseInt(raw, 10);
    if (!Number.isNaN(n)) {
      onChange(Math.min(max, Math.max(min, n)));
    }
  };

  const handleIncrement = () => {
    const next = Number.isNaN(numericValue) ? min : Math.min(max, numericValue + 1);
    onChange(next);
  };

  const handleDecrement = () => {
    const next = Number.isNaN(numericValue) ? max : Math.max(min, numericValue - 1);
    onChange(next);
  };

  return (
    <div
      className="inline-flex h-12 w-full max-w-[200px] bg-white border border-charcoal-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue/20 focus-within:border-blue"
      role="group"
    >
      <input
        id={id}
        type="number"
        min={min}
        max={max}
        placeholder={placeholder}
        aria-label={ariaLabel}
        value={value === "" ? "" : value}
        onChange={handleInputChange}
        className="h-full flex-1 min-w-0 border-0 px-4 text-[16px] font-normal text-charcoal-700 placeholder:text-charcoal-400 bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <div
        className="flex shrink-0 w-px bg-[#C4C4C4]"
        aria-hidden
      />
      <div className="flex flex-col shrink-0 w-10 bg-charcoal-100 border-l border-charcoal-200">
        <button
          type="button"
          onClick={handleIncrement}
          disabled={!canIncrement}
          aria-label="Increase score"
          className="flex-1 flex items-center justify-center min-h-[22px] text-charcoal-600 hover:bg-charcoal-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-charcoal-100 border-b border-charcoal-200"
        >
          <UpCaret />
        </button>
        <button
          type="button"
          onClick={handleDecrement}
          disabled={!canDecrement}
          aria-label="Decrease score"
          className="flex-1 flex items-center justify-center min-h-[22px] text-charcoal-600 hover:bg-charcoal-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-charcoal-100"
        >
          <DownCaret />
        </button>
      </div>
    </div>
  );
};
