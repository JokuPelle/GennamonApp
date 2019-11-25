import React, {Component} from "react";

import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import {Link} from "react-router-dom";

class Pagebuttons extends Component {
    constructor(props){
        super(props)
        this.state = {
            settingsOn: false,
            settingsButtonText: "Settings"
        };
    }

    toggleSettings = () => {
        if (this.state.settingsOn) {
            this.setState({settingsOn: false, settingsButtonText: "Settings"});
        } else {
            this.setState({settingsOn: true, settingsButtonText: "Save Settings"});
        }
    }

    render() {
        let settings;
        if (this.props.isYou) {
            settings=<Button variant="" className="m-2" onClick={this.toggleSettings}>{this.state.settingsButtonText}</Button>;
        } else {
            settings=null;
        }
        return (
            <div>
                <ButtonToolbar className="buttonRow">
                    <Link to="/">
                        <Button variant="" className="m-2">Homepage</Button>
                    </Link>
                    {settings}
                </ButtonToolbar>
            </div>
        )
    }
}
export default Pagebuttons;
