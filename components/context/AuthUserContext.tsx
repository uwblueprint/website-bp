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
  isLoading: boolean;
};

const AuthContext = createContext<AuthContext>({
  user: null,
  isLoading: true,
});

export const AuthProvider = ({ children }: Props): ReactElement => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      console.log(`yuhh ${user}`)
      if (user) {
        if (user.email && user.email.endsWith("@uwblueprint.org")) {
          setUser(user);
          const token = await user.getIdToken();
          localStorage.setItem("token", token);
        } else {
          // TODO: Handle non-UW Blueprint emails
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
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): { user: User | null; isLoading: boolean } =>
  useContext(AuthContext);
