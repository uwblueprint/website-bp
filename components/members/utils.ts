export function roleType(role: string): number {
  const roles = new Map([
    ["president", 0],
    ["co-president", 0],
    ["vp engineering", 1],
    ["vp design", 2],
    ["vp product", 3],
    ["vp internal", 4],
    ["vp scoping", 5],
    ["vp content", 6],
    ["vp outreach", 7],
    ["vp marketing", 8],
    ["vp finance", 9],
    ["technical lead", 10],
    ["product manager", 11],
    ["project mentor", 12],
    ["designer", 13],
    ["design mentor", 14],
    ["developer", 15],
    ["developer mentor", 16],
  ]);

  // If member has multiple roles, order by first one
  // e.g. 'designer & developer' comes before 'developer'
  if (role.includes("&")) {
    role = role.split("&")[0].trim();
  }

  return roles.get(role) ?? 100;
}
