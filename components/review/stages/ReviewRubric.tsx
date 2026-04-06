import { ReactElement } from "react";

export interface Props {
  scoringCriteria: string[];
}

export const ReviewRubric = ({ scoringCriteria }: Props): ReactElement => {
  return (
    <div className="flex w-full flex-col gap-2">
      {scoringCriteria.map((criteria, index) => (
        <div
          key={`${index}-${criteria}`}
          className="rounded-[4px] bg-white p-4"
        >
          <p className="font-poppins text-base font-medium leading-[1.4] text-[#135FC5]">
            Level {index + 1}
          </p>
          <p className="mt-3 font-source text-base leading-[1.4] text-black/80">
            {criteria}
          </p>
        </div>
      ))}
    </div>
  );
};
