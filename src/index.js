import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import Login from "./login";

const root = ReactDOM.createRoot(document.getElementById("root"));

if(window.location.pathname == "/") {
    root.render(
        <Login/>
    );
}else if(window.location.pathname == "/app") {
    root.render(
        <App/>
    )
}