import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 font-[family-name:var(--font-roobert)] rounded-none px-6 py-3 transition-[transform,filter] duration-200 ease-[cubic-bezier(0.33,1,0.68,1)] hover:scale-97 hover:brightness-[0.97] active:scale-95 active:brightness-[0.94] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        "filled-blue":
          "bg-[var(--bp-blue)] text-[var(--primary-light)] border-0",
        "filled-light":
          "bg-[var(--primary-light)] text-[var(--bp-blue)] border-0",
        "outline-blue":
          "bg-transparent text-[var(--bp-blue)] border-0 shadow-[inset_0_0_0_1px_var(--bp-blue)]",
        "outline-light":
          "bg-transparent text-[var(--primary-light)] border-0 shadow-[inset_0_0_0_1px_var(--primary-light)]",
        "outline-dark":
          "bg-transparent text-[var(--primary-dark)] border-0 shadow-[inset_0_0_0_1px_var(--primary-dark)]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "text-[length:var(--text-sm)] leading-[var(--text-sm--line-height)]",
        md: "text-[length:var(--text-md)] leading-[var(--text-md--line-height)]",
        lg: "text-[length:var(--text-lg)] leading-[var(--text-lg--line-height)]",
        default:
          "text-[length:var(--text-md)] leading-[var(--text-md--line-height)]",
      },
    },
    defaultVariants: {
      variant: "filled-blue",
      size: "default",
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
