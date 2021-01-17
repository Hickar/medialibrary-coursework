import styles from "./FileCard.module.css";
import React, {useState, useRef} from "react";
import playIcon from "../assets/audioPlayIcon.svg";
import pauseIcon from "../assets/audioPauseIcon.svg";
import documentIcon from "../assets/documentIcon.svg";

export function FileCard(props) {
  // const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const mediaData = props.mediafile;
  const mediaElement = getTypeSpecificMediaElement(mediaData.file_type);
  const downloadElement = useRef();

  async function handleClick(e) {
    if (mediaData.file_type === "document" || mediaData.file_type === "other") {
      const fileID = e.target.dataset.id;
      const filename = e.target.dataset.filename;
      const actionURL = `http://medialibrary.local/modules/actions.php?downloadUserFile&file_ID=${fileID}`;
      const response = await fetch(actionURL, {
        method: "GET"
      });

      const fileBlob = await response.blob();
      const URL = window.URL || window.webkitURL;
      const downloadURL = await URL.createObjectURL(fileBlob);

      if (downloadElement.current) {
        downloadElement.current.href = downloadURL;
        downloadElement.current.download = filename ?? "Без имени";
        downloadElement.current.click();
      }

      URL.revokeObjectURL(downloadURL);
    }
  }

  function getTypeSpecificMediaElement(type) {
    switch (type) {
      case "image":
      case "video":
        return <img className={styles.thumbnail}
                    src={mediaData.src}
                    alt={"Media file thumbnail"}/>;
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
    <div className={styles.wrapper}>
      <a className={styles.hidden} ref={downloadElement} href={""}/>
      <div className={styles.card}>
        <div className={styles.media_wrapper}>
          <div
            className={styles.link}
            data-src={mediaData.src}
            data-filename={mediaData.file_name}
            data-id={mediaData.file_ID}
            data-type={mediaData.file_type}
            onClick={handleClick}/>
          {mediaElement}
          {/*{isAudioPlaying === true ?*/}
          {/*  <input type={"range"} className={styles.progress_bar} min={"0"} max={"100"} value={"0"}/>*/}
          {/*  : null}*/}
        </div>
        <div className={styles.info}>
          <div className={styles.title}>{mediaData.file_name}</div>
          <div className={styles.date_added}>{mediaData.date_added}</div>
        </div>
      </div>
    </div>
  );
}