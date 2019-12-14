import React, {Component} from "react";

import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import {Link} from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";

class Pagebuttons extends Component {
    /*Props:
        isYou (bool): true if on your userpage
        user (string): url-decoded logged in username
    */
    constructor(props){
        super(props)
        this.state = {
            settingsOn: false,
            settingsButtonText: "Settings",
            oldPassword: "",
            newPassword: ""
        };
    }

    toggleSettings = () => {
        if (this.state.settingsOn) {
            this.setState({oldPassword: "", newPassword: ""});
            this.setState({settingsOn: false, settingsButtonText: "Settings"});
        } else {
            this.setState({settingsOn: true, settingsButtonText: "Close settings"});
        }
    }
    
    changeOldPW = (event) => { this.setState({oldPassword: event.target.value}) }
    changeNewPW = (event) => { this.setState({newPassword: event.target.value}) }

    changePassword = () => {
        console.log("let's change");
        if (this.state.oldPassword === "" || this.state.newPassword === "" || /\s/.test(this.state.newPassword) || this.state.newPassword.length < 6) {
            alert("You need to give your old and new password.\nAlso your new password must be at least 6 characters long and not include any whitespace.");
        } else {
            fetch("api/changepassword", {
                method: "POST",
                body: JSON.stringify({
                    user: this.props.user,
                    old: this.state.oldPassword,
                    new: this.state.newPassword
                }),
                headers: {"Content-Type":"application/json"}})
                .then(res => res.json())
                .then(data => {
                    if (data.success === true) {
                        this.setState({oldPassword: "", newPassword: ""});
                        this.toggleSettings();
                        alert("Your password was changed");
                    } else {
                        if (data.error === 1) {alert("Some error with changing the password.")}
                        else {alert("Wrong old password!")}
                    }
                })
        }
    }

    render() {
        let settingsButton, changePassword;
        if (this.props.isYou) {
            settingsButton=<Button variant="" className="m-2" onClick={this.toggleSettings}>{this.state.settingsButtonText}</Button>;
        } else {
            settingsButton=null;
        }
        if (this.state.settingsOn) {
            changePassword = 
                <Form>
                    <FormGroup className="mb-0">
                        <Form.Control className="loginInput" type="password" placeholder="Old password" value={this.state.oldPassword} onChange={this.changeOldPW}/>
                        <br/>
                        <Form.Control className="loginInput mt-2" type="password" placeholder="New password" value={this.state.newPassword} onChange={this.changeNewPW}/>
                    </FormGroup>
                    <Button variant="" className="m-2" onClick={this.changePassword}>Change Password</Button>
                </Form>
        }
        return (
            <div>
                <ButtonToolbar className="buttonRow">
                    <Link to="/">
                        <Button variant="" className="m-2">Homepage</Button>
                    </Link>
                    {settingsButton}
                </ButtonToolbar>
                {changePassword}
            </div>
        )
    }
}
export default Pagebuttons;
