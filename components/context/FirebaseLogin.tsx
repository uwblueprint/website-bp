import { auth } from "@utils/firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { ReactElement } from "react";

const FirebaseLogin = (): ReactElement => {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  return <button onClick={signInWithGoogle}>login</button>;
};

export default FirebaseLogin;
