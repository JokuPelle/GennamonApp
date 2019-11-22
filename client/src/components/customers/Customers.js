import React, {Component} from 'react';
import './customers.css';

class Customers extends Component {
  constructor() {
    super(); //Parent component constructor
    this.state = {
      customers: [],
      users: []
    }
  }

  componentDidMount(){
    //fecthes proxy + /api/customers
    fetch("/api/customers") //call to backend
      .then(res => res.json()) //gets the response which is the customers array in json
      .then(customers_result => this.setState({customers: customers_result}, () => console.log("Customers fecthed..",customers_result)));

    fetch("/api/users") //call to backend
      .then(res => res.json()) //gets the response which is the customers array in json
      .then(users_result => this.setState({users: users_result}, () => console.log("Users fecthed..",users_result)));
  }

  render() {
    return (
      <div>
        <h2>Customers</h2>
        <ul>
          {this.state.customers.map(customer => 
            <li key={customer.id}>{customer.firstname} {customer.lastname}</li>
          )}
          {this.state.users.map(user => 
            <li key={user.id}>{user.username}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default Customers;
