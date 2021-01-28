import React from "react";
import styles from "./LoadingSpinner.module.css";
import spinnerIcon from "../assets/spinner_Icon.svg";

export default function LoadingSpinner() {
  return (
    <div className={styles.wrapper}>
      <img className={styles.spinner} src={spinnerIcon} alt={"Loading spinner icon"}/>
    </div>
  )
}