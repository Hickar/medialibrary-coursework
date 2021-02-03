import React, {useState, useEffect, useRef, useContext} from "react";
import {GalleryContext} from "../Contexts/GalleryContext";
import useFetch from "../Hooks/useFetch";

export default function AudioPlayer(props) {
	const [galleryState, dispatchGalleryAction] = useContext(GalleryContext);
	const audioRef = useRef();
	const [isPlaying, setIsPlaying] = useState(props.isActive);
	const [data, isLoading] = useFetch(
		`https://medialib.hickar.space/api?getUserFile&file_ID=${props.mediaItemActive.ID}`,
		"FILE"
	);

	useEffect(() => {
		const audioElement = audioRef.current;

		audioElement.addEventListener("canplaythrough", handleLoad)
		audioElement.addEventListener("ended", handleAudioEnd);
		audioElement.addEventListener("timeupdate", handleTimeUpdate);

		return () => {
			audioElement.removeEventListener("canplaythrough", handleLoad)
			audioElement.removeEventListener("ended", handleAudioEnd);
			audioElement.removeEventListener("timeupdate", handleTimeUpdate);
		}
	});

	function handleAudioEnd() {
		dispatchGalleryAction({type: "toggleAudioPlayer", payload: props.mediaItemActive});
	}

	function handleTimeUpdate(e) {
		dispatchGalleryAction({type: "setAudioCurrentTime", payload: e.target.currentTime});
	}

	function handleLoad(e) {
		dispatchGalleryAction({type: "setAudioDuration", payload: e.target.duration});
	}

	useEffect(() => {
		audioRef.current.currentTime = galleryState.audioClickedTime;
	}, [galleryState.audioClickedTime])

	useEffect(() => {
		if (isPlaying) {
			audioRef.current.play();
		} else {
			audioRef.current.pause();
		}
	}, [isPlaying]);

	return (
		<audio ref={audioRef} src={isLoading ? null : data}>
			<p>Ваш браузер не поддерживает HTML5 элемент <code>Audio</code></p>
		</audio>
	)
}