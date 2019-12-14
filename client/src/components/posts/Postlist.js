import React, { Component } from "react";
import OnePost from "./OnePost";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Postlist extends Component {
    /*Props:
        singleUser (bool): true if on userpage
        user (string): URI-encoded signed in username
        yourPosts (bool): true if on your userpage
    */
    constructor(props) {
        super(props);
        this.state = {
            postsShown: 10,
            morePosts: 10,
            posts: []
        };
    }

    loadPosts = () => {
        if (!this.props.singleUser) {
            console.log("load all posts");
            fetch("/api/posts/load")
                .then(res => res.json())
                .then(data => {
                    this.setState({posts: data.posts});
                }
            );
        } else {
            console.log("load user posts");
            fetch("/api/posts/load?id="+this.props.user)
                .then(res => res.json())
                .then(data => {
                    this.setState({posts: data.posts});
                }
            );
        }
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
    //xs="4" md="3" lg="2"
    render() {
        const listItems = this.state.posts.slice(0,this.state.postsShown).map((item, key) =>
            <OnePost key={key} username={item.username} message={item.message} date={Date.parse(item.date)} canDelete={this.props.yourPosts} reload={this.loadPosts}/>);
        return(
            <div>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs="8" md="6" lg="4">
                            <h3 className="loginStatus">Recent Posts</h3>
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