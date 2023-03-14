import { FormEvent, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const [loginState, setLoginState] = useState({
    username: "",
    password: "",
  });

  const router = useRouter()

  const login = (e: FormEvent) => {
    e.preventDefault();
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              canLogin
            }
          }
        `,
        variables: {
          email: loginState.username,
          password: loginState.password,
        },
      }),
    }).then(async res => 
      await res.json().then(result => {
        console.log(result)
        if (result.data.login.canLogin) {
          router.push("/admin/login-success")
        }
      })
    )
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
