import { DownCaret } from "@components/icons/down-caret.icon";
import { UpCaret } from "@components/icons/up-caret.icon";
import { useTheme } from "@mui/material";
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

export const ReviewScoreInput: React.FC<Props> = ({
  id,
  value,
  min,
  max,
  placeholder,
  ariaLabel,
  onChange,
}) => {
  const theme = useTheme();
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
        background: theme.palette.background.default,
        border: `1px solid ${theme.palette.semantics.border.light}`,
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
          color: theme.palette.text.primary,
          background: theme.palette.background.default,
          fontFeatureSettings: "'liga' off, 'clig' off",
        }}
      />
      <div
        className="flex shrink-0 self-stretch"
        style={{
          background: theme.palette.semantics.border.light,
          width: "1px",
        }}
        aria-hidden
      />
      <div
        className="flex flex-col shrink-0 h-full"
        style={{
          width: "24px",
          background: theme.palette.background.default,
        }}
      >
        <button
          type="button"
          onClick={handleIncrement}
          disabled={!canIncrement}
          aria-label="Increase score"
          className="flex-1 flex items-center justify-center min-h-0 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderBottom: `1px solid ${theme.palette.semantics.border.light}`,
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
            background: theme.palette.background.default,
          }}
        >
          <DownCaret />
        </button>
      </div>
    </div>
  );
};
