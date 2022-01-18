export function roleType(role: string): number {
  const roles = new Map([
    // EXEC TEAM ROLES
    ["president", 0],
    ["co-president", 0],
    ["vp engineering", 1],
    ["vp design", 2],
    ["vp product", 3],
    ["vp scoping", 4],
    ["vp internal", 5],
    ["vp external", 6],
    ["vp communications", 7],
    ["vp finance", 8],
    // CLUB SUPPORT ROLES
    ["graphic designer", 9],
    ["content strategist", 10],
    ["user researcher", 11],
    ["internal operations lead", 12],
    // PROJECT TEAM ROLES
    ["technical lead", 13],
    ["product manager", 14],
    ["project mentor", 15],
    ["designer", 16],
    ["design mentor", 17],
    ["developer", 18],
    ["developer mentor", 19],
  ]);

  // If member has multiple roles, order by first one
  // e.g. 'designer & developer' comes before 'developer'
  if (role.includes("&")) {
    role = role.split("&")[0].trim();
  }

  return roles.get(role) ?? 100;
}
