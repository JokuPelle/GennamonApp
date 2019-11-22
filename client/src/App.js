import React , {Component} from 'react';
import './App.css';
//import Customers from "./components/customers/Customers";
import Signin from "./components/signin/Signin";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to Gennamon</h1>
        <Signin/>
      </div>
    );
  }
}

export default App;
