import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Facebook from './facebook';
import { Form, FormGroup, Input, Button, Label, NavItem, NavLink } from 'reactstrap';
//import '../css/login.css';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = ev => {
    this.setState({
      [ev.target.id]: ev.target.value
    });
  }

  handleSubmit = ev => {
    console.log("submit")
  }

  render() {
    return (
      <div className="fluid-container">
        <nav className="navbar navbar-light navbar-expand" style={{backgroundColor: "#e3f2fd"}}>
          <span className="navbar-brand">
            MBTA Tracker
          </span>
          <ul className="navbar-nav mr-auto">
            <NavItem>
              <NavLink to="#" activeclassname="active" className="nav-link">Home</NavLink>
            </NavItem>
          </ul>
        </nav>
      <div className="container" style={{width: '400px', height: '600px',
        backgroundColor: '#DCDCDC', marginTop: '100px'}}>
      <Form>
      <FormGroup>
        <Label for="email" style={{ marginTop: '20px'}}>Email</Label>
        <Input type="email" name="email" id="email" placeholder="@email"></Input>
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input type="password" name="password" id="password" placeholder="password"></Input>
      </FormGroup>
    </Form>
    <Button style={{marginLeft: '40%'}}>Login</Button>
    <p style={{paddingLeft: '35%', paddingTop: '20px'}}>
      Or Login With
    </p>
    <Facebook></Facebook>
  </div>
</div>
    );
  }
}
