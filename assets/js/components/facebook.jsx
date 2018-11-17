import React, { Component } from  'react';
import FacebookLogin from 'react-facebook-login';
//import TiSocialFacebookCircular from 'react-icons/lib/ti/social-facebook-circular';
import ReactDOM from 'react-dom';
import Main from './main';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';


export default class Facebook extends Component {
  state = {
    isLoggedIn: false,
    userID: '',
    name:'',
    email: '',
    picture: '',
  }

  componentClicked = () => console.log("clicked");
  responseFacebook = response => {
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url,
    })
  };


  render() {
    let fbContent;

    if(this.state.isLoggedIn) {
      fbContent = (<div>
          <img src={ this.state.picture } alt={ this.state.name } />
              <h2>Welcome { this.state.name }</h2>
          </div>
      );

    } else {
      fbContent = (<FacebookLogin
        appId="321890978601866"
        autoLoad={true}
        fields="name,email,picture"
        onClick={this.componentClicked}
        cssClass='btnFacebook'
        icon="fa fa-facebook"
        callback={this.responseFacebook} />);
    }
    return (
      <div>
        { fbContent }
      </div>
    )
  }
}
