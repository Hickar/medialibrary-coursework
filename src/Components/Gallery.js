import React, {useState, useRef, useEffect, useContext, useReducer} from "react";
import styles from "./Gallery.module.css";
import MediaCard from "./MediaCard";
import GalleryViewModal from "./GalleryViewModal";
import {NotificationContext} from "../Contexts/NotificationContext";
import {GalleryContext} from "../Contexts/GalleryContext";
import uploadFileIcon from "../assets/uploadFile_Icon.svg";
import useFetch from "../Hooks/useFetch";

export function Gallery() {
	const setNotification = useContext(NotificationContext);
	const fileInput = useRef();
	const [query, setQuery] = useState("http://medialibrary.local/modules/actions.php?getUserFiles");
	const [userData, isLoading, doFetch] = useFetch(query);

	const galleryInitialState = {
		isViewActive: false,
		isAudioActive: false,
		activeItem: null
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
				setQuery("http://medialibrary.local/modules/actions.php?getUserFiles&");
				doFetch(query);
				return state;

			case "enableMediaViewer":
				return {...state, isViewActive: true, activeItem: action.payload};

			case "disableMediaViewer":
				return {...state, isViewActive: false, activeItem: null}

			case "enableAudioPlayer":
				return {...state, isAudioActive: true, activeItem: action.payload}

			case "disableAudioPlayer":
				return {...state, isAudioActive: false}

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
		<GalleryContext.Provider value={dispatchGalleryAction}>
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
				{userData && !isLoading ? userData.data.map((file) => {
					return <MediaCard key={file.ID} mediafile={file}/>;
				}) : null}
			</div>
		</GalleryContext.Provider>
	);
}