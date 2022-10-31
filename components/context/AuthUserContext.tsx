// import nookies from 'nookies';
import { User } from "firebase/auth";
import React, {
  createContext,
  ReactChild,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "@utils/firebase";

type Props = {
  children: ReactChild;
};

type AuthContext = {
  user: User | null;
};

const AuthContext = createContext<AuthContext>({
  user: null,
});

export const AuthProvider = ({ children }: Props): ReactElement => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const token = await user.getIdToken();
        localStorage.setItem("token", token);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken(true);
        localStorage.setItem("token", token);
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): { user: User | null } => useContext(AuthContext);
