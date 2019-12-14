// Userpage
import React , {Component} from 'react';
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
                if (data.success === false) {
                    this.setState({user: "---User doesn't exist!---"});
                } else {
                    this.setState({user: data.user});
                    if (data.isThisUser) {
                        this.setState({isYou: true, you: " (You)"});
                    } else {
                        this.setState({isYou: false, you: ""});
                    }
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
        // Determine if page belongs to a user
        let pageTitle, userPostList;
        if (this.state.user === "---User doesn't exist!---") {
            pageTitle = <h3 className="text-center loginStatus">{this.state.user}</h3>
            userPostList = <h3 className="text-center loginStatus">Unable to show posts</h3>
        } else {
            pageTitle = <h3 className="text-center loginStatus">{decodeURIComponent(this.props.match.params.id)}'s Page{this.state.you}</h3>
            userPostList = <Postlist singleUser={true} user={this.props.match.params.id} yourPosts={this.state.isYou}/>
        }
        return(
            <div className="App">
                {pageTitle}
                <Pagebuttons isYou={this.state.isYou} user={decodeURIComponent(this.props.match.params.id)}/>
                <div className="break"/>
                <Container>
                    {userPostList}
                </Container>
            </div>
        )
    }
}
export default Userpage;
