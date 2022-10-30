// import nookies from 'nookies';
import { onAuthStateChanged, User } from "firebase/auth";
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

const AuthContext = createContext<{ user: User | null }>({
  user: null,
});

export const AuthProvider = ({ children }: Props): ReactElement => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("no user");
        setUser(null);
        // nookies.set(undefined, 'token', '', { path: '/' });
      } else {
        console.log(user);
        // const token = await user.getIdToken();
        setUser(user);
        // nookies.set(undefined, 'token', token, { path: '/' });
      }
    });
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): { user: User | null } => useContext(AuthContext);
