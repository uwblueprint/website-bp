import { Member } from "@components/members/types";
import { FC } from "react";

export const Avatar: FC<Member> = ({ name, role, img }) => {
  return (
    <figure className="flex flex-col items-center space-y-1">
      <img
        className="rounded-full object-cover h-32 w-32"
        src={img || "/members/default.jpg"}
      />
      <p className="font-bold text-center">{name}</p>
      <p className="text-charcoal-500 text-center capitalize">
        {/**Making sure all occurences of vp are replaced */}
        {role?.replace(/vp/g, "VP")}
      </p>
    </figure>
  );
};
