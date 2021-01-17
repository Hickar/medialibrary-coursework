import "./app.css";
import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import {LoginPage} from "./Components/LoginPage";
import {Dashboard} from "./Components/Dashboard";
import {NotificationContext} from "./Components/NotificationContext";
import {Notification} from "./Components/Notification";

function App() {
  const [notificationStatus, setNotificationStatus] = useState({type: "", text: "", active: false});
  const [isAuthorized, setIsAuthorized] = useState(fetchIsAuthorized());

  async function fetchIsAuthorized() {
    const response = await fetch("http://medialibrary.local/modules/actions.php?isAuthorized", {
      method: "GET"
    });

    const data = await response.json();

    setIsAuthorized(data.message === true);
  }

  useEffect(() => {
    setIsAuthorized(fetchIsAuthorized());
  }, []);

  return (
    <NotificationContext.Provider value={setNotificationStatus}>
      <Notification status={notificationStatus}/>
      <Route path={"/"} render={() => {
        return isAuthorized ? <Redirect to={"/dashboard/files"}/> : <Redirect to={"/login"}/>;
      }}/>
      <Route path={"/dashboard"}>
        <Dashboard/>
      </Route>
      <Route path={"/login"}>
        <LoginPage/>
      </Route>
    </NotificationContext.Provider>
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
