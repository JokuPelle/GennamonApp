import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Form from "react-bootstrap/Form";

class Newpost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            readyToPost: false,
            message: ""
        };
    }

    updateMessage = (event) => {
        this.setState({message: event.target.value});
    }

    togglePostWindow = () => {
        this.setState({readyToPost: !this.state.readyToPost});
    }

    createPost = () => {
        if (this.state.message === "") alert("Your post needs to be atleast one character long.");
        else {
            fetch("api/posts/new", {
                method: "POST",
                body: JSON.stringify({
                    username: this.props.username,
                    message: this.state.message
                }),
                headers: {"Content-Type":"application/json"}})
                .then(res => res.json())
                .then(data => {
                    if (data.success === true) {
                        this.setState({message: ""});
                        alert("Post was created");
                    } else alert(data.message);
                });
        }
    }

    render() {
        if (this.props.username === "") {
            return(
                <div>
                    <h2 className="m-2">You need to be logged in to make a post</h2>
                </div>
            );
        } else if (this.state.readyToPost === false ) {
            return(
                <div>
                    <button className="btn m-2" onClick={this.togglePostWindow}>Create new Post</button>
                </div>
            )
        } else {
            return(
                <div>
                    <h2 className="m-2">Post something</h2>
                    <Form>
                        <Form.Control style={{height: "100px"}} as="textarea"  placeholder="Your message to the world..." className="postInput" value={this.state.message} onChange={this.updateMessage}/>
                    </Form>
                    <ButtonToolbar className="buttonRow">
                        <Button variant="" className="m-2" onClick={this.createPost}>Post</Button>
                        <Button variant="" className="m-2" onClick={this.togglePostWindow}>Cancel</Button>
                    </ButtonToolbar>
                </div>
            );
        }
    }
}

export default Newpost;