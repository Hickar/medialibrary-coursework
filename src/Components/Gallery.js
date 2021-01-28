import React, {useState, useRef, useEffect, useContext, useReducer} from "react";
import styles from "./Gallery.module.css";
import MediaCard from "./MediaCard";
import GalleryViewModal from "./GalleryViewModal";
import AudioPlayer from "./AudioPlayer";
import LoadingSpinner from "./LoadingSpinner";
import {NotificationContext} from "../Contexts/NotificationContext";
import {GalleryContext} from "../Contexts/GalleryContext";
import uploadFileIcon from "../assets/uploadFile_Icon.svg";
import useFetch from "../Hooks/useFetch";

export default function Gallery() {
  const setNotification = useContext(NotificationContext);
  const fileInput = useRef();
  const [query, setQuery] = useState("http://medialibrary.local/modules/actions.php?getUserFiles");
  const [userData, isLoading, doFetch] = useFetch(query);

  const galleryInitialState = {
    isViewActive: false,
    isAudioActive: false,
    activeItem: null,
    audioCurrentTime: 0,
    audioDuration: 0,
    audioClickedTime: 0
  };

  const [galleryState, dispatchGalleryAction] = useReducer(
    galleryReducer,
    galleryInitialState,
    (arg) => {
      return arg;
    });

  function galleryReducer(state, action) {
    switch (action.type) {
      case "reload":
        setQuery(query + " ");
        return state;

      case "enableMediaViewer":
        return {...state, isViewActive: true, activeItem: action.payload};

      case "disableMediaViewer":
        return {...state, isViewActive: false, activeItem: null};

      case "toggleAudioPlayer":
        if (state.isAudioActive && state.activeItem === action.payload) {
          return {
            ...state,
            isAudioActive: false,
            activeItem: null
          };
        } else if (state.isAudioActive && state.activeItem !== action.payload) {
          return {
            ...state,
            activeItem: action.payload
          };
        } else {
          return {
            ...state,
            isAudioActive: true,
            activeItem: action.payload
          };
        }

      case "setAudioCurrentTime":
        return {
          ...state,
          audioCurrentTime:
          action.payload
        };

      case "setAudioDuration":
        return {
          ...state,
          audioDuration: action.payload
        };

      case "setAudioClickedTime":
        return {
          ...state,
          audioCurrentTime: action.payload,
          audioClickedTime: action.payload
        };

      default:
        return state;
    }
  }

  function handleClickOnUploadFiles() {
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

    const response = await fetch("http://medialibrary.local/modules/actions.php?uploadFiles", {
      body: formData,
      method: "POST"
    });

    const data = await response.json();

    if (!data.err) {
      setNotification({type: "message", text: data.data, active: true});
      dispatchGalleryAction({type: "reload"});
    } else {
      setNotification({type: "error", text: data.data, active: true});
    }
  }

  useEffect(() => {
    doFetch(query);
  }, [query]);

  useEffect(() => {
    if (fileInput.current) {
      fileInput.current.addEventListener("change", uploadFiles);
    }
    return () => {
      if (fileInput.current) {
        fileInput.current.removeEventListener("change", uploadFiles);
      }
    };
  }, [isLoading]);

  return (
    <GalleryContext.Provider value={[galleryState, dispatchGalleryAction]}>
      {
        galleryState.isViewActive === true ?
          <GalleryViewModal
            mediaItems={userData.data.filter(file =>
              file.type === "image" || file.type === "video"
            )}
            mediaItemActive={galleryState.activeItem}/>
          : null
      }
      <input ref={fileInput} className={styles.hidden} type={"file"} multiple/>
      <div className={styles.toolbar}>
        <button className={styles.toolbar_item} onClick={handleClickOnUploadFiles}>
          <img className={styles.toolbar_item_icon} src={uploadFileIcon} alt={"File upload button"}/>
        </button>
      </div>
      <div className={styles.files_wrapper}>
        {userData && galleryState.isAudioActive && galleryState.activeItem ?
          <AudioPlayer
            mediaItemActive={galleryState.activeItem}
            isActive={galleryState.isAudioActive}
          /> :
          null
        }
        {userData && !isLoading ? userData.data.map((file) => {
            if (galleryState.activeItem && file.ID === galleryState.activeItem.ID && file.type === "audio") {
              return <MediaCard
                key={file.ID}
                mediafile={file}
                isAudioPlaying={galleryState.activeItem.ID === file.ID}
                currentTime={galleryState.audioCurrentTime}
                duration={galleryState.audioDuration}
              />;
            } else {
              return <MediaCard
                key={file.ID}
                mediafile={file}
              />;
            }
          }) :
          <LoadingSpinner/>
        }
      </div>
    </GalleryContext.Provider>
  );
}