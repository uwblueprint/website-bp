import { auth } from "@utils/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ReactElement } from "react";
import Button from "./Button";
import { fetchGraphql } from "@utils/makegqlrequest";

const Login = (): ReactElement => {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <div className="w-100 h-screen flex flex-col justify-center items-center bg-sky-100 overflow-hidden">
      <div className="container max-w-[36rem]">
        <div className="bg-white m-8 p-8 rounded-lg shadow-lg min-h-[18rem]">
          <img src="/common/logo-blue.svg" alt="UW Blueprint logo" />
          <div className="flex flex-col items-center">
            <h4 className="my-8 text-blue-100">Sign In</h4>
            <Button variant="secondary" onClick={signInWithGoogle}>
              <div className="flex space-around items-center gap-3">
                <img src="/common/google-logo.svg" alt="Google logo" />
                <div>Continue with Google</div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
