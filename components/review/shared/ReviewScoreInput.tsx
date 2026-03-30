import { UpCaret } from "@components/icons/up-caret.icon";
import { useTheme } from "@mui/material/styles";
import React, { ReactElement } from "react";

interface Props {
  id: string;
  value: number | "";
  min: number;
  max: number;
  placeholder: string;
  ariaLabel: string;
  onChange: (value: number) => void;
}

export function ReviewScoreInput({
  id,
  value,
  min,
  max,
  placeholder,
  ariaLabel,
  onChange,
}: Props): ReactElement {
  const numericValue = value === "" ? NaN : value;
  const canIncrement = Number.isNaN(numericValue) || numericValue < max;
  const canDecrement = Number.isNaN(numericValue) || numericValue > min;
  const theme = useTheme();

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
      className="flex items-center font-source overflow-hidden focus-within:ring-2 focus-within:ring-blue/20 shrink-0 w-[280px] h-12 rounded-[8px]"
      role="group"
      style={{
        background: theme.palette.background.default,
        border: `1px solid ${theme.palette.semantics.border.light}`,
      }}
    >
      <input
        id={id}
        type="number"
        min={min}
        max={max}
        placeholder={placeholder}
        aria-label={ariaLabel}
        value={value}
        onChange={handleInputChange}
        className="h-full flex-1 min-w-0 border-0 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none self-stretch px-5 font-normal text-base"
        style={{
          color: theme.palette.text.primary,
          background: theme.palette.background.default,
        }}
      />
      <div
        className="flex shrink-0 self-stretch w-[1px]"
        style={{
          background: theme.palette.semantics.border.light,
        }}
        aria-hidden
      />
      <div
        className="flex flex-col shrink-0 h-full w-6"
        style={{
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
          <UpCaret direction="down" />
        </button>
      </div>
    </div>
  );
}
