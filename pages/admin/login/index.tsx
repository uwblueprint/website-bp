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
    <div className="flex justify-center items-center h-screen bg-sky-100">
      <div className="flex flex-col justify-start items-start bg-white rounded-[8px] w-[500px] h-[500px] shadow-[0px_4px_20px_rgba(0,0,0,0.25)]">
        <img
          src="/common/logo-with-text-blue.svg"
          alt="UW Blueprint Logo"
          style={{ position: "relative", top: 37, left: 26 }}
        />
        <form className="flex flex-col space-y-[26px] pl-[88px] mt-[90px]" onSubmit={(e) => {login(e)}}>
          <label className="text-blue-100 font-poppins font-[600] text-[20px]" htmlFor="username">Username</label>
          <input className="h-[36px] w-[300px] border-1 border-[#aaaaaa] rounded-[4px]" type="text" name="username" required onChange={(e) => {setLoginState({...loginState, username: e.target.value})}} />
          <label className="text-blue-100 font-poppins font-[600] text-[20px]" htmlFor="password">Password</label>
          <input className="h-[36px] w-[300px] border-1 border-[#aaaaaa] rounded-[4px]" type="text" name="password" required onChange={(e) => {setLoginState({...loginState, password: e.target.value})}} />
        </form>
        <button className="justify-self-start mt-[26px] rounded-full border-solid border-2 border-blue-100 bg-blue-100 text-white ml-[88px] px-[32px] py-[13px]" type="submit">Sign In</button>
      </div>
    </div>
  )
}

export default Login;
