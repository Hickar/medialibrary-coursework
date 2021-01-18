import React, {useEffect, useReducer, useContext} from "react";
import {GalleryContext} from "./GalleryContext";
import styles from "./GalleryViewModal.module.css";
import {readFile} from "../api/utils";

export default function GalleryViewModal(props) {
  const mediaItems = props.mediaItems;
  const [activeIndex, dispatch] = useReducer(activeIndexReducer, findActiveIndex(props.mediaItemActive), (props) => {
    return props;
  });
  const mediaItemActive = mediaItems[activeIndex];
  const mediaElement = getTypeSpecificViewableElement(mediaItemActive.file_type);
  const dispatchGalleryAction = useContext(GalleryContext);

  function activeIndexReducer(state, action) {
    switch (action.type) {
      case "previous":
        if (state === 0) state = mediaItems.length - 1;
        else state--;
        break;
      case "next":
        if (state === mediaItems.length - 1) state = 0;
        else state++;
        break;
    }
    return state;
  }

  function handleKeyDown(e) {
    if (e.keyCode === 27) dispatchGalleryAction({type: "closeModal"});
    if (e.keyCode === 37) dispatch({type: "previous"});
    if (e.keyCode === 39) dispatch({type: "next"});
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    document.body.classList.toggle("noscroll");
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.toggle("noscroll");
    };
  }, []);

  function getTypeSpecificViewableElement(type) {
    switch (type) {
      case "image":
        return <img className={styles.content} src={mediaItemActive.src} alt={"Photo"}/>;
      case "video":
        return <video className={styles.content} src={mediaItemActive.src} controls/>;
      default:
        return null;
    }
  }

  function findActiveIndex(activeItem) {
    for (let i = 0; i < mediaItems.length; i++) {
      if (activeItem.file_ID === mediaItems[i].file_ID) return i;
    }
    return -1;
  }

  return (
    <div className={styles.overlay}>
      <div onClick={() => {
        dispatchGalleryAction({type: "closeModal"});
      }} className={styles.overlay_inner}/>
      <div className={styles.modal}>
        <div onClick={() => dispatch({type: "previous"})}
             className={styles.nav_button + " " + styles.nav_button_left}/>
        {mediaElement}
        <div onClick={() => dispatch({type: "next"})}
             className={styles.nav_button + " " + styles.nav_button_right}/>
      </div>
    </div>
  );
}