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

type Member = { name: string };

export const checkIfMemberExists = (
  name: string,
  previousTermMembers: Member[],
): boolean => {
  if (!name.trim()) return false;
  return previousTermMembers.some(
    (member) => member.name.toLowerCase() === name.toLowerCase(),
  );
};
