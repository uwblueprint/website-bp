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
    ["vp talent", 9],
    // CLUB SUPPORT ROLES
    ["graphic designer", 10],
    ["content strategist", 11],
    ["user researcher", 12],
    ["internal operations lead", 13],
    // PROJECT TEAM ROLES
    ["technical lead", 14],
    ["product manager", 15],
    ["project mentor", 16],
    ["designer", 17],
    ["design mentor", 18],
    ["developer", 19],
    ["developer mentor", 20],
  ]);

  // If member has multiple roles, order by first one
  // e.g. 'designer & developer' comes before 'developer'
  if (role.includes("&")) {
    role = role.split("&")[0].trim();
  }

  return roles.get(role) ?? 100;
}
