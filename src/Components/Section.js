import React from "react";
import styles from "./Section.module.css";

export default function Section(props) {
  return (
    <section className={styles.section}>
      <div className={styles.section_container}>
        {props.children}
      </div>
    </section>
  );
}