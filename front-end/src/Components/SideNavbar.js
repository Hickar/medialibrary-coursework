import React, {useContext} from "react";
import styles from "./SideNavbar.module.css";
import {useHistory} from "react-router";
import {NavLink} from "react-router-dom";
import {NotificationContext} from "../Contexts/NotificationContext";
import {AuthContext} from "../Contexts/AuthContext";
import profileIcon from "../assets/profile_Icon.svg";
import filesIcon from "../assets/files_Icon.svg";
import settingsIcon from "../assets/settings_Icon.svg";
import aboutIcon from "../assets/about_Icon.svg";
import logoutIcon from "../assets/logout_Icon.svg";
import {getCookie} from "../api/utils";

export default function SideNavbar() {
  const history = useHistory();
  const setNotification = useContext(NotificationContext);
  const setAuthQuery = useContext(AuthContext);
  const username = getCookie("user_name");

  async function handleLogout() {
    const response = await fetch(`${process.env.HOST_API_URL}?logout`, {
      method: "GET"
    })

    const data = await response.json();

    if (!data.err) {
      setAuthQuery(`${process.env.HOST_API_URL}?isAuthed `);
      setNotification({type: "message", text: "Вы вышли из учётной записи", active: true});
      history.push("/");
    }
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_link}>
        <img className={styles.navbar_link_icon} src={profileIcon} alt={"Profile icon"}/>
        <div className={styles.navbar_link_username}>{username}</div>
      </div>
      <div className={styles.delimiter}/>
      <NavLink className={styles.navbar_link} activeClassName={styles.navbar_link_active} to={"/dashboard/files"}>
        <img className={styles.navbar_link_icon} src={filesIcon} alt={"Gallery icon"}/>
        <div className={styles.navbar_link_text}>Файлы</div>
      </NavLink>
      <NavLink className={styles.navbar_link} activeClassName={styles.navbar_link_active} to={"/dashboard/settings"}>
        <img className={styles.navbar_link_icon} src={settingsIcon} alt={"Settings icon"}/>
        <div className={styles.navbar_link_text}>Настройки</div>
      </NavLink>
      <NavLink className={styles.navbar_link} activeClassName={styles.navbar_link_active} to={"/dashboard/about"}>
        <img className={styles.navbar_link_icon} src={aboutIcon} alt={"About icon"}/>
        <div className={styles.navbar_link_text}>О проекте</div>
      </NavLink>
      <div className={styles.delimiter}/>
      <a onClick={handleLogout} className={styles.navbar_link}>
        <img className={styles.navbar_link_icon} src={logoutIcon} alt={"Logout icon"}/>
        <div className={styles.navbar_link_text}>Выйти</div>
      </a>
    </div>
  )
}