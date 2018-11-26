import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Facebook from './facebook';
import Google from './google';
//import { Form, FormGroup, Input, Button, Label, NavItem, NavLink } from 'reactstrap';
import { BrowserRouter, Routes, Router} from 'react-router-dom';
import root from '../root';
import $ from 'jquery';
import Registeration from './registration';
import { Container, Row, Col, Input, Button, Fa, Card, CardBody, ModalFooter } from 'mdbreact';

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

  return(
    <div className="container" style={{marginTop: '100px', marginLeft: '200px'}}>
      <div className="form-elegant">
             <Card style={{height: '600px', width: '450px', marginLeft: '500px', borderRadius: '15px'}}>
               <CardBody className="mx-4">
                 <div className="text-center">
                   <h3 className="dark-grey-text mb-5"><strong>Sign In</strong></h3>
                 </div>
                 <Input label="Your email" id="login-email" group type="email" validate error="wrong" success="right"/>
                 <Input label="Your password" id="login-password" group type="password" validate containerClass="mb-0"/>
                 <div className="text-center mb-3">
                   <Button type="button" id= "sign-in-btn" onClick={createSession} className="btn-block z-depth-1a"> Sign In</Button>
                 </div>
                 <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2"> or Sign in with:</p>
                 <Facebook />
                 <br />
                 <Google />
               </CardBody>
               <ModalFooter className="mx-5 pt-3 mb-1">
                 <p className="font-small grey-text d-flex justify-content-end">Not a member? <Link to="/registration" style={{marginLeft: '20px'}}>Register</Link></p>
               </ModalFooter>
             </Card>
     </div>
   </div>
  );


}


// return (
//   <div className="fluid-container">
//   <div className="container" style={{width: '400px', height: '600px',
//     backgroundColor: '#DCDCDC', marginTop: '200px'}}>
//   <Form>
//   <FormGroup>
//     <Label for="email" style={{ marginTop: '20px'}}>Email</Label>
//     <Input type="email" id="login-email" name="email" placeholder="@email"></Input>
//   </FormGroup>
//   <FormGroup>
//     <Label for="password">Password</Label>
//     <Input type="password" id="login-password" name="password" placeholder="password"></Input>
//   </FormGroup>
// </Form>
// <Button style={{marginLeft: '40%'}} onClick={createSession}>Login</Button>
// <Link to="/registration" style={{marginLeft: '20px'}}>Register</Link>
// <p style={{paddingLeft: '35%', paddingTop: '20px'}}>
//     Or Login With
// </p>
// <hr />
// <Facebook root={props.root}/>
// <br />
// <Google root={props.root}/>
// </div>
// </div>
// );
