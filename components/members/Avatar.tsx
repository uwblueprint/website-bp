import { Student } from "@components/members/students/types";

export const Avatar = ({ name, position, profile }: Student): JSX.Element => {
  return (
    <figure key={`${name}:${position}`} className="flex flex-col items-center">
      <img
        className="rounded-full w-32"
        src={profile || "/members/default.png"}
      />
      <p>{name}</p>
      <p>{position}</p>
    </figure>
  );
};
