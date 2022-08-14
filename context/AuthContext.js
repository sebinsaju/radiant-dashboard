import React, { createContext, useContext, useEffect, useState } from "react";
import { instance } from "../axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const login = (email, password) => {
    instance
      .post("/admin/login", { email, password })
      .then((res) => {
        localStorage.setItem("Token", res.data.token);
        setUser(res.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Logout = () => {
    setUser('');
    localStorage.getItem('Key')
  }
  const isLoggedIn = () => {
    setUser(localStorage.getItem('Token'));
  };
  useEffect(()=>{
    isLoggedIn()
  },[])
  return (
    <AuthContext.Provider value={{ login, user ,Logout }}>
      {children}
    </AuthContext.Provider>
  );
};
