import Image from "next/image";

interface StudentCardProps {
  name: string;
  role: string;
  headshotSrc: string;
  /** Mark true for above-the-fold cards to preload them. */
  priority?: boolean;
}

export function StudentCard({
  name,
  role,
  headshotSrc,
  priority = false,
}: StudentCardProps) {
  return (
    <div className="group col-span-6 p-4 transition-colors duration-200 ease-out hover:bg-[var(--off-white)] md:col-span-3 lg:col-span-2">
      <div className="aspect-square overflow-hidden">
        <Image
          src={headshotSrc}
          alt={name}
          width={400}
          height={400}
          className="h-full w-full object-cover"
          loading={priority ? "eager" : "lazy"}
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
        />
      </div>
      <div className="pt-2">
        <p className="text-md text-[var(--primary-dark)]">{name}</p>
        <p className="text-sm text-[var(--secondary-dark)]">{role}</p>
      </div>
    </div>
  );
}
