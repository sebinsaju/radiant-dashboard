import Image from "next/image";
import React, { useContext } from "react";
import style from "./Sidebar.module.scss";
import Link from "next/link";
import { AuthContext } from "../../context/AuthContext";

const SideBar = () => {
  const {Logout} = useContext(AuthContext);
  const MENU = [
    { title: "Packages", slug: "/packages" },
    { title: "Banner", slug: "/banners" },
    { title: "Testiminal", slug: "/testimonial" },
    // { title: "Rooms", slug: "/packages" },
  ];
  return (
    <div className={style.sidebar}>
      <div className={style.logo}>
        <img src="/logo.png" alt="logo" />
      </div>
      <div className={style.menus}>
        {MENU.map((menu, index) => {
          return (
            <div className={style.menu} key={`menuitem${index}`}>
              <Link href={menu.slug}>
                <a>{menu.title}</a>
              </Link>
            </div>
          );
        })}
        <div className={style.menu} onClick={Logout}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default SideBar;
