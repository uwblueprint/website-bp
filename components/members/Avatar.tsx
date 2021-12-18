import { Member } from "@components/members/types";

export const Avatar = ({ name, position, profile }: Member): JSX.Element => {
  return (
    <figure className="flex flex-col items-center">
      <img
        className="rounded-full w-32"
        src={profile || "/members/default.jpg"}
      />
      <p>{name}</p>
      <p>{position}</p>
    </figure>
  );
};
