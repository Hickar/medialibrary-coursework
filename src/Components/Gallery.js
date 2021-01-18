import React, {useState, useRef, useEffect, useContext, useReducer} from "react";
import styles from "./Gallery.module.css";
import MediaCard from "./MediaCard";
import GalleryViewModal from "./GalleryViewModal";
import {NotificationContext} from "./NotificationContext";
import {GalleryContext} from "./GalleryContext";
import uploadFileIcon from "../assets/uploadFile_Icon.svg";
import {readFile} from "../api/utils";

export function Gallery() {
  const setNotification = useContext(NotificationContext);
  const fileInput = useRef();
  const [userFilesFetched, setUserFilesFetched] = useState(false);
  const [userFiles, setUserFiles] = useState([]);

  const galleryInitialState = {
    isViewActive: false,
    activeItem: null
  };

  const [galleryState, dispatchGalleryAction] = useReducer(
    galleryReducer,
    galleryInitialState,
    (arg) => {
      return arg;
    });


  function galleryReducer(state, action) {
    if (action.type === "reload") {
      setUserFilesFetched(false);
      return {isViewActive: state.isViewActive, activeItem: state.activeItem};
    }

    if (action.type === "setActiveItem") {
      return {isViewActive: true, activeItem: action.data};
    }

    if (action.type === "closeModal") {
      return {isViewActive: false, activeItem: null};
    }

    return state;
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
      setNotification({type: "message", text: data.message, active: true});
      setUserFilesFetched(false);
    } else {
      setNotification({type: "error", text: data.message, active: true});
    }
  }

  async function fetchUserFiles() {
    const response = await fetch("http://medialibrary.local/modules/actions.php?getUserFiles", {
      method: "GET"
    });

    const fileRows = await response.json();

    for (const file of fileRows.message) {
      if (file.file_type === "document" || file.file_type === "other") {
        continue;
      } else {
        const file_ID = file.file_ID;
        const actionURL = `http://medialibrary.local/modules/actions.php?getUserFile&file_ID=${file_ID}`;
        const response = await fetch(actionURL, {
          method: "GET"
        });

        const fileRaw = await response.blob();
        file.src = await readFile(fileRaw);
      }
    }

    await setUserFiles(fileRows.message);
    await setUserFilesFetched(true);
  }


  useEffect(() => {
    if (!userFilesFetched) {
      fetchUserFiles();
    }
  }, [userFilesFetched]);

  useEffect(() => {
    if (fileInput.current) {
      fileInput.current.addEventListener("change", uploadFiles);
    }
    return () => {
      if (fileInput.current) {
        fileInput.current.removeEventListener("change", uploadFiles);
      }
    };
  }, []);

  return (
    <GalleryContext.Provider value={dispatchGalleryAction}>
      {
        galleryState.isViewActive === true ?
          <GalleryViewModal mediaItems={userFiles}
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
        {userFilesFetched ? userFiles.map((file) => {
          return <MediaCard key={file.file_ID} mediafile={file}/>;
        }) : null}
      </div>
    </GalleryContext.Provider>
  );
}