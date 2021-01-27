import styles from "./MediaCard.module.css";
import React, {useState, useRef, useContext, useEffect} from "react";
import {NotificationContext} from "../Contexts/NotificationContext";
import {GalleryContext} from "../Contexts/GalleryContext";
import useFetch from "../Hooks/useFetch";
import playIcon from "../assets/audioPlay_Icon.svg";
import pauseIcon from "../assets/audioPause_Icon.svg";
import documentIcon from "../assets/document_Icon.svg";

export default function MediaCard(props) {
	const mediaFile = props.mediafile;
	const downloadLinkRef = useRef();
	const isAudioPlaying = props.isAudioPlaying ?? false;
	const [data, isLoading] = useFetch(
		`http://medialibrary.local/modules/actions.php?getUserFile&file_ID=${mediaFile.ID}&thumb`,
		"FILE"
	)
	const dispatchNotificationAction = useContext(NotificationContext);
	const [_, dispatchGalleryAction] = useContext(GalleryContext);

	async function handleClickOnMediaWrapper() {
		if (mediaFile.type === "document" || mediaFile.type === "other") {
			await handleClickOnDownload();
			return;
		}

		if (mediaFile.type === "image" || mediaFile.type === "video") {
			dispatchGalleryAction({type: "enableMediaViewer", payload: mediaFile});
			return;
		}

		if (mediaFile.type === "audio") {
			dispatchGalleryAction({type: "toggleAudioPlayer", payload: isAudioPlaying ? null : mediaFile});
			return;
		}
	}

	async function handleClickOnDownload() {
		const filename = mediaFile.name;
		const actionURL = `http://medialibrary.local/modules/actions.php?downloadUserFile&file_ID=${mediaFile.ID}`;
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
		const actionURL = `http://medialibrary.local/modules/actions.php?deleteUserFile&file_ID=${mediaFile.ID}`;
		const response = await fetch(actionURL, {
			method: "DELETE"
		});

		const data = await response.json();

		if (data.err) {
			dispatchNotificationAction({type: "error", text: data.data, active: true});
		} else {
			dispatchGalleryAction({type: "reload"});
		}
	}

	function handleClickOnTimeTrack(e) {
		dispatchGalleryAction({type: "setAudioClickedTime", payload: e.target.value})
	}

	function getTypeSpecificThumbnail(type, data) {
		switch (type) {
			case "image":
			case "video":
				return <img className={styles.thumbnail}
										src={data}
										alt={"Media file thumbnail"}
										onClick={handleClickOnMediaWrapper}/>;
			case "audio":
				return <div className={styles.thumbnail_default_wrapper}>
					<img className={styles.thumbnail_default}
							 src={isAudioPlaying ? pauseIcon : playIcon}
							 alt={"Audio play/pause button"}/>
				</div>;
			case "other":
			case "document":
			default:
				return <div className={styles.thumbnail_default_wrapper}>
					<img className={styles.thumbnail_default}
							 src={documentIcon}
							 alt={"Document Icon"}/>
				</div>;
		}
	}

	return (
		<div className={styles.wrapper}>
			<a className={styles.hidden} ref={downloadLinkRef} href={""}/>
			<div className={styles.card}>
				<div className={styles.media_wrapper}>
					<div
						className={styles.link}
						onClick={handleClickOnMediaWrapper}/>
					{isLoading ? null : getTypeSpecificThumbnail(mediaFile.type, data)}
					{isAudioPlaying ?
						<input type={"range"}
									 className={styles.progress_bar}
									 min={"0"}
									 max={props.duration}
									 defaultValue={props.currentTime}
									 value={props.currentTime}
									 onChange={handleClickOnTimeTrack}
						/>
						: null}
				</div>
				<div className={styles.info}>
					<div className={styles.title}>{mediaFile.name}</div>
					<div className={styles.meta_row}>
						<div className={styles.date_added}>{mediaFile.dateAdded}</div>
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
	);
}