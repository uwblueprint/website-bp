import { fetchGraphql } from "@utils/makegqlrequest";
import { teamMemberMutations, teamMemberQueries } from "graphql/queries";
import { TeamMember, TeamRole } from "../types";

const get = async (): Promise<TeamMember> => {
  try {
    const res = await fetchGraphql(teamMemberQueries.teamMembers);
    return res.data.teamMembers;
  } catch (error) {
    throw new Error("Error fetching team members");
  }
};

const create = async (
  firstName: string,
  lastName: string,
  teamRole: TeamRole,
): Promise<TeamMember> => {
  try {
    const res = await fetchGraphql(teamMemberMutations.createTeamMember, {
      input: {
        firstName,
        lastName,
        teamRole,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Error adding team members");
  }
};

export default {
  get,
  create,
};
