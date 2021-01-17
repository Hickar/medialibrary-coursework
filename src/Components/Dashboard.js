import React, {useState, useContext} from "react";
import {Route} from "react-router-dom";
import {SideNavbar} from "./SideNavbar";
import {Gallery} from "./Gallery";
// import {Settings} from "./Settings";
import styles from "./Dashboard.module.css";

export function Dashboard() {
  return (
    <div className={styles.main}>
      <SideNavbar/>
      <div className={styles.content}>
        <Route path={"/dashboard/files"}>
          <Gallery/>
        </Route>
        <Route path={"/dashboard/settings"}>
          {/*<Settings/>*/}
        </Route>
      </div>
    </div>
  )
}