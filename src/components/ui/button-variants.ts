import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 font-[family-name:var(--font-roobert)] rounded-none px-6 py-3 [--btn-shade:var(--btn)] hover:[--btn-shade:color-mix(in_srgb,var(--btn)_85%,var(--btn-shade-to,black))] [--btn-tint:transparent] hover:[--btn-tint:color-mix(in_srgb,var(--btn)_15%,transparent)] transition-[transform,background-color,color,box-shadow] duration-200 ease-[cubic-bezier(0.33,1,0.68,1)] active:scale-95 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        "filled-blue":
          "[--btn:var(--bp-blue)] bg-[var(--btn-shade)] text-[var(--primary-light)] border-0",
        "filled-light":
          "[--btn:var(--primary-light)] [--btn-shade-to:color-mix(in_srgb,var(--bp-blue)_70%,black)] bg-[var(--btn-shade)] text-[var(--bp-blue)] border-0",
        "outline-blue":
          "[--btn:var(--bp-blue)] bg-[var(--btn-tint)] text-[var(--btn)] border-0 shadow-[inset_0_0_0_1px_var(--btn)]",
        "outline-light":
          "[--btn:var(--primary-light)] [--btn-shade-to:color-mix(in_srgb,var(--bp-blue)_70%,black)] bg-[var(--btn-tint)] text-[var(--btn-shade)] border-0 shadow-[inset_0_0_0_1px_var(--btn-shade)]",
        "outline-dark":
          "[--btn:var(--primary-dark)] bg-[var(--btn-tint)] text-[var(--btn)] border-0 shadow-[inset_0_0_0_1px_var(--btn)]",
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
