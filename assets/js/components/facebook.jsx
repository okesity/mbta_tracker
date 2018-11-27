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
    console.log("fb resp", response);
  }


  function responseFacebook1(responseFacebook) {
    var listofusers = props.root.state.users;
    var username = listofusers.map(function(user){return user.name});
    console.log("check names", username);

    if(username.includes(responseFacebook.name)) {
      props.root.createOauthSession(responseFacebook.name, responseFacebook.email)
    } else {
      props.root.createOauthUser(responseFacebook.name, responseFacebook.email, "");
      setTimeout(function(){
        console.log("hereherehererere",responseFacebook.name, responseFacebook.email);
        props.root.createOauthSession(responseFacebook.name, responseFacebook.email)
      }, 2000);
    }
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
