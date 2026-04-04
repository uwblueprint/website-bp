import { LongLeftIcon } from "@components/icons/long-left.icon";
import Link from "next/link";
import { ReactNode } from "react";

interface ReviewStageHeaderProps {
  backHref: string;
  right?: ReactNode;
}

export const ReviewStageHeader = ({
  backHref,
  right,
}: ReviewStageHeaderProps) => {
  return (
    <>
      <Link href={backHref} passHref>
        <a className="font-source no-underline inline-flex justify-center items-center gap-2 w-fit cursor-pointer shrink-0 hover:opacity-90 rounded-full py-2 px-4 border-2 border-blue bg-white text-blue text-base font-normal leading-[1.4] hover:bg-sky-100 hover:border-blue hover:text-blue">
          <LongLeftIcon />
          Back to home
        </a>
      </Link>
      {right != null ? (
        <div className="shrink-0 flex items-center">{right}</div>
      ) : null}
    </>
  );
};
