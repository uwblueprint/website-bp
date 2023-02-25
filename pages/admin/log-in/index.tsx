import { FormEvent, useState } from "react";
import { NextPage } from "next";

const Login: NextPage = () => {
  const [loginState, setLoginState] = useState({
    username: "",
    password: "",
  });

  const login = (e: FormEvent) => {
    console.log(loginState);
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="flex flex-col" onSubmit={(e) => {login(e)}}>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" required onChange={(e) => {setLoginState({...loginState, username: e.target.value})}} />
        <label htmlFor="password">Password: </label>
        <input type="text" name="password" required onChange={(e) => {setLoginState({...loginState, password: e.target.value})}} />
        <button className="mt-2 rounded-md border-solid border-2 border-black" type="submit">Log In</button>
      </form>
    </div>
  )
}

export default Login;