import React , {Component} from 'react';
//import {Link} from "react-router-dom";

//Import boostrap and app css files
import "bootstrap/dist/css/bootstrap.css";
import './App.css';

class App extends Component {
    /*constructor(props) {
        super(props);
    }*/
    render() {
        return (
            <div>
                <header>
                    This is my website!
                </header>
                <main>
                    <h1>YOLO!!!</h1>
                    {this.props.children}
                </main>
                <footer>
                    Your copyright here
                </footer>
            </div>
        );
    }
}
export default App;
