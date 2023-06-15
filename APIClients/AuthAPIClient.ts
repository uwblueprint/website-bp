import { mutations, queries } from "graphql/queries";
import BaseAPIClient from "./BaseAPIClient";

export type TokenInfo = {
  accessToken: string;
  refreshToken: string;
};

export type Role = "Admin" | "User";

const isAuthorizedByRole = (allowedRoles: Role[]): Promise<boolean> => {
  BaseAPIClient.handleAuthRefresh();
  const accessToken = localStorage.getItem("accessToken");
  return fetch("http://localhost:5000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: queries.isAuthorizedByRole,
      variables: {
        accessToken,
        roles: allowedRoles,
      },
    }),
  })
    .then(
      async (res) =>
        await res.json().then((result) => result.data.isAuthorizedByRole),
    )
    .catch((_) => {
      throw new Error("Auth Validation Error");
    });
};

export default {
  isAuthorizedByRole,
};
