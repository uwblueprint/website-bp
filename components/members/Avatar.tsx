import { Member } from "@components/members/types";
import { FC } from "react";

export const Avatar: FC<Member> = ({ name, role, img }) => {
  return (
    <figure className="flex flex-col items-center space-y-y-1">
      <img
        className="rounded-full object-cover h-32 w-32"
        src={img || "/members/default.jpg"}
      />
      <p className="font-bold text-center">{name}</p>
      <p className="text-charcoal-500">{role}</p>
    </figure>
  );
};
