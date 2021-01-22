import "./app.css";
import React, {useState, useLayoutEffect} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import {LoginPage} from "./Pages/LoginPage";
import {Dashboard} from "./Pages/Dashboard";
import {NotificationContext} from "./Contexts/NotificationContext";
import {Notification} from "./Components/Notification";

function App() {
  const [notificationState, dispatchNotificationAction] = useState({type: "", text: "", active: false});
  const [isAuthorized, setIsAuthorized] = useState(fetchIsAuthorized());

  async function fetchIsAuthorized() {
    const response = await fetch("http://medialibrary.local/modules/actions.php?isAuthorized", {
      method: "GET"
    });

    const data = await response.json();

    setIsAuthorized(data.data === true);
  }

  useLayoutEffect(() => {
    setIsAuthorized(fetchIsAuthorized());
  }, []);

  return (
    <NotificationContext.Provider value={dispatchNotificationAction}>
      <Notification status={notificationState}/>
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
