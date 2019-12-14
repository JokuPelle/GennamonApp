// Homepage
import React , {Component} from 'react';

//Import boostrap and app css files
//import "../../backend/node_modules/bootstrap/dist/css/bootstrap.css";
import './App.css';
import './components/signin/signin.css';

//Import components and their respective css files
import Signin from "./components/signin/Signin";
import Newpost from "./components/posts/Newpost";
import Postlist from "./components/posts/Postlist";

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: ""
    };
  }

  handleLogin = (data) => {
    console.log("logging in");
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    });
  }

  handleLogout = () => {
    console.log("logging out");
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: ""
    });
  }

  checkLoginStatus = () => {
    fetch("api/login/verify")
      .then(res => res.json())
      .then(data => {
        if (data.success === true && this.state.loggedInStatus === "NOT_LOGGED_IN") this.handleLogin(data);
        else if (data.success === false && this.state.loggedInStatus === "LOGGED_IN") this.handleLogout();
        })
      .catch(err => console.log("check login error", err));
  }

  componentDidMount() {
    console.log("app mounted");
    this.checkLoginStatus();
  }

  render() {
    return (
      <div className="App">
        <Signin
          loggedInStatus={this.state.loggedInStatus}
          checkLoginStatus={this.checkLoginStatus}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          username={this.state.user}></Signin>
        <div className="break"/>
        <Newpost username={this.state.user}/>
        <div className="break"/>
        <Postlist singleUser={false} user={encodeURIComponent(this.state.user)} yourPosts={false}/>
      </div>
    );
  }
}

export default Home;
