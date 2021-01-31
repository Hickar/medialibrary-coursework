import styles from "./GalleryViewModal.module.css";
import React, {useState, useEffect, useReducer, useContext} from "react";
import useFetch from "../Hooks/useFetch";
import {GalleryContext} from "../Contexts/GalleryContext";
import {NotificationContext} from "../Contexts/NotificationContext";
import LoadingSpinner from "./LoadingSpinner";

export default function GalleryViewModal(props) {
  const initialState = {
    items: props.mediaItems ?? [],
    itemActive: props.mediaItemActive ?? {},
    itemActiveIndex: findActiveIndex(props.mediaItemActive) ?? 0
  };
  const [state, dispatch] = useReducer(
    itemsReducer,
    initialState,
    (arg) => {
      return arg;
    });

  const [query, setQuery] = useState(
    `https://medialib.hickar.space/actions.php?getUserFile&file_ID=${props.mediaItemActive.ID}`
  );
  const [data, isLoading, doFetch] = useFetch(
    query,
    "FILE"
  );

  const [_, dispatchGalleryAction] = useContext(GalleryContext);
  const dispatchNotificationAction = useContext(NotificationContext);

  function itemsReducer(state, action) {
    let newIndex = state.itemActiveIndex;

    switch (action.type) {
      case "previous":
        state.itemActiveIndex === 0 ?
          newIndex = state.items.length - 1 :
          newIndex--;
        break;
      case "next":
        state.itemActiveIndex === state.items.length - 1 ?
          newIndex = 0 :
          newIndex++;
        break;
      default:
        return state;
    }

    return {
      ...state,
      itemActive: state.items[newIndex],
      itemActiveIndex: newIndex
    };
  }

  function handleKeyDown(e) {
    if (e.keyCode === 27) dispatchGalleryAction({type: "disableMediaViewer"});
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

  useEffect(() => {
    setQuery(`https://medialib.hickar.space/actions.php?getUserFile&file_ID=${state.itemActive.ID}`);
  }, [state.itemActive]);

  useEffect(() => {
    doFetch(query);
  }, [query]);

  function getTypeSpecificViewableElement(type, data) {
    switch (type) {
      case "image":
        return <img className={styles.content} src={data} alt={"Photo"}/>;
      case "video":
        return <video className={styles.content} src={data} controls/>;
      default:
        dispatchNotificationAction({
          type: "error",
          text: "Воспроизведение медиафайла данного формата не поддерживается медиа-проигрываетелем",
          active: true
        });
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
        <div onClick={() => dispatch({type: "previous"})}
             className={styles.nav_button + " " + styles.nav_button_left}
        />
        {isLoading ?
          <LoadingSpinner/> :
          getTypeSpecificViewableElement(state.itemActive.type, data)
        }
        <div onClick={() => dispatch({type: "next"})}
             className={styles.nav_button + " " + styles.nav_button_right}
        />
      </div>
    </div>
  );
}