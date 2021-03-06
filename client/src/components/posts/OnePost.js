import React, { Component } from "react";
import {Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";

class OnePost extends Component {
    /*Props:
        username (string): poster
        message (string): post message
        date (Number): post date (milliseconds)
        canDelete (bool): true if on your userpage
        reload (function): loads all posts
    */

    greenText = (message) => {
        if (message.charAt(0) === ">") return("postMessageGreen");
        else return("postMessage");
    };

    deletePost = () => {
        fetch("/api/posts/delete", {
            method: "POST",
            body: JSON.stringify({
                username: this.props.username,
                message: this.props.message
            }),
            headers: {"Content-Type":"application/json"}})
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    this.props.reload();
                }
            });
    }

    render() {
        const dateparsed = new Date(this.props.date).toLocaleString();
        const messagesplit = this.props.message.split("\n").map((i,key) => 
            <p key={key} style={{wordWrap:"break-word"}} className={this.greenText(i)}>{i}</p>
        );
        let deleteButton;
        if (this.props.canDelete === true) {
            deleteButton =
                <Col md="auto" >
                    <Button variant="" className="deleteButton" onClick={this.deletePost}>Delete Post</Button>
                </Col>
        }
        return(
            <Container className="postBack">
                <Row>
                    <Col md="auto">
                        <Link to={"/userpage/"+encodeURIComponent(this.props.username)}>
                            <h5 className="postUser m-0">{this.props.username}</h5>
                        </Link>
                    </Col>
                    <Col md="auto" >
                        <p className="postUser m-0" > - {dateparsed}</p>
                    </Col>
                    {deleteButton}
                </Row>
                <Row>
                    <Col>
                        {messagesplit}
                        <div style={{height:"5px", backgroundColor:"#D9B08C"}}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default OnePost;