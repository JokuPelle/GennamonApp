import React , {Component} from 'react';
import './App.css';
//import Customers from "./components/customers/Customers";
import Signin from "./components/signin/Signin";

class App extends Component {
  constructor(){
    super();
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    };
  }

  handleLogin = (data) => {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    });
  }

  handleLogout = () => {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: ""
    });
  }

  checkLoginStatus = () => {
    fetch("api/login/verify")
      .then(res => res.json())
      .then(data => {
        if (data.success === true && this.state.loggedInStatus === "NOT_LOGGED_IN") this.setState({
          loggedInStatus: "LOGGED_IN",
          user: data.user
        });
        else if (data.success === false && this.state.loggedInStatus === "LOGGED_IN") this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: ""
        });
      })
      .catch(err => console.log("check login error", err));
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  render() {
    return (
      <div className="App">
        <Signin loggedInStatus={this.state.loggedInStatus} checkLoginStatus={this.checkLoginStatus} handleLogin={this.handleLogin} handleLogout={this.handleLogout}></Signin>
      </div>
    );
  }
}

export default App;
