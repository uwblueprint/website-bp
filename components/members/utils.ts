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
<<<<<<< HEAD
    ["graphic designer", 10],
    ["content strategist", 11],
    ["user researcher", 12],
    ["internal operations lead", 13],
    ["design system", 14],
=======
    ["graphic designer", 11],
    ["content strategist", 12],
    ["user researcher", 13],
    ["internal operations lead", 14],
    ["design system", 15],
>>>>>>> 28dbfb137a7b0e0c911628047bdb9afdf39e1aac
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
