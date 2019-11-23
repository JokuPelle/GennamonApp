import React, { Component } from "react";
import OnePost from "./OnePost";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Postlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postsShown: 10,
            morePosts: 10,
            posts: []
        };
    }

    loadPosts = () => {
        console.log("load all posts");
        fetch("/api/posts/load")
            .then(res => res.json())
            .then(data => {
                this.setState({posts: data.posts});
            })
    }
    //Problem is that it loads all the posts again instead of not currently shown ones
    loadMore = () => {
        this.setState({postsShown: this.state.postsShown + this.state.morePosts});
        this.loadPosts();
    }

    componentDidMount() {
        console.log("postlist mount");
        this.loadPosts();
    }
    render() {
        const listItems = this.state.posts.slice(0,this.state.postsShown).map((item, key) =>
            <OnePost key={key} username={item.username} message={item.message} date={Date.parse(item.date)}/>);
        return(
            <div style={{display:"inline"}}>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs="8" md="5" lg="4">
                            <h3 className="loginStatus m-2">Recent Posts</h3>
                        </Col>
                        <Col xs="4" md="3" lg="2">
                            <Button variant="" className="m-2" onClick={this.loadPosts}>Refresh</Button>
                        </Col>
                    </Row>
                </Container>
                {listItems }
                <Button variant="" className="m-2" onClick={this.loadMore}>Load More</Button>
            </div>
        )
    }
}

export default Postlist;