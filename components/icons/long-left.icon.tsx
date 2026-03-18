import { ReactElement } from "react";
import { blue } from "../../constants/recruitmentPlatformPalette";

interface LongLeftIconProps {
  colour?: string;
}

export const LongLeftIcon = ({
  colour = blue[500],
}: LongLeftIconProps): ReactElement => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    role="img"
  >
    <path
      d="M5.83 11L8.41 8.41L7 7L2 12L7 17L8.41 15.59L5.83 13H22V11H5.83Z"
      fill={colour}
    />
  </svg>
);
