import React, {
  createContext,
  ReactChild,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserDTO } from "types/auth";

export type AuthenticatedUser = UserDTO;

const AUTHENTICATED_USER_KEY = "authenticatedUser";
const HOUR_MS = 3300000;

type Props = {
  children: ReactChild;
};

type AuthContextType = {
  authenticatedUser: AuthenticatedUser | null;
  setAuthenticatedUser: (user: AuthenticatedUser | null) => void;
  logout: () => void;
  isLoading: boolean;
};

const defaultContextValue: AuthContextType = {
  authenticatedUser: null,
  setAuthenticatedUser: () => {
    // Default no-op implementation
  },
  logout: () => {
    // Default no-op implementation
  },
  isLoading: true,
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

const getLocalStorageUser = (): AuthenticatedUser | null => {
  try {
    const storedUser = localStorage.getItem(AUTHENTICATED_USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: Props): ReactElement => {
  const [authenticatedUser, setAuthenticatedUserState] =
    useState<AuthenticatedUser | null>(getLocalStorageUser());

  // Wrapper around setState that also syncs to localStorage
  const setAuthenticatedUser = (user: AuthenticatedUser | null) => {
    setAuthenticatedUserState(user);
    if (user) {
      localStorage.setItem(AUTHENTICATED_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTHENTICATED_USER_KEY);
    }
  };

  // Logout: clear auth data
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAuthenticatedUser(null);
  };

  // Set up automatic token/user refresh every ~55 minutes
  useEffect(() => {
    const interval = setInterval(async () => {
      if (authenticatedUser) {
        try {
          const accessToken = localStorage.getItem("accessToken");
          if (accessToken) {
            // TODO: finish implementing token refresh flow - need backend support for refresh token rotation and a new query to get user info with access token
            // const result = await fetchGraphql(queries.getCurrentUser, {
            //   accessToken,
            // });
            // if (result.data && result.data.getCurrentUser) {
            //   setAuthenticatedUser(result.data.getCurrentUser);
            // }
          }
        } catch (error) {
          console.warn("Auto-refresh user failed", error);
        }
      }
    }, HOUR_MS);

    return () => clearInterval(interval);
  }, [authenticatedUser]);

  return (
    <AuthContext.Provider
      value={{
        authenticatedUser,
        setAuthenticatedUser,
        logout,
        isLoading: false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthUserContext = (): AuthContextType =>
  useContext(AuthContext);

// hooks for common use cases
export const useAuthenticatedUser = (): AuthenticatedUser | null => {
  const { authenticatedUser } = useContext(AuthContext);
  return authenticatedUser;
};
