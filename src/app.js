import "./app.css"
import React from "react";
import ReactDOM from "react-dom"
import {BrowserRouter as Router, Route, Redirect, Switch, Link} from "react-router-dom";
import {LoginPage} from "./Components/LoginPage";

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route path={"/"}>
                        <Redirect to={"/login"}/>
                        <LoginPage/>
                    </Route>
                    <Route path={"/dashboard"}>
                        <p className={"test__paragraph"}>Dashboard</p>
                        {/*<Dashboard/>*/}
                    </Route>
                    <Route path={"/login"}>

                    </Route>
                </Switch>
            </Router>
        </>
    )
}

if (typeof window !== undefined) {
    ReactDOM.render(<App/>, document.getElementById("app"))
}
