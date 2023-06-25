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
    ["design system", 14],
    // PROJECT TEAM ROLES
    ["technical lead", 15],
    ["product manager", 16],
    ["project mentor", 17],
    ["designer", 18],
    ["design mentor", 19],
    ["developer", 20],
    ["developer mentor", 21],
  ]);

  // If member has multiple roles, order by first one
  // e.g. 'designer & developer' comes before 'developer'
  if (role.includes("&")) {
    role = role.split("&")[0].trim();
  }

  return roles.get(role) ?? 100;
}
