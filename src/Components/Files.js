import React, {useState, useRef, useEffect, useContext} from "react";
import styles from "./Files.module.css";
import {FileCard} from "./FileCard";
import {NotificationContext} from "./NotificationContext";
import uploadFileIcon from "../assets/uploadFile_Icon.svg";

export function Files(props) {
  const setNotification = useContext(NotificationContext);
  const fileInput = useRef();

  function handleClickOnUploadFiles(e) {
    if (fileInput.current) {
      fileInput.current.click();
    }
  }

  async function uploadFiles(e) {
    const files = e.target.files ?? e.dataTransfer.files;
    const formData = new FormData();

    for (const file of files) {
      formData.append("files[]", file, file.name);
    }

    console.log("formData: " + Object.keys(formData));

    const response = await fetch("http://medialibrary.local/modules/actions.php?uploadFiles", {
      body: formData,
      method: "POST"
    });

    const data = await response.json();

    if (!data.err) {
      setNotification({type: "message", text: data.message, active: true});
    } else {
      setNotification({type: "error", text: data.message, active: true});
    }
  }

  useEffect(() => {
    if (fileInput.current) {
      fileInput.current.addEventListener("change", uploadFiles);
    }
  }, []);

  return (
    <>
      <input ref={fileInput} className={styles.hidden} type={"file"} multiple/>
      <div className={styles.toolbar}>
        <button className={styles.toolbar_item} onClick={handleClickOnUploadFiles}>
          <img className={styles.toolbar_item_icon} src={uploadFileIcon} alt={"File upload button"}/>
        </button>
      </div>
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
    </>
  );
}