import { FC, ButtonHTMLAttributes } from "react";
import Link from "next/link";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly size?: "sm" | "md" | "lg";
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
}: Props) => {
  // Classnames for border, background, text styles
  let classes: string;

  if (invert) {
    switch (variant) {
      case "primary":
        // White border, white background, blue text
        classes = `border-white bg-white text-blue hover:border-transparent hover:bg-sky-200 hover:text-blue-100`;
        break;
      case "secondary":
        // White border, blue background, white text
        classes = `border-white bg-blue text-white hover:border-transparent hover:bg-sky-200 hover:text-blue-100`;
        break;
    }
  } else {
    switch (variant) {
      case "primary":
        // Blue border, blue background, white text
        classes = `border-blue bg-blue text-white hover:border-transparent hover:bg-sky-400 `;
        break;
      case "secondary":
        // Blue border, white background, blue text
        classes = `border-blue bg-white text-blue hover:border-sky-500 hover:text-sky-500 hover:bg-sky-100`;
        break;
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "lg":
        return "h-auto py-2.5 text-sm md:text-base font-semibold";
      case "md":
        return "h-auto py-2.5 text-sm font-normal";
      case "sm":
        return "h-min py-1.5 text-sm font-normal";
    }
  };

  const buttonClasses = `
    ${classes}
    ${getSizeClasses()}
    font-poppins px-8 border-2 border-solid rounded-full text-base
    ${className}
  `;

  return href ? (
    href.startsWith("http") ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-100"
      >
        <button className={buttonClasses} tabIndex={-1} {...props}>
          {children}
        </button>
      </a>
    ) : (
      <Link href={href}>
        <a className="hover:opacity-100">
          <button className={buttonClasses} tabIndex={-1} {...props}>
            {children}
          </button>
        </a>
      </Link>
    )
  ) : (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
