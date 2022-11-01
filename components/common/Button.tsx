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
        classes = `border-blue bg-white text-blue hover:border-sky-400 hover:text-sky-400`;
        break;
    }
  }

  const buttonClasses = `
    ${classes}
    ${
      size === "lg"
        ? "h-auto py-2.5 text-sm md:text-base font-semibold"
        : "h-auto py-2.5 text-sm font-normal"
    }
    font-poppins px-8 border-2 border-solid rounded-full text-base
    ${className}
  `;

  return href ? (
    href.startsWith("http") ? (
      <a href={href} target="_blank" rel="noopener noreferrer">
        <button className={buttonClasses} {...props}>
          {children}
        </button>
      </a>
    ) : (
      <Link href={href}>
        <button className={buttonClasses} {...props}>
          {children}
        </button>
      </Link>
    )
  ) : (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
