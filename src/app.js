import { render } from "@testing-library/react";
import React from "react";
import axios from "axios";

class Message extends React.Component {
    render() {
        return(
            <h1>[{this.props.user}]: {this.props.message}</h1>
        );
    }
};

class App extends React.Component {
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
        }, 500);
    }

    render() {
        const messages = []
        for(let i = 0; i < this.state.totalMessages; i++) {
            messages.push(<Message user={this.state.messages[i][0]} message={this.state.messages[i][1]}/>);
        }
        return(
            messages
        );
    }
};

export default App;