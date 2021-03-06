import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";
import FormGroup from "react-bootstrap/FormGroup";

class Signin extends Component {
    /*Props:
        loggedInStatus (string): LOGGED_IN or NOT_LOGGED_IN
        checkLoginStatus (function): checks if someone is logged in
        handleLogin (function): log in
        handleLogout (function): log out
        username (string): logged in username
    */
    constructor(props){
        super(props);
        this.state = {
            user: "",
            password: "",
            searchItem: "",
            searchResult: ""
        };
    }

    changeUser = (event) => { this.setState({user: event.target.value}) }
    changePassword = (event) => { this.setState({password: event.target.value}) }
    changeSearch = (event) => {
        if (event.target.value === "") this.setState({searchResult: ""});
        this.setState({searchItem: event.target.value})
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
                    if (data.success === false) alert(data.message);
                    else this.props.checkLoginStatus();
                    //alert(data.message);
                });
        }
        //if (event !== null) event.preventDefault();
    }

    createAccount = (event) => {
        if (this.state.user === "" || this.state.password === "" || /\s/.test(this.state.user) || /\s/.test(this.state.password) || this.state.password.length < 6) {
            alert("You must provide a valid username and password.\nThey can't include any whitespace.\nPassword must be atleast 6 characters long.");
        } else {
            fetch("api/login/new",{
                method: "POST", 
                body: JSON.stringify({
                username: this.state.user, 
                password: this.state.password
                }), 
                headers: {"Content-Type": "application/json"}})
                .then((res) => res.json())
                .then(data => {
                    if (data.success === true) {
                        this.logIn();
                        alert("User was created succesfully.");
                    } else alert(data.message);
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

    searchUser = () => {
        fetch("/userpage/api/find/"+encodeURIComponent(this.state.searchItem))
            .then(res => res.json())
            .then(data => {
                if (data.success === false) this.setState({searchResult: "not found"});
                else if (data.success === true) this.setState({searchResult: data.users});
            })
    }

    render () {
        let searchResultText;
        if (this.state.searchResult === "not found") { searchResultText = <p className="mb-2">No such user found</p> }
        else if (this.state.searchResult === "") { searchResultText = <p className="mb-2">...</p> }
        else { searchResultText =
            this.state.searchResult.slice(0,4).map((item, key) => 
                <Link key={key} to={"/userpage/"+encodeURIComponent(item)}>
                    <p className="mb-2">User {item} was found.</p>
                </Link>)
        }

        if (this.props.loggedInStatus === "LOGGED_IN") {
            return(
                <div>
                    <h3 className="loginStatus">Welcome {this.props.username}</h3>
                    <ButtonToolbar className="buttonRow">
                        <Link to={'/userpage/'+encodeURIComponent(this.props.username)} >
                            <Button variant="" className="m-2">Profile</Button>
                        </Link>
                        <Button variant="" className="m-2" onClick={this.searchUser}>Search</Button>
                        <Button variant="" className="m-2" onClick={this.logOut}>Log Out</Button>
                    </ButtonToolbar>
                    <Form>
                        <FormGroup className="mb-0">
                            <Form.Control className="loginInput text-center" type="text" placeholder="Search User" value={this.state.searchItem} onChange={this.changeSearch}/>
                        </FormGroup>
                    </Form>
                    {searchResultText}
                </div>
            )
        } else {
            return(
                <div>
                    <h3 className="loginStatus">You're not logged in.</h3>
                    <Form>
                        <Form.Group style={{margin:"0px"}}>
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
        }
    }
}

export default Signin;