import { ReactChild, ReactElement, useEffect, useState } from "react";
import Loading from "@components/common/Loading";
import { queries } from "graphql/queries";
import getAccessToken from "common/authHelper";
import { auth } from "@utils/firebase";
import { useRouter } from "next/router";

type Props = {
  children: ReactChild;
  allowedRoles: Role[];
};

type Role = "Admin" | "User";

interface AuthStatus {
  loading: boolean;
  isAuthorized: boolean;
}

const ProtectedRoute = ({ children, allowedRoles }: Props): ReactElement => {
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    loading: true,
    isAuthorized: false,
  });
  useEffect(() => {
    auth.onAuthStateChanged(async () => {
      setAuthStatus({
        loading: true,
        isAuthorized: false,
      });
      const accessToken = await getAccessToken();
      if (accessToken == null) {
        setAuthStatus({
          loading: false,
          isAuthorized: false,
        });
        return;
      }

      fetch("http://localhost:5000/graphql", {
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
            await res.json().then((result) => {
              if (result.data.isAuthorizedByRole) {
                setAuthStatus({
                  loading: false,
                  isAuthorized: true,
                });
              } else {
                setAuthStatus({
                  loading: false,
                  isAuthorized: false,
                });
              }
            }),
        )
        .catch((e) => {
          console.error("Auth Validation Error");
          console.error(e);
        });
    });
  }, [allowedRoles]);

  if (!authStatus.loading && !authStatus.isAuthorized)
    router.push("/admin/login");
  // TODO: handle redirect to 404 here

  return authStatus.loading ? (
    <Loading />
  ) : authStatus.isAuthorized ? (
    <>{children}</>
  ) : (
    <></>
  );
};

export default ProtectedRoute;
