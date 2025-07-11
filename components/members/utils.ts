export function roleType(role: string): number {
  const roles = new Map([
    // EXEC TEAM ROLES
    ["president", 0],
    ["co-president", 0],
    ["director lead", 0],
    ["internal director", 1],
    ["external director", 1],
    ["vp engineering", 2],
    ["vp design", 3],
    ["vp product", 4],
    ["vp scoping", 5],
    ["vp internal", 6],
    ["vp external", 7],
    ["vp communications", 8],
    ["vp finance", 9],
    ["vp talent", 10],
    // CLUB SUPPORT ROLES
    ["finance coordinator", 10],
    ["graphic designer", 11],
    ["content strategist", 12],
    ["user researcher", 13],
    ["internal operations lead", 14],
    ["design system", 15],
    // PROJECT TEAM ROLES
    ["technical lead", 16],
    ["product manager", 17],
    ["project mentor", 18],
    ["designer", 19],
    ["design mentor", 20],
    ["developer", 21],
    ["developer mentor", 22],
  ]);

  // If member has multiple roles, order by first one
  // e.g. 'designer & developer' comes before 'developer'
  if (role.includes("&")) {
    role = role.split("&")[0].trim();
  }

  return roles.get(role) ?? 100;
}
