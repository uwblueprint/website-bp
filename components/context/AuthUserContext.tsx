// import nookies from 'nookies';
import { User } from "firebase/auth";
import React, {
  createContext,
  ReactNode,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "@utils/firebase";
import { isAdminEmail } from "@constants/admins";

type Props = {
  children: ReactNode;
};

type AuthContext = {
  user: User | null;
  isLoading: boolean;
  // Email of the last sign-in attempt that was rejected, if any.
  deniedEmail: string | null;
};

const AuthContext = createContext<AuthContext>({
  user: null,
  isLoading: true,
  deniedEmail: null,
});

export const AuthProvider = ({ children }: Props): ReactElement => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deniedEmail, setDeniedEmail] = useState<string | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        if (isAdminEmail(user.email)) {
          setUser(user);
          setDeniedEmail(null);
          const token = await user.getIdToken();
          localStorage.setItem("token", token);
        } else {
          setDeniedEmail(user.email);
          await auth.signOut();
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken(true);
        localStorage.setItem("token", token);
      }
      setIsLoading(false);
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, deniedEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContext => useContext(AuthContext);
