import OptimizedImage from "@/components/common/OptimizedImage";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  /**
   * Extra grid classes. Default: `col-span-12 md:col-span-6 lg:col-span-3`.
   * Parent should be `grid w-full grid-cols-12 gap-0` (e.g. with `px-8`).
   */
  className?: string;
}

export default function ProjectCard({
  title,
  description,
  imageUrl,
  className,
}: ProjectCardProps) {
  return (
    <article
      className={cn(
        "col-span-12 grid h-full grid-cols-12 gap-0 overflow-hidden rounded-none border border-gray-200",
        "md:col-span-6 lg:col-span-3",
        className,
      )}
    >
      <div className="relative col-span-4 h-40 w-full bg-gray-100 sm:h-44 md:h-48 ">
        <OptimizedImage
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="col-span-12 flex flex-col gap-2 p-4">
        <h3 className="text-sm text-[var(--primary-dark)] sm:text-md lg:text-lg">
          {title}
        </h3>
        <p className="text-sm text-[var(--secondary-dark)]">{description}</p>
      </div>
    </article>
  );
}
