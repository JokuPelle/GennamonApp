import React , {Component} from 'react';
//Import boostrap and app css files
//import "../../../../backend/node_modules/bootstrap/dist/css/bootstrap.css";
import "../../App.css";
import Postlist from "../posts/Postlist";
import Pagebuttons from "../signin/Pagebuttons";

import Container from 'react-bootstrap/Container';


class Userpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            isYou: false,
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
                    this.setState({isYou: true, you: " (You)"});
                } else {
                    this.setState({isYou: false, you: ""});
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
    
    //Send url-mode name to postlist sice that's only used in a fecth request
    render() {
        return(
            <div className="App">
                <h3 className="text-center loginStatus">{decodeURIComponent(this.props.match.params.id)}'s Page{this.state.you}</h3>
                <Pagebuttons isYou={this.state.isYou}/>
                <div className="break"/>
                <Container>
                    <Postlist singleUser={true} user={this.props.match.params.id}/>
                </Container>
            </div>
        )
    }
}
export default Userpage;
