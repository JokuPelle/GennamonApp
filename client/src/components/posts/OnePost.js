import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class OnePost extends Component {

    //>GreenText
    greenText = (message) => {
        if (message.charAt(0) === ">") return("postMessageGreen");
        else return("postMessage");
    };

    render() {
        
        const dateparsed = new Date(this.props.date).toLocaleString();
        const messagesplit = this.props.message.split("\n").map((i,key) => 
            <p key={key} className={this.greenText(i)}>{i}</p>
        );
        return(
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs="12" md="8" lg="6" className="postBack">
                        <h5 className="postUser">{this.props.username} - {dateparsed}</h5>
                        {messagesplit}
                        <div style={{height:"5px", backgroundColor:"#D9B08C"}}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default OnePost;