import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Facebook from './facebook';
import { Form, FormGroup, Input, Button, Label, NavItem, NavLink } from 'reactstrap';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import Login from './login';
import Home from './home';

export default function Main(props){
  let {root, session, sessionCreated} = props;
  console.log("what is sessioncreated in main", root.state.sessionCreated);
  console.log("what is session in main", root.state.session);

  if(root.state.session == null) {
    return <div><Login root={props.root}/></div>;
  } else {
    return <div><Home root={props.root}/></div>;
  }
}
