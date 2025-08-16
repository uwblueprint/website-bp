import { fetchGraphql } from "@utils/makegqlrequest";
import { queries } from "graphql/queries";
import BaseAPIClient from "./BaseAPIClient";

export type TokenInfo = {
  accessToken: string;
  refreshToken: string;
};

export type Role = "Admin" | "User";

const isAuthorizedAdmin = (): Promise<boolean> => {
  BaseAPIClient.handleAuthRefresh();
  const accessToken = localStorage.getItem("accessToken");

  return fetchGraphql(queries.isAuthorizedAdmin, {
    accessToken,
  })
    .then((result) => result.data.isAuthorizedAdmin)
    .catch(() => {
      throw new Error("Auth Validation Error");
    });
};

export default {
  isAuthorizedAdmin,
};
