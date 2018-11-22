import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import Login from './login';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

function Registration (props){
  let {root, session, SessionCreated} = props;

  function register() {
    var name = $('#name').val();
    var email = $('#email').val();
    var password = $('#password').val();
    root.createUser(name, email, password, props.history);
    //console.log()
  }


  return <div>
        <h3>Create a New User</h3>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" name="name" placeholder="name" id="name" />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email" placeholder="email" id="email" />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" name="password" placeholder="password" id="password" />
            </FormGroup>
           <Button onClick = {register}>Submit</Button>
          </Form>
  </div>;

}

export default withRouter(Registration);
