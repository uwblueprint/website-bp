export type Member = {
  name: string;
  role?: string;
  img?: string;
};

export type Team = {
  id: string;
  name: string;
  members: Member[];
};
