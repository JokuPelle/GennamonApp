import React, {Component} from "react";

class Signin extends Component {
    constructor(){
        super();
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
        fetch("api/login", {
            method: "POST",
            body: JSON.stringify({
                username: this.state.user,
                password: this.state.password
            }),
            headers: {"Content-Type": "application/json"}})
                .then(res => res.json())
                .then(data => alert(data.success));
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

    render (){
        return (
            <div>
            <div>
                <form onSubmit={this.createAccount}>
                    <div>
                        <label>
                            Username: 
                            <input type="text" value={this.state.user} onChange={this.changeUser} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Password: 
                            <input type="text" value={this.state.password} onChange={this.changePassword} />
                        </label>
                    </div>
                    <input type="submit" value="Create an account" />
                </form>
            </div>
            <div>
                <form onSubmit={this.logIn}>
                    <input type="submit" value="Log in" />
                </form>
            </div>
            </div>
        );
    }
}

export default Signin;