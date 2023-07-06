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
    .catch((_) => {
      throw new Error("Auth Validation Error");
    });
};

export default {
  isAuthorizedByRole,
};
