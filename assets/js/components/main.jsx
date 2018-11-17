import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Facebook from './facebook';
import { Form, FormGroup, Input, Button, Label, NavItem, NavLink } from 'reactstrap';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import Login from './login';

export default function Main(props){
  let {root, session, sessionCreated} = props;

  if(props.sessionCreated) {
    return <div>You are logged in</div>
  } else {
    return (<div>
      <Login />
   </div>
 );
  }
}
