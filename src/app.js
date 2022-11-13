import { render } from "@testing-library/react";
import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"

class Message extends React.Component {
    render() {
        return(
            <h2>[{this.props.user}]: {this.props.message}</h2>
        );
    }
};

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalMessages: 0,
            messages: [[]]
        }
    }

    update() {
        axios.get("http://localhost:8080").then(response => {
            this.setState({
                totalMessages: response.data.totalMessages,
                messages: response.data.messages
            });
        });
    }

    componentDidMount() {
        this.update();
        this.interval = setInterval(() => {
            this.update();
        }, 250);
    }

    render() {
        const messages = []
        for(let i = 0; i < this.state.totalMessages; i++) {
            messages.push(<Message user={this.state.messages[i][0]} message={this.state.messages[i][1]}/>);
        }

        return(
            <div class="d-flex flex-column" id="messages-container">
                {messages}
            </div>
        );
    }
}

class InputBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        };
    }

    sendMessage() {
        if(this.state.message !== "") {
            axios.post("http://localhost:8080", [this.props.user, this.state.message]);
            this.setState({
                message: ""
            });
        }
    }

    render() {
        return(
            <div className="d-flex mt-auto p-2" id="input-bar">
                <input className="form-control" type="text" placeholder="Message" value={this.state.message} onChange={e => {
                    this.setState({
                        message: e.target.value
                    });
                }} onKeyDown={e => {
                    if(e.key === "Enter") {
                        this.sendMessage();
                    }
                }}></input>
                <div className="p-1"></div>
                <button class="btn btn-primary" onClick={() => {
                    this.sendMessage();
                }}>Send</button>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cookies: new Cookies()
        }
    }

    render() {
        return(
            <div class="d-flex flex-column" id="app-container">
                <Messages/>
                <InputBar user={this.state.cookies.get("user")}/>
            </div>
        );
    }
}

export default App;