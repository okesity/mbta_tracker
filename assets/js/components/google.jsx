import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';
import ReactDOM from 'react-dom';


export default function Google(props) {
  let {root, session, sessionCreated} = props;


  const responseGoogle = (response) => {
    console.log(response);
  }

  return(
    <div>
      <GoogleLogin
        clientId="AIzaSyBhLvg_Vwoau_QHkCZVz8XtVvzMW8NX86w"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        theme="light"
        className="btnGoogle">
        <i className="fa fa-google-plus"/>
      <span>&nbsp;&nbsp;Login with Google</span></GoogleLogin>
    </div>
  )
}
