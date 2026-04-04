import { ReactElement } from "react";

interface ArrowRightIconProps {
  className?: string;
}

const ArrowRightIcon = ({ className }: ArrowRightIconProps): ReactElement => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M27.255 19.5L23.385 23.385L25.5 25.5L33 18L25.5 10.5L23.385 12.615L27.255 16.5H3V19.5H27.255Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ArrowRightIcon;
