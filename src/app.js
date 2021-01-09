import "./app.css"
import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom"
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import {LoginPage} from "./Components/LoginPage";
import {Dashboard} from "./Components/Dashboard";
import {AuthorizationContext} from "./Components/AuthorizationContext";
import {NotificationContext} from "./Components/NotificationContext"
import {Notification} from "./Components/Notification";

function App() {
  const [notificationStatus, setNotificationStatus] = useState({type: "", text: "", active: false});
  const [isAuthorized, setIsAuthorized] = useState(false);

  return (
    <NotificationContext.Provider value={setNotificationStatus}>
      <Notification status={notificationStatus}/>
      <AuthorizationContext.Provider value={setIsAuthorized}>
        <Route path={"/"}>
          {isAuthorized ? <Redirect to={"/dashboard"}/> : <Redirect to={"/login"}/>}
        </Route>
        <Route path={"/dashboard"}>
          <Dashboard/>
        </Route>
        <Route path={"/login"}>
          <LoginPage/>
        </Route>
      </AuthorizationContext.Provider>
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
