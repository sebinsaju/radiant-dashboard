import React, { createContext, useContext, useEffect, useState } from "react";
import { instance } from "../axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [error,setError] = useState("");
  const login = (email, password) => {
    instance
      .post("/admin/login", { email, password })
      .then((res) => {
        localStorage.setItem("Token", res.data.token);
        setUser(res.data.token);
        setError("")
      })
      .catch((err) => {
        setError(err.response.data.message)
      });
  };
  const Logout = () => {
    setUser('');
    localStorage.clear();
  }
  const isLoggedIn = () => {
    if(localStorage.getItem('Token')){
      setUser(localStorage.getItem('Token'));
    }else{
      setUser();
    }
  };
  useEffect(()=>{
    isLoggedIn()
  },[])
  return (
    <AuthContext.Provider value={{ login, user ,Logout ,error}}>
      {children}
    </AuthContext.Provider>
  );
};
