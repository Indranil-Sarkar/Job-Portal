import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Signin from "./Signin";
import RealApp from "./RealApp";
import { BrowserRouter as Router } from "react-router-dom";


ReactDOM.render(
    <Router>
    <RealApp />
    </Router>
    ,document.getElementById("root")
);
