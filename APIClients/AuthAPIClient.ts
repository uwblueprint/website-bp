import { fetchGraphql } from "@utils/makegqlrequest";
import { mutations, queries } from "graphql/queries";
import BaseAPIClient from "./BaseAPIClient";
import { UserDTO, Role } from "types/auth";

export type TokenInfo = {
  accessToken: string;
  refreshToken: string;
};

export type AuthResult = TokenInfo & UserDTO;

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

const loginWithGoogle = async (idToken: string): Promise<AuthResult> => {
  return fetchGraphql(mutations.loginWithGoogle, { idToken })
    .then((result) => {
      const loginData = result.data.loginWithGoogle;
      return {
        id: loginData.id,
        firstName: loginData.firstName,
        lastName: loginData.lastName,
        email: loginData.email,
        role: loginData.role,
        accessToken: loginData.accessToken,
        refreshToken: loginData.refreshToken,
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
