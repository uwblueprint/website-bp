import { ReactElement } from "react";
import { neutral } from "../../constants/recruitmentPlatformPalette";

interface CaretProps {
  colour?: string;
  direction?: "up" | "down";
}

export const UpCaret = ({
  colour = neutral[600],
  direction = "up",
}: CaretProps): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="6.25"
    viewBox="0 0 9 6"
    fill="none"
    aria-hidden
    style={direction === "down" ? { transform: "rotate(180deg)" } : undefined}
  >
    <path
      d="M4.07001 0.18775C4.27018 -0.0624531 4.65072 -0.0624533 4.85088 0.18775L8.81057 5.13736C9.07248 5.46474 8.83939 5.94971 8.42014 5.94971H0.500762C0.0815088 5.94971 -0.151578 5.46474 0.110327 5.13736L4.07001 0.18775Z"
      fill={colour}
    />
  </svg>
);
