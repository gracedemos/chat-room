import React from "react";
import UserState from "./user-state";
import "bootstrap/dist/css/bootstrap.min.css";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ""
        };
    }

    submit() {
        UserState.setUser(this.state.username);
        window.location.hash = "/app";
    }

    render() {
        return(
            <div id="login-container" className="d-flex justify-content-center align-items-center">
                <input id="user-in" className="form-control" type="text" placeholder="Username" value={this.state.username} onChange={e => {
                    this.setState({
                        username: e.target.value
                    });
                }} onKeyDown={e => {
                    if(e.key === "Enter") {
                        this.submit();
                    }
                }}></input>
                <div className="p-1"></div>
                <button id="user-sub" className="btn btn-primary" onClick={() => {
                    this.submit();
                }}>Submit</button>
            </div>
        );
    }
};

export default Login;