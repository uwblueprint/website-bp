import { fetchGraphql } from "@utils/makegqlrequest";
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

  return fetchGraphql(queries.isAuthorizedByRole, {
    accessToken,
    roles: allowedRoles,
  })
    .then((result) => result.data.isAuthorizedByRole)
    .catch(() => {
      throw new Error("Auth Validation Error");
    });
};

const loginWithGoogle = async (idToken: string): Promise<TokenInfo> => {
  return fetchGraphql(mutations.loginWithGoogle, { idToken })
    .then((result) => {
      return {
        accessToken: result.data.loginWithGoogle.accessToken,
        refreshToken: result.data.loginWithGoogle.refreshToken,
      };
    })
    .catch(() => {
      throw new Error("Login Error");
    });
};

export default {
  isAuthorizedByRole,
  loginWithGoogle,
};
