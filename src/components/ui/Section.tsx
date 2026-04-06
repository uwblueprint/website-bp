import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export default function Section({
  children,
  className,
  as: Tag = "section",
}: SectionProps) {
  return <Tag className={cn("w-full px-8 py-12", className)}>{children}</Tag>;
}
