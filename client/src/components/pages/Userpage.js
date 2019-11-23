import React , {Component} from 'react';
//Import boostrap and app css files
import "bootstrap/dist/css/bootstrap.css";
//import './App.css';

class Userpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ""
        };
    }

    render() {
        return(
            <div>
                <h1>THIS IS THE USERPAGE</h1>
            </div>
        )
    }
}
export default Userpage;
