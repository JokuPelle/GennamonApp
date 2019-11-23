import React, {Component} from "react";
import './signin.css';
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Form from "react-bootstrap/Form";

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
        if (this.state.user === "" || this.state.password === "") alert("Please provide username and passowrd!");
        else {
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
                    //alert(data.message);
                });
        }
        event.preventDefault();
    }

    createAccount = (event) => {
        if (this.state.user === "" || this.state.password === "") alert("Please provide username and passowrd!");
        else {
            fetch("api/login/new",{
                method: "POST", 
                body: JSON.stringify({
                username: this.state.user, 
                password: this.state.password
                }), 
                headers: {"Content-Type": "application/json"}})
                .then((res) => res.json())
                .then(data => {
                    if (data.success === true) alert("User was created succesfully");
                    else alert(data.message);
                });
            //alert("A user was submitted: " + this.state.user + " and their password is " + this.state.password);
        }
        event.preventDefault();
    }

    logOut = (event) => {
        fetch("api/login/logout")
            .then(res => res.json())
            .then(data => {
                this.props.checkLoginStatus();
                //alert(data.message);
            });
        event.preventDefault();
    }

    render () {
        if (this.props.loggedInStatus === "LOGGED_IN") {
            return(
                <div>
                    <h3 className="loginStatus mt-2">Welcome {this.props.username}</h3>
                    <ButtonToolbar className="buttonRow">
                        <Button variant="" className="m-2">Profile</Button>
                        <Button variant="" className="m-2">Search</Button>
                        <Button variant="" className="m-2" onClick={this.logOut}>Log Out</Button>
                    </ButtonToolbar>
                </div>
            )
        } else {
            return(
                <div className="">
                    <h3 className="loginStatus mt-2">You're not logged in.</h3>
                    <Form>
                        <Form.Group>
                        <Form.Control className="loginInput mb-2" type="text" placeholder="Username" value={this.state.user} onChange={this.changeUser}/>
                        <br/>
                        <Form.Control className="loginInput" type="password" placeholder="Password" value={this.state.password} onChange={this.changePassword}/>
                        <br/>
                        <Button variant="" className="m-2" onClick={this.logIn}>Log In</Button>
                        <Button variant="" className="m-2" onClick={this.createAccount}>Create Account</Button>
                        </Form.Group>
                    </Form>
                </div>
            );
            /*return(
                <div className="mb-2">
                    <h3 className="loginStatus mt-2">You're not logged in.</h3>
                    <table align="center">
                        <tbody>
                        <tr align="justify">
                            <td>
                            <label className="loginLabel">
                                Username:
                                <input className="loginInput ml-3" type="text" placeholder="Username..." value={this.state.user} onChange={this.changeUser}/>
                            </label>
                            <button className="btn m-1" onClick={this.logIn}>Log In</button>
                            </td>
                        </tr>
                        <tr align="justify">
                            <td>
                            <label className="loginLabel">
                                Password:
                                <input className="loginInput ml-3" type="password" placeholder="Password..." value={this.state.password} onChange={this.changePassword}/>
                            </label>
                            <button className="btn m-1" onClick={this.createAccount}>Create New Account</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )*/
        }
    }
}

export default Signin;