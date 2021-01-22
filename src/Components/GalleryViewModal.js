import styles from "./GalleryViewModal.module.css";
import React, {useState, useEffect, useReducer, useContext, useRef} from "react";
import useFetch from "../Hooks/useFetch";
import {GalleryContext} from "../Contexts/GalleryContext";

export default function GalleryViewModal(props) {
  const items = props.mediaItems ?? [];
  const [itemActiveIndex, setItemActiveIndex] = useReducer(
    activeIndexReducer,
    findActiveIndex(props.mediaItemActive),
    (arg) => {
      return arg;
    });

  const [data, isLoading] = useFetch(
    `http://medialibrary.local/modules/actions.php?getUserFile&file_ID=${items[itemActiveIndex].ID}`,
    "FILE"
  )

  const itemActive = getTypeSpecificViewableElement(items[itemActiveIndex], data);

  const dispatchGalleryAction = useContext(GalleryContext);

  function activeIndexReducer(state, action) {
    switch (action.type) {
      case "previous":
        if (state === 0) state = items.length - 1;
        else --state;
        break;
      case "next":
        if (state === items.length - 1) state = 0;
        else ++state;
        break;
    }

    return state;
  }

  function handleKeyDown(e) {
    if (e.keyCode === 27) dispatchGalleryAction({type: "disableMediaViewer"});
    if (e.keyCode === 37) setItemActiveIndex({type: "previous"});
    if (e.keyCode === 39) setItemActiveIndex({type: "next"});
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    document.body.classList.toggle("noscroll");
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.toggle("noscroll");
    };
  }, []);

  function getTypeSpecificViewableElement(mediaItem, mediaItemData) {
    const src = mediaItemData;
    const type = mediaItem.type;

    switch (type) {
      case "image":
        return <img className={styles.content} src={src} alt={"Photo"}/>;
      case "video":
        return <video className={styles.content} src={src} controls/>;
      default:
        return null;
    }
  }

  function findActiveIndex(activeItem) {
    for (let i = 0; i < props.mediaItems.length; i++) {
      if (activeItem.ID === props.mediaItems[i].ID) return i;
    }
    return -1;
  }

  return (
    <div className={styles.overlay}>
      <div onClick={() => {
        dispatchGalleryAction({type: "disableMediaViewer"});
      }} className={styles.overlay_inner}/>
      <div className={styles.modal}>
        <div onClick={() => setItemActiveIndex({type: "previous"})}
             className={styles.nav_button + " " + styles.nav_button_left}/>
        {isLoading ? null : itemActive}
        <div onClick={() => setItemActiveIndex({type: "next"})}
             className={styles.nav_button + " " + styles.nav_button_right}/>
      </div>
    </div>
  );
}