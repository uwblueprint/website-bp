import { mutations } from "graphql/queries";
import jwt_decode from "jwt-decode";

type AccessToken = {
  readonly exp: number;
};

class BaseAPIClient {
  static handleAuthRefresh(): void {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken && refreshToken) {
      const decodedToken = jwt_decode<AccessToken>(accessToken);
      if (
        decodedToken &&
        decodedToken.exp <= Math.round(new Date().getTime() / 1000)
      ) {
        fetch("http://localhost:5000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: mutations.refresh,
            variables: {
              refreshToken: localStorage.getItem("refreshToken"),
            },
          }),
        })
          .then(async (res) => {
            await res.json().then((result) => {
              if (typeof result.data.refresh === "string") {
                localStorage.setItem("accessToken", result.data.refresh);
              }
            });
          })
          .catch((e: Error) => {
            // fail to refresh and de-auth user
            localStorage.clear();
            window.location.reload(); // refresh current page
            throw new Error(
              `Failed to refresh accessToken token. Cause: ${e.message}`,
            );
          });
      }
    } else {
      throw new Error("No access or refresh token provided");
    }
  }
}

export default BaseAPIClient;
