import members from "../../constants/members.json";

// TYPE EXPORTS ========================================================
export type Member = {
  name: string;
  role: string;
  term: number;
  teams: string[];
  img: string;
  isDuplicate?: boolean;
};

// MEMBR EXPORTS ======================================================

export const get_current_members = (curr_term: number) => {
  return members.members
    .filter((member) => member.term === curr_term)
    .sort((a, b) => {
      const teamA = (a.teams[0] || "").toLowerCase();
      const teamB = (b.teams[0] || "").toLowerCase();
      if (teamA < teamB) return -1;
      if (teamA > teamB) return 1;
      return 0;
    });
};

export const get_previous_members = (curr_term: number) => {
  const previousTerm1 = curr_term - 1;
  const previousTerm2 = curr_term - 2;
  return members.members.filter(
    (member) => member.term === previousTerm1 || member.term === previousTerm2,
  );
};

export const get_old_members = (curr_members: Member[], curr_term: number) => {
  const oldMembers = members.members.filter((member) => {
    if (member.term < curr_term - 2) {
      return true;
    }
    return !curr_members
      .map((h) => h.name.toLowerCase())
      .includes(member.name.toLowerCase());
  });
  return oldMembers;
};

export const get_term = () => {
  return members.term;
};

export const get_teams = () => {
  return members.teams;
};

// FUNCTION EXPORTS ====================================================
export const extractInfoFromUrl = (
  url: string,
): { name: string; role: string; teams: string[] } | null => {
  if (!url.trim()) return null;

  const decodedUrl = decodeURIComponent(url);
  const filename = decodedUrl.split("/").pop()?.split("?")[0] || "";
  const nameWithoutExtension = filename.replace(/\.(png|webp|jpg|jpeg)$/i, "");
  const parts = nameWithoutExtension.split("_");

  if (parts.length >= 3) {
    const firstName = parts[parts.length - 2];
    const lastName = parts[parts.length - 1];
    const role = parts.slice(0, -2).join(" ");

    const formattedName = `${
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
    } ${lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()}`;

    const formattedRole = role
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    return {
      name: formattedName,
      role: formattedRole,
      teams: [],
    };
  }

  return null;
};

export const teamsMap = {
  developer: ["dev", "developer", "project developer"],
  "technical lead": ["pl", "project lead", "technical lead"],
  "product manager": ["pm", "product manager"],
  designer: ["designer", "design"],
  "content strategist": ["content strategist", "content"],
  "vp scoping": ["vp scoping", "vps"],
  "vp engineering": ["vp engineering", "vpe"],
  "vp design": ["vp design", "vpd"],
  "vp product": ["vp product", "vpp"],
  "vp talent": ["vp talent", "vpt"],
  "vp finance": ["vp finance", "vpf"],
};

export const normalizeRole = (role: string): string => {
  if (!role) return "";

  const normalizedRole = role.toLowerCase().trim();

  for (const [key, values] of Object.entries(teamsMap)) {
    if (values.some((value) => value.toLowerCase() === normalizedRole)) {
      return key;
    }
  }

  return role.toLowerCase();
};

export const doesMemberExist = (
  name: string,
  previousTermMembers: Member[],
): boolean => {
  if (!name.trim()) return false;
  return previousTermMembers.some(
    (member) => member.name.toLowerCase() === name.toLowerCase(),
  );
};
