import "./app.css"
import React, {useState} from "react";
import ReactDOM from "react-dom"
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import {LoginPage} from "./Components/LoginPage";
import {Dashboard} from "./Components/Dashboard";
import {NotificationContext} from "./Components/NotificationContext"
import {Notification} from "./Components/Notification";

function App() {
    const [notificationStatus, setNotificationStatus] = useState({type: "", text: "", active: false});

    return (
        <NotificationContext.Provider value={setNotificationStatus}>
            <Notification status={notificationStatus}/>
            <Route path={"/"}>
                <Redirect to={"/login"}/>
            </Route>
            <Route path={"/dashboard"}>
                <Dashboard/>
            </Route>
            <Route path={"/login"}>
                <LoginPage/>
            </Route>
        </NotificationContext.Provider>
    )
}

if (typeof window !== undefined) {
    ReactDOM.render(
        <Router>
            <App/>
        </Router>,
        document.getElementById("app")
    )
}
