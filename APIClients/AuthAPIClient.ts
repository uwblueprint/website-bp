import { mutations, queries } from "graphql/queries";
import BaseAPIClient from "./BaseAPIClient";

export type TokenInfo = {
  accessToken: string;
  refreshToken: string;
};

const login = async (
  email: string,
  password: string,
): Promise<TokenInfo | null> => {
  return fetch("http://localhost:5000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: mutations.login,
      variables: {
        email: email,
        password: password,
      },
    }),
  }).then(
    async (res) =>
      await res.json().then((result) => {
        if (result.data.login) {
          return {
            accessToken: result.data.login.accessToken,
            refreshToken: result.data.login.refreshToken,
          };
        }
        return null;
      }),
  );
};

export type Role = "Admin" | "User";

const isAuthorizedByRole = (
  accessToken: string,
  allowedRoles: Role[],
): Promise<boolean> => {
  BaseAPIClient.handleAuthRefresh();
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
  login,
  isAuthorizedByRole,
};
