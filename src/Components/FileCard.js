import styles from "./FileCard.module.css";
import React, {useState} from "react";
import playIcon from "../assets/audioPlayIcon.svg";
import pauseIcon from "../assets/audioPauseIcon.svg";
import documentIcon from "../assets/documentIcon.svg";

export function FileCard(props) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const mediaData = props.mediafile;
  const mediaElement = getTypeSpecificMediaElement(mediaData.file_type);

  function handleClick(e) {
    if (props.onClick) {
      props.onClick(e);
    }
    if (mediaData.type === "audio") {
      setIsAudioPlaying(!isAudioPlaying);
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
                    alt={"Audio play/pause button"}/>
      // return <svg data-is-active={isMediaPlaying} className={styles.audio_button} width="128" height="128"
      // 						viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      // 	<circle cx="64" cy="64" r="62" stroke="#4E4E4E" stroke-width="4"/>
      // 	<g className={styles.audio_button_pause}>
      // 		<rect x="46" y="32" width="10" height="64" fill="#4E4E4E"/>
      // 		<rect x="72" y="32" width="10" height="64" fill="#4E4E4E"/>
      // 	</g>
      // 	<path className={styles.audio_button_play} d="M89 64L51.5 91.7128L51.5 36.2872L89 64Z" fill="#4E4E4E"/>
      // </svg>;
      case "document":
        return <a className={styles.link_download} href={mediaData.src} download>
          <img className={styles.thumbnail_default}
               src={documentIcon}
               alt={"Document Icon"}/>
        </a>;
      default:
        throw Error();
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.media_wrapper}>
          <div className={styles.link} data-src={mediaData.src} data-type={mediaData.type} onClick={handleClick}/>
          {mediaElement}
          {isAudioPlaying === true ?
            <input type={"range"} className={styles.progress_bar} min={"0"} max={"100"} value={"0"}/>
            : null}
        </div>
        <div className={styles.info}>
          <div className={styles.title}>{mediaData.file_name}</div>
          {/*<div className={styles.text}>{mediaData.text}</div>*/}
        </div>
      </div>
    </div>
  );
}