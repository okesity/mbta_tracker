import React, { Component } from  'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';

export default class Google extends Component {
  state = {
    isLoggedIn: false,
    userID: '',
    name:'',
    email: '',
    picture: '',
  }

  componentClicked = () => console.log("clicked");
  responseGoogle = response => {
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
      fbContent = (
        <div style={{
          width: '400px',
          margin: 'auto',
          background: '#f4f4f4',
          padding: '20px',
        }}>
        <img src={ this.state.picture } alt={ this.state.name } />
        <h2>Welcome { this.state.name }</h2>
        <p>Email: {this.state.email}</p>
       </div>
      );

    } else {
      fbContent = (<GoogleLogin
        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
  />,);
    }
    return (
      <div>
        { fbContent }
      </div>
    )
  }
}
