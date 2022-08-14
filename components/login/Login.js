import axios from "axios";
import React, { useContext, useState } from "react";
import { instance } from "../../axios";
import { AuthContext } from "../../context/AuthContext";
import Input from "../input";
import style from "./Login.module.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login,user} = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email,password);
  };
  return (
    <div className={style.login}>
      <div className={style.form_wrapper}>
        <div className={style.title}>Login</div>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="username"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input placeholder="password" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};
export default Login;