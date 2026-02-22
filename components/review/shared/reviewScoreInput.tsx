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

/** Up caret - per Figma: 10×6.25px, fill #2D3748 */
const UpCaret = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="6.25"
    viewBox="0 0 9 6"
    fill="none"
    aria-hidden
  >
    <path
      d="M4.07001 0.18775C4.27018 -0.0624531 4.65072 -0.0624533 4.85088 0.18775L8.81057 5.13736C9.07248 5.46474 8.83939 5.94971 8.42014 5.94971H0.500762C0.0815088 5.94971 -0.151578 5.46474 0.110327 5.13736L4.07001 0.18775Z"
      fill="#2D3748"
    />
  </svg>
);

/** Down caret - mirrored up caret */
const DownCaret = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="6.25"
    viewBox="0 0 9 6"
    fill="none"
    aria-hidden
    style={{ transform: "rotate(180deg)" }}
  >
    <path
      d="M4.07001 0.18775C4.27018 -0.0624531 4.65072 -0.0624533 4.85088 0.18775L8.81057 5.13736C9.07248 5.46474 8.83939 5.94971 8.42014 5.94971H0.500762C0.0815088 5.94971 -0.151578 5.46474 0.110327 5.13736L4.07001 0.18775Z"
      fill="#2D3748"
    />
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
      onChange(0);
      return;
    }
    const n = parseInt(raw, 10);
    if (!Number.isNaN(n)) {
      onChange(Math.min(max, Math.max(min, n)));
    }
  };

  const handleIncrement = () => {
    const next = Number.isNaN(numericValue)
      ? min
      : Math.min(max, numericValue + 1);
    onChange(next);
  };

  const handleDecrement = () => {
    const next = Number.isNaN(numericValue)
      ? max
      : Math.max(min, numericValue - 1);
    onChange(next);
  };

  return (
    <div
      className="flex items-center font-source overflow-hidden focus-within:ring-2 focus-within:ring-blue/20 shrink-0"
      role="group"
      style={{
        width: "280px",
        height: "48px",
        background: "#FFFFFF",
        border: "1px solid #C4C4C4",
        borderRadius: "8px",
      }}
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
        className="h-full flex-1 min-w-0 border-0 focus:outline-none placeholder:text-[#2D3748] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        style={{
          alignSelf: "stretch",
          padding: "0 20px",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "140%",
          color: "#252525",
          background: "#FFFFFF",
          fontFeatureSettings: "'liga' off, 'clig' off",
        }}
      />
      <div
        className="flex shrink-0 self-stretch"
        style={{ background: "#C4C4C4", width: "1px" }}
        aria-hidden
      />
      <div
        className="flex flex-col shrink-0 h-full"
        style={{
          width: "24px",
          background: "#FFFFFF",
        }}
      >
        <button
          type="button"
          onClick={handleIncrement}
          disabled={!canIncrement}
          aria-label="Increase score"
          className="flex-1 flex items-center justify-center min-h-0 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: "#FFFFFF",
            color: "#252525",
            borderBottom: "1px solid #C4C4C4",
          }}
        >
          <UpCaret />
        </button>
        <button
          type="button"
          onClick={handleDecrement}
          disabled={!canDecrement}
          aria-label="Decrease score"
          className="flex-1 flex items-center justify-center min-h-0 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: "#FFFFFF",
          }}
        >
          <DownCaret />
        </button>
      </div>
    </div>
  );
};
