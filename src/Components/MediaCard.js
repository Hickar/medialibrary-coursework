import styles from "./MediaCard.module.css";
import React, {useState, useRef, useContext} from "react";
import {NotificationContext} from "./NotificationContext";
import {GalleryContext} from "./GalleryContext";
import playIcon from "../assets/audioPlay_Icon.svg";
import pauseIcon from "../assets/audioPause_Icon.svg";
import documentIcon from "../assets/document_Icon.svg";

export default function MediaCard(props) {
  // const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const mediaFile = props.mediafile;
  const mediaContentElement = getTypeSpecificMediaElement(mediaFile.file_type);
  const downloadLinkRef = useRef();
  const dispatchNotificationAction = useContext(NotificationContext);
  const dispatchGalleryAction = useContext(GalleryContext);

  async function handleClickOnMediaWrapper() {
    if (mediaFile.file_type === "document" || mediaFile.file_type === "other") {
      handleClickOnDownload();
    } else {
      dispatchGalleryAction({type: "setActiveItem", data: mediaFile});
    }
  }

  async function handleClickOnDownload() {
    const fileID = mediaFile.file_ID;
    const filename = mediaFile.file_name;
    const actionURL = `http://medialibrary.local/modules/actions.php?downloadUserFile&file_ID=${fileID}`;
    const response = await fetch(actionURL, {
      method: "GET"
    });

    const fileBlob = await response.blob();
    const URL = window.URL || window.webkitURL;
    const downloadURL = await URL.createObjectURL(fileBlob);

    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = downloadURL;
      downloadLinkRef.current.download = filename ?? "Без имени";
      downloadLinkRef.current.click();
    }

    URL.revokeObjectURL(downloadURL);
  }

  async function handleClickOnDelete() {
    const fileID = mediaFile.file_ID;
    const actionURL = `http://medialibrary.local/modules/actions.php?deleteUserFile&file_ID=${fileID}`;
    const response = await fetch(actionURL, {
      method: "DELETE"
    });

    const data = await response.json();

    if (data.err) {
      dispatchNotificationAction({type: "error", text: data.message, active: true});
    } else {
      dispatchGalleryAction({type: "reload"});
    }
  }

  function getTypeSpecificMediaElement(type) {
    switch (type) {
      case "image":
      case "video":
        return <img className={styles.thumbnail}
                    src={mediaFile.src}
                    alt={"Media file thumbnail"}
                    onClick={handleClickOnMediaWrapper}/>;
      case "audio":
        return <img className={styles.thumbnail_default}
                    src={isAudioPlaying ? pauseIcon : playIcon}
                    alt={"Audio play/pause button"}/>;
      case "other":
      case "document":
        return <div className={styles.thumbnail_default_wrapper}>
          <img className={styles.thumbnail_default}
               src={documentIcon}
               alt={"Document Icon"}/>
        </div>;
      default:
        throw Error();
    }
  }

  return (
    <React.StrictMode>
      <div className={styles.wrapper}>
        <a className={styles.hidden} ref={downloadLinkRef} href={""}/>
        <div className={styles.card}>
          <div className={styles.media_wrapper}>
            <div
              className={styles.link}
              data-src={mediaFile.src}
              data-filename={mediaFile.file_name}
              data-id={mediaFile.file_ID}
              data-type={mediaFile.file_type}
              onClick={handleClickOnMediaWrapper}/>
            {mediaContentElement}
            {/*{isAudioPlaying === true ?*/}
            {/*  <input type={"range"} className={styles.progress_bar} min={"0"} max={"100"} value={"0"}/>*/}
            {/*  : null}*/}
          </div>
          <div className={styles.info}>
            <div className={styles.title}>{mediaFile.file_name}</div>
            <div className={styles.meta_row}>
              <div className={styles.date_added}>{mediaFile.date_added}</div>
              <div className={styles.dropdown_icon}>
                <div className={styles.dropdown_menu}>
                  <div onClick={handleClickOnDownload} className={styles.dropdown_menuitem}>Скачать</div>
                  <div onClick={handleClickOnDelete} className={styles.dropdown_menuitem}>Удалить</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
}