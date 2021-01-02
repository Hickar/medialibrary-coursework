import "./app.css"
import React from "react";
import ReactDOM from "react-dom"

function Test() {
	return (
		<p className={"test__paragraph"}>Wow! It is actually works!</p>
	)
}

if (typeof window !== undefined) {
	ReactDOM.render(<Test/>, document.getElementById("app"));
}
