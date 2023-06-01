import { ReactChild, ReactElement, useEffect, useState } from "react";
import Loading from "@components/common/Loading";
import Login from "@components/common/Login";
import Permissions from "entities/permissions";
import { queries } from "graphql/queries";

type Props = {
  children: ReactChild;
  allowedRoles: Role[];
};

type Role = "Admin" | "User"

interface AuthStatus {
  loading: boolean;
  isAuthorized: boolean;
}

const ProtectedRoute = ({ children, allowedRoles }: Props): ReactElement => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    loading: true,
    isAuthorized: false,
  })
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken == null){
      setAuthStatus({
        loading: false,
        isAuthorized: false
      })
      return
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
          roles: allowedRoles
        },
      }),
    })
      .then(
        async (res) =>
          await res.json().then((result) => {
            if (result.data.isAuthorizedByRole) {
              setAuthStatus({
                loading: false,
                isAuthorized: true
              })
            }
            else{
              setAuthStatus({
                loading: false,
                isAuthorized: false
              }
              )
            }
          }),
      )
      .catch((e) => {
        console.error("Auth Validation Error");
        console.log(e);
      });
  }, []);
  return  <>{children}</>
  // return authStatus.loading ? <Loading /> : authStatus.isAuthorized ? <>{children}</> : <Login />
};

export default ProtectedRoute;
