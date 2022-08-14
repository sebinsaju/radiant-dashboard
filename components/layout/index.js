import React, { useContext } from "react";
import { AuthContext, AuthProvider } from "../../context/AuthContext";
import Login from "../login/Login";
import SideBar from "../sidebar";
import style from "./Layout.module.scss";
const Layout = (props) => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      {!user ? (
        <Login />
      ) : (
        <div className="layout">
          <SideBar />
          <div className={style.layout_content}>{props.children}</div>
        </div>
      )}
    </div>
  );
};

export default Layout;
