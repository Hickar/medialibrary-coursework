import React, {useState, useEffect, useReducer, useContext, useRef} from "react";
import {GalleryContext} from "./GalleryContext";
import styles from "./GalleryViewModal.module.css";
import {readFile} from "../api/utils";

export default function GalleryViewModal(props) {
  const [items, setItems] = useState(props.mediaItems ?? []);
  const [itemActive, setItemActive] = useState(getTypeSpecificViewableElement(props.mediaItemActive));
  const [itemActiveIndex, setItemActiveIndex] = useReducer(
    activeIndexReducer,
    findActiveIndex(props.mediaItemActive),
    (arg) => { return arg });

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
    if (e.keyCode === 27) dispatchGalleryAction({type: "closeModal"});
    if (e.keyCode === 37) setItemActiveIndex({type: "previous"});
    if (e.keyCode === 39) setItemActiveIndex({type: "next"});
  }

  async function fetchUserFile(ID) {
    const actionURL = `http://medialibrary.local/modules/actions.php?getUserFile&file_ID=${ID}`
    const response = await fetch(actionURL, {
      method: "GET"
    });

    const fileRaw = await response.blob();
    const file = await readFile(fileRaw);
    return file;
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    document.body.classList.toggle("noscroll");
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.toggle("noscroll");
    };
  }, []);

  useEffect(() => {
    console.log("activeIndex useEffect()");
    const fetchActiveItemData = async () => {
      const activeItemID = items[itemActiveIndex].file_ID;
      const fileData = await fetchUserFile(activeItemID);
      const mediaElement = await getTypeSpecificViewableElement(items[itemActiveIndex], fileData);
      setItemActive(mediaElement);
    }

    fetchActiveItemData();
  }, [itemActiveIndex]);

  function getTypeSpecificViewableElement(mediaItem, mediaItemData) {
    const src = mediaItemData;
    const type = mediaItem.file_type;

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
      if (activeItem.file_ID === props.mediaItems[i].file_ID) return i;
    }
    return -1;
  }

  return (
    <div className={styles.overlay}>
      <div onClick={() => {
        dispatchGalleryAction({type: "closeModal"});
      }} className={styles.overlay_inner}/>
      <div className={styles.modal}>
        <div onClick={() => setItemActiveIndex({type: "previous"})}
             className={styles.nav_button + " " + styles.nav_button_left}/>
        {itemActive}
        <div onClick={() => setItemActiveIndex({type: "next"})}
             className={styles.nav_button + " " + styles.nav_button_right}/>
      </div>
    </div>
  );
}