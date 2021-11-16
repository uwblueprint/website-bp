import { FIREBASE_CREDENTIAL } from "common/constants";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebaseConnection from "./firebase";

const signInWithGoogle = async (): Promise<boolean> => {
    console.log("IN SERVICE");
    const auth = getAuth(firebaseConnection);
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
            console.log(result);
            localStorage.setItem(
                FIREBASE_CREDENTIAL,
                JSON.stringify(credential.toJSON()),
            );
            return true;
        }
    } catch (err) {
        console.error("Unable to login with google", err);
    }

    return false;
};

export default signInWithGoogle;
