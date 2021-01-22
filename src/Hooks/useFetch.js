import React, {useState, useEffect} from "react";
import {readFile} from "../api/utils";

export default function UseFetch(initialURL, outputType = "") {
	const [URL, setURL] = useState(initialURL)
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState([]);

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);

			let responseData;
			const response = await fetch(URL, {
				method: "GET"
			});

			switch (outputType.toUpperCase()) {
				case "BLOB":
					responseData = await response.blob();
					break;
				case "FILE":
					const blob = await response.blob();
					responseData = await readFile(blob);
					break;
				case "JSON":
				default:
					responseData = await response.json();
					break;
			}

			setData(responseData);
			setIsLoading(false);
		}

		fetchData();
	}, [URL]);

	return [data, isLoading, setURL];
}