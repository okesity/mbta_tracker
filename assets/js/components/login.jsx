import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Facebook from './facebook';
import Google from './google';
import { Form, FormGroup, Input, Button, Label, NavItem, NavLink } from 'reactstrap';
import { BrowserRouter, Routes, Router} from 'react-router-dom';
import root from '../root';
import $ from 'jquery';
import Registeration from './registration';

export default function Login(props) {
  let {root, sessionCreated, session} = props;

  function createSession(props) {
    $(document).ready(function () {
      var email = $('#login-email').val();
      var password = $('#login-password').val();
      root.createSession(email, password);
      console.log(email);
      console.log(password);
    })
  }

    return (
      <div className="fluid-container">
      <div className="container" style={{width: '400px', height: '600px',
        backgroundColor: '#DCDCDC', marginTop: '200px'}}>
      <Form>
      <FormGroup>
        <Label for="email" style={{ marginTop: '20px'}}>Email</Label>
        <Input type="email" id="login-email" name="email" placeholder="@email"></Input>
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input type="password" id="login-password" name="password" placeholder="password"></Input>
      </FormGroup>
    </Form>
    <Button style={{marginLeft: '40%'}} onClick={createSession}>Login</Button>
    <Link to="/registration" style={{marginLeft: '20px'}}>Register</Link>
    <p style={{paddingLeft: '35%', paddingTop: '20px'}}>
        Or Login With
    </p>
    <hr />
    <Facebook root={props.root}/>
    <br />
    <Google root={props.root}/>
  </div>
</div>
    );
}

// TODO:
// dont login with facebook yet. After complete, move it under login with
