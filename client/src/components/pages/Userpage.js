import React , {Component} from 'react';
//Import boostrap and app css files
import "bootstrap/dist/css/bootstrap.css";
import "../../App.css";
import Postlist from "../posts/Postlist";
import Pagebuttons from "../signin/Pagebuttons";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class Userpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            you: "",
            screenWidth: null
        };
    }

    verifyExistingUser = () => {
        const checkUser = this.props.match.params.id;
        fetch("api/check/"+checkUser)
            .then(res => res.json())
            .then(data => {
                this.setState({user: data.user});
                if (data.isThisUser) {
                    this.setState({you: " (You)"});
                } else {
                    this.setState({you: ""});
                }
            })
    }

    updateWindowDimensions = () => {
        this.setState({screenWidth: window.innerWidth});
    }
    
    componentDidMount(){
        this.verifyExistingUser();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }
    
    render() {
        return(
            <div className="App">
                <h3 className="text-center loginStatus mt-2">{this.props.match.params.id}'s Page{this.state.you}</h3>
                <Pagebuttons/>
                <div className="break"/>
                <Container>
                    <Row>
                        <Col>
                            <Postlist singleUser={true} user={this.props.match.params.id}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default Userpage;
