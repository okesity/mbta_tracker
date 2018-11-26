import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import ReactDOM from 'react-dom';
import Main from './main';
import {Link, BrowserRouter as Router, Route} from 'react-router-dom';
import $ from 'jquery';


export default function Facebook(props) {
  let{root, session, sessionCreated} = props;

  function componentClicked() {
    console.log("clicked");
  };

  const responseFacebook = (response) => {
    console.log(response);
  }


  function responseFacebook1(responseFacebook) {
    // craete a new session here so that the session in main won't be null.
    // write one more create function specifically for soical oauth login in session controller.
    // if it's necessary, write another createsession function in root.jsx
    // props.root.createOauthUser(responseFacebook.name, responseFacebook.email);
    props.root.createOauthSession(responseFacebook.name, responseFacebook.email);
    console.log("check fb data", responseFacebook.email);
    console.log("check root in fb", props.root);
    console.log("FB ROOT session", props.root.state.session);
  };

  let fbContent = (
      <FacebookLogin
        appId="321890978601866"
        autoLoad={false}
        fields="name,email"
        onClick={componentClicked}
        cssClass='btnFacebook'
        icon="fa fa-facebook"
        callback={responseFacebook1}/>);

    return (
      <div>
      {fbContent}
    </div>)
}
