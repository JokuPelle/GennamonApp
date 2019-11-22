import React, {Component} from "react";
import './signin.css';

class Signin extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: "",
            password: "",
        };
    }

    changeUser = (event) => {
        this.setState({user: event.target.value})
    }

    changePassword = (event) => {
        this.setState({password: event.target.value})
    }

    logIn = (event) => {
        fetch("api/login/login", {
            method: "POST",
            body: JSON.stringify({
                username: this.state.user,
                password: this.state.password
            }),
            headers: {"Content-Type": "application/json"}})
                .then(res => res.json())
                .then(data => {
                    this.props.checkLoginStatus();
                    alert(data.message);
                });
        event.preventDefault();
    }

    createAccount = (event) => {
        fetch("api/login/new",{
            method: "POST", 
            body: JSON.stringify({
                username: this.state.user, 
                password: this.state.password
            }), 
            headers: {"Content-Type": "application/json"}})
                .then(() => console.log("post worked!"));
        alert("A user was submitted: " + this.state.user + " and their password is " + this.state.password);
        event.preventDefault();
    }

    logOut = (event) => {
        fetch("api/login/logout")
            .then(res => res.json())
            .then(data => {
                this.props.checkLoginStatus();
                alert(data.message);
            });
        event.preventDefault();
    }

    render (){
        return (
            <div>
                            <h1>Status: {this.props.loggedInStatus}</h1>
                            <label>
                                Username: 
                                <input type="text" value={this.state.user} onChange={this.changeUser} />
                            </label>
                
                            <label>
                                Password: 
                                <input type="text" value={this.state.password} onChange={this.changePassword} />
                            </label>
               
                            <form onSubmit={this.createAccount}>
                                <input type="submit" value="Create an account" />
                            </form>
                 
                            <form onSubmit={this.logIn}>
                                <input type="submit" value="Log in" />
                            </form>
              
            <div>
                <form onSubmit={this.logOut}>
                    <input type="submit" value="Log out" />
                </form>
            </div>
            </div>
        );
    }
}

export default Signin;