import React from "react";
import Cookies from "universal-cookie";
import "bootstrap/dist/css/bootstrap.min.css";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cookies: new Cookies(),
            username: ""
        };
    }

    submit() {
        this.state.cookies.set("user", this.state.username);
        window.location.assign(window.location.origin + "/app");
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