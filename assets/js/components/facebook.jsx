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
    // TODO:
    // check if this user in the database
     // yes ... createSession
     // No ... createUser and setsession state
    //props.root.createOauthUser(responseFacebook.name, responseFacebook.email, "");
    // let newSession = {
    //   token: responseFacebook.accessToken,
    //   user_id: responseFacebook.id,
    //   user_name: responseFacebook.name,
    //   user_email: responseFacebook.email,
    // }
    // props.root.setState({
    //   session: newSession,
    //   sessionCreate: true,
    // })
    //  TODO:

    props.root.createOauthSession(responseFacebook.name, responseFacebook.email);
    // craete a new session here so that the session in main won't be null.
    // write one more create function specifically for soical oauth login in session controller.
    // if it's necessary, write another createsession function in root.jsx
    //props.root.createSession(responseFacebook.name, responseFacebook.email);
    console.log("check fb data", responseFacebook.email);
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
