import { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import ErrorIcon from "@components/icons/error.icon";
import { mutations } from "graphql/queries";

const Login: NextPage = () => {
  const [loginState, setLoginState] = useState({
    username: "",
    password: "",
  });
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [incorrectCredentialsError, setIncorrectCredentialsError] =
    useState(false);

  const router = useRouter();

  const login = () => {
    if (!isValidated()) return;

    fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: mutations.login,
        variables: {
          email: loginState.username,
          password: loginState.password,
        },
      }),
    })
      .then(
        async (res) =>
          await res.json().then((result) => {
            if (result.data.login.firstName) {
              router.push("/admin/login-success");
            }
          }),
      )
      .catch((e) => {
        setIncorrectCredentialsError(true);
        console.error("Invalid login credentials");
        console.log(e);
      });
  };

  const isValidated = (): boolean => {
    let hasErrors = false;

    if (loginState.username === "") {
      hasErrors = true;
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }

    if (loginState.password === "") {
      hasErrors = true;
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    return !hasErrors;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-sky-100">
      <div className="flex flex-col justify-start items-start bg-white rounded-[8px] w-[500px] h-[500px] shadow-[0px_4px_20px_rgba(0,0,0,0.25)]">
        <a href="/">
          <img
            src="/common/logo-with-text-blue.svg"
            alt="UW Blueprint Logo"
            style={{ position: "relative", top: 37, left: 26 }}
          />
        </a>
        <form className="flex flex-col pl-[88px] mt-[90px]">
          {incorrectCredentialsError && (
            <div className="bg-error text-white p-[5px] text-xs rounded-md mb-[10px] flex items-center justify-center gap-[3px]">
              <ErrorIcon />
              Incorrect credentials, try again!
            </div>
          )}
          <label
            className="text-blue-100 font-poppins font-[600] text-[20px]"
            htmlFor="username"
          >
            Username
          </label>
          {usernameError && (
            <p className="text-error mt-[0px]">Username is required</p>
          )}
          <input
            className={`h-[36px] w-[300px] border-1 border-charcoal-300 rounded-[4px] mb-[26px] ${
              incorrectCredentialsError ? "border-error text-error" : ""
            }`}
            type="text"
            name="username"
            required
            onChange={(e) => {
              setLoginState({ ...loginState, username: e.target.value });
              setIncorrectCredentialsError(false);
            }}
          />
          <label
            className="text-blue-100 font-poppins font-[600] text-[20px]"
            htmlFor="password"
          >
            Password
          </label>
          {passwordError && (
            <p className="text-error mt-[0px]">Password is required</p>
          )}
          <input
            className={`h-[36px] w-[300px] border-1 border-charcoal-300 rounded-[4px] mb-[26px] ${
              incorrectCredentialsError ? "border-error text-error" : ""
            }`}
            type="password"
            name="password"
            required
            onChange={(e) => {
              setLoginState({ ...loginState, password: e.target.value });
              setIncorrectCredentialsError(false);
            }}
          />
        </form>
        <button
          className="justify-self-start mt-[26px] rounded-full border-solid border-2 border-blue-100 bg-blue-100 text-white ml-[88px] px-[32px] py-[13px]"
          onClick={login}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
