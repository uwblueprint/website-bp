import { Member } from "@components/members/types";
import { FC } from "react";

export const Avatar: FC<Member> = ({ name, position, profile }) => {
  return (
    <figure className="flex flex-col items-start">
      <div className="flex flex-col items-center">
        <img
          className="rounded-full w-32"
          src={profile || "/members/default.jpg"}
        />
        <p className="font-bold">{name}</p>
        <p className="text-charcoal-500">{position}</p>
      </div>
    </figure>
  );
};
