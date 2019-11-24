import React, {Component} from "react";

import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import {Link} from "react-router-dom";

class Pagebuttons extends Component {

    render() {
        return (
            <div>
                <ButtonToolbar className="buttonRow">
                    <Link to="/">
                        <Button variant="" className="m-2">Homepage</Button>
                    </Link>
                </ButtonToolbar>
            </div>
        )
    }
}
export default Pagebuttons;
