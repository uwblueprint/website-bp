import { auth } from "@utils/firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { ReactElement } from "react";

const Login = (): ReactElement => {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  return (
    <div className="w-100 h-screen flex flex-col justify-center items-center bg-sky-100 overflow-hidden">
      <div className="container max-w-[36rem]">
        <div className="bg-white m-8 p-8 rounded-lg shadow-lg min-h-[18rem]">
          <img src="/common/logo-blue.svg" alt="UW Blueprint logo" />
          <div className="flex flex-col items-center">
            <h4 className="my-8 text-blue-100">Sign In</h4>
            <button
              className="border-sky-500 border rounded-md px-4 py-2 shadow-md hover:bg-sky-100"
              onClick={signInWithGoogle}
            >
              <div className="flex space-around items-center gap-3">
                <img src="/common/google-logo.svg" alt="Google logo" />
                <div>Continue with Google</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
