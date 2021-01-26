import React from "react";
import {Route} from "react-router-dom";
import SideNavbar from "../Components/SideNavbar";
import Gallery from "../Components/Gallery";
// import {Settings} from "./Settings";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
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