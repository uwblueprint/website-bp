import { Member } from "@components/members/types";
import { FC } from "react";

export const Avatar: FC<Member> = ({ name, role, img }) => {
  return (
    <div className="flex items-center space-x-4">
      <img
        className="rounded-full object-cover h-8 w-8"
        src={img || "/members/default.jpg"}
      />
      <div>
        <p className="font-normal">{name}</p>
        <p className="text-blue capitalize">
          {/**Making sure all occurences of vp are replaced */}
          {role?.replace(/vp/g, "VP")}
        </p>
      </div>
    </div>
  );
};
