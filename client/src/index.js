import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

//App might be useless??
//import App from "./App";
import Home from "./Home";
import Userpage from "./components/pages/Userpage";

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Router>
        <h1 className="text-center p-2 m-0">Gennamon</h1>
        <Route exact path="/" component={Home}/>
        <Route path="/userpage/:id" component={Userpage}/>
    </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();