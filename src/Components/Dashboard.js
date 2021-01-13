import React, {useState, useContext} from "react";
import {Route} from "react-router-dom";
import {SideNavbar} from "./SideNavbar";
import {Files} from "./Files";
// import {Settings} from "./Settings";
import styles from "./Dashboard.module.css";

export function Dashboard() {
  return (
    <div className={styles.main}>
      <SideNavbar/>
      <div className={styles.content}>
        <Route path={"/dashboard/files"}>
          <Files/>
        </Route>
        <Route path={"/dashboard/settings"}>
          {/*<Settings/>*/}
        </Route>
      </div>
    </div>
  )
}