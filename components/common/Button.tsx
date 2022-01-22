import { FC, ButtonHTMLAttributes } from "react";
import Link from "next/link";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly size?: "md" | "lg";
  readonly variant?: "primary" | "secondary";
  /** Whether to invert the background and text/border colors, use depending on surrounding elements */
  readonly invert?: boolean;
  readonly href?: string;
};

/** Button component */
const Button: FC<Props> = ({
  children,
  className,
  size = "lg",
  variant = "primary",
  invert = false,
  href,
  ...props
}) => {
  // Classnames for border, background, text styles
  let classes: string;

  if (invert) {
    switch (variant) {
      case "primary":
        // White border, white background, blue text
        classes = `border-white bg-white text-blue`;
        break;
      case "secondary":
        // White border, blue background, white text
        classes = `border-white bg-blue text-white`;
        break;
    }
  } else {
    switch (variant) {
      case "primary":
        // Blue border, blue background, white text
        classes = `border-blue bg-blue text-white`;
        break;
      case "secondary":
        // Blue border, white background, blue text
        classes = `border-blue bg-white text-blue`;
        break;
    }
  }

  const buttonClasses = `
    ${classes}
    ${
      size === "lg"
        ? "h-[50px] text-xs md:text-base font-semibold"
        : "h-10 text-sm font-normal"
    }
    font-poppins px-8 border-2 border-solid rounded-full text-base hover:opacity-80 disabled:opacity-80
    ${className}
  `;

  return href ? (
    <Link href={href}>
      <a>
        <button className={buttonClasses} {...props}>
          {children}
        </button>
      </a>
    </Link>
  ) : (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
