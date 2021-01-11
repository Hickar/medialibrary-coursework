import React, {useState} from "react";
import styles from "./Files.module.css";
import {FileCard} from "./FileCard";

export function Files(props) {
  return (
    <div className={styles.files_wrapper}>
      <FileCard mediafile={{type: "document"}}/>
      <FileCard mediafile={{type: "document"}}/>
      <FileCard mediafile={{type: "document"}}/>
      <FileCard mediafile={{type: "document"}}/>
      <FileCard mediafile={{type: "document"}}/>
      <FileCard mediafile={{type: "document"}}/>
      <FileCard mediafile={{type: "document"}}/>
      <FileCard mediafile={{type: "document"}}/>
      <FileCard mediafile={{type: "document"}}/>
      <FileCard mediafile={{type: "document"}}/>
      <FileCard mediafile={{type: "document"}}/>
      <FileCard mediafile={{type: "document"}}/>
      <FileCard mediafile={{type: "document"}}/>
      <FileCard mediafile={{type: "document"}}/>
    </div>
  )
}