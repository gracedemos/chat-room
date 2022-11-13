import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import Login from "./login";
import {HashRouter, Route, Routes} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));



root.render(
    <HashRouter>
        <Routes>
            <Route path="/" exact element={<Login/>}/>
            <Route path="/app" element={<App/>}/>
        </Routes>
    </HashRouter>
);