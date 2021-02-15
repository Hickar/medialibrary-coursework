import "./app.css";
import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import useFetch from "./Hooks/useFetch";
import {NotificationContext} from "./Contexts/NotificationContext";
import {AuthContext} from "./Contexts/AuthContext";
import Notification from "./Components/Notification";

function App() {
	const [notificationState, dispatchNotificationAction] = useState({type: "", text: "", active: false});
	const [authQuery, setAuthQuery] = useState(`${process.env.HOST_API_URL}?isAuthed`);
	const [authState, isLoading, doFetch] = useFetch(authQuery);

	useEffect(() => {
		doFetch(authQuery);
	}, [authQuery]);

	return (
		<AuthContext.Provider value={setAuthQuery}>
			<NotificationContext.Provider value={dispatchNotificationAction}>
				<Notification status={notificationState}/>
				<Route path={"/"}>
					{isLoading ?
						null :
						authState.data ?
							<Redirect to={"/dashboard/files"}/> :
							<Redirect to={"/login"}/>
					}
				</Route>
				<Route path={"/dashboard"}>
					<Dashboard/>
				</Route>
				<Route path={"/login"}>
					<LoginPage/>
				</Route>
			</NotificationContext.Provider>
		</AuthContext.Provider>
	);
}

if (typeof window !== undefined) {
	ReactDOM.render(
		<Router>
			<App/>
		</Router>,
		document.getElementById("app")
	);
}
