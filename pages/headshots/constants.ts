import members from "../../constants/members.json";

// TYPE & CONSTANT EXPORTS ============================================

export type Member = {
  name: string;
  role: string;
  term: number;
  teams: string[];
  img: string;
  isDuplicate?: boolean;
};

export const DEFAULT_PHOTO =
  "https://firebasestorage.googleapis.com/v0/b/uw-blueprint.appspot.com/o/img%2Fdefault.png?alt=media&token=fe95cc90-ba2b-4c04-a808-0f903cc8b519";

export const teamsMap = {
  // EXEC TEAM ROLES
  "president": ["pres", "president"],
  "co-president": ["co-pres", "co-president"],
  "director lead": ["dl", "director lead"],
  "internal director": ["id", "internal director"],
  "external director": ["ed", "external director"],
  "vp engineering": ["vpe", "vp engineering"],
  "vp design": ["vpd", "vp design"],
  "vp product": ["vpp", "vp product"],
  "vp scoping": ["vps", "vp scoping"],
  "vp internal": ["vpi", "vp internal"],
  "vp external": ["vpx", "vp external"],
  "vp communications": ["vpc", "vp communications"],
  "vp finance": ["vpf", "vp finance"],
  "finance coordinator": ["fc", "finance coordinator"],
  "vp talent": ["vpt", "vp talent"],
  
  // CLUB SUPPORT ROLES
  "graphic designer": ["gd", "graphic designer"],
  "content strategist": ["content strategist", "content"],
  "user researcher": ["ur", "user researcher"],
  "internal operations lead": ["iol", "internal operations lead"],
  "design system": ["ds", "design system"],
  
  // PROJECT TEAM ROLES
  "technical lead": ["pl", "project lead"],
  "product manager": ["pm", "product manager"],
  "project mentor": ["mentor", "project mentor"],
  "designer": ["designer", "design"],
  "design mentor": ["dm", "design mentor"],
  "developer": ["dev", "developer"],
  "developer mentor": ["dev mentor", "developer mentor"],
};
// MEMBR EXPORTS ======================================================

export const sort_members = (members: Member[]) => {
  // by term number
  return members.sort((a, b) => {
    if (a.term !== b.term) {
      return b.term - a.term;
    }
    // if term is same, sort by team name
    const teamA = (a.teams[0] || "").toLowerCase();
    const teamB = (b.teams[0] || "").toLowerCase();
    if (teamA < teamB) return -1;
    if (teamA > teamB) return 1;
    return 0;
  });
};

// get members of the current term
export const get_current_members = (curr_term: number) => {
  return sort_members(
    members.members.filter((member) => member.term === curr_term),
  );
};

// previosou 2 terms
export const get_previous_members = (curr_term: number) => {
  const previousTerm1 = curr_term - 1;
  const previousTerm2 = curr_term - 2;
  return members.members.filter(
    (member) => member.term === previousTerm1 || member.term === previousTerm2,
  );
};

// old ass people
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

export const TEAMS = members.teams;

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

export const findExistingMember = (name: string, previousMembers: Member[]): Member | null => {
  if (!name.trim()) return null;
  const trimmedName = name.trim().toLowerCase();
  return (
    previousMembers.find(
      (member) => member.name.toLowerCase() === trimmedName,
    ) || null
  );
};