import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Facebook from './facebook';
import { Form, FormGroup, Input, Button, Label, NavItem, NavLink } from 'reactstrap';
import { BrowserRouter, Routes, Router} from 'react-router-dom';
import root from '../root';
import $ from 'jquery';

export default function Login(props) {
  let {root, sessionCreated} = props;
  console.log("Check props " + props);

  function createSession() {
    let {root, sessionCreated} = props;
    console.log("Check props " + props);
    let email = $('login-email').val();
    let password = $('login-password').val();
    root.create_session(email, password);
  }



    return (
      <div className="fluid-container">
      <div className="container" style={{width: '400px', height: '600px',
        backgroundColor: '#DCDCDC', marginTop: '100px'}}>
      <Form>
      <FormGroup>
        <Label for="email" style={{ marginTop: '20px'}}>Email</Label>
        <Input type="email" id="login-email" name="email" id="email" placeholder="@email"></Input>
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input type="password" id="login-password" name="password" id="password" placeholder="password"></Input>
      </FormGroup>
    </Form>
    <Button style={{marginLeft: '40%'}} onClick={createSession}>Login</Button>
    <p style={{paddingLeft: '35%', paddingTop: '20px'}}>
      Or Login With
    </p>
    <Facebook></Facebook>
  </div>
</div>
    );
}
