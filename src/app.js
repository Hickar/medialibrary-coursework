import "./app.css"
import React from "react";
import ReactDOM from "react-dom"
// import "react-hot-loader/patch";
import {BrowserRouter as Router, Route, Redirect, Switch, Link} from "react-router-dom";
import {LoginPage} from "./Components/LoginPage";

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route path={"/"}>
                        <Redirect to={"/login"}/>
                    </Route>
                    <Route path={"/dashboard"}>
                        <p className={"test__paragraph"}>Dashboard</p>
                        {/*<Dashboard/>*/}
                    </Route>
                    <Route path={"/login"}>

                    </Route>
                </Switch>
                <LoginPage/>
            </Router>
        </>
    )
}

if (typeof window !== undefined) {
    ReactDOM.render(<App/>, document.getElementById("app"))
}
