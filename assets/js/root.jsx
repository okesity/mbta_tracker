import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Header from './components/header';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './components/main';
import Login from './components/login';
import $ from 'jquery';



export default function root_init(node) {
  ReactDOM.render(<Root /> ,node);
}

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      session: null,
      sessionCreated: false,

    }
  }

  createSession(email, password) {
    $.ajax("/api/v1/sessions", {
     method: "post",
     dataType: "json",
     contentType: "application/json; charset=UTF-8",
     data: JSON.stringify({email, password}),
     success: (resp) => {
       let state1 = _.assign({}, this.state, { session: resp.data, sessionCreated: true,});
       this.setState(state1);
       //document.cookie = "email="
       // console.log("what is state1")
       // console.log(state1)
     },
     error: (resp) => {
       alert("login failed, please try again")
     }
   });
  }

  deleteSession() {
    $.ajax("/api/v1/sessions", {
     method: "delete",
     dataType: "json",
     contentType: "application/json; charset=UTF-8",
     data: null,
     //data: JSON.stringify({email, password}),
     success: (resp) => {
       let state1 = _.assign({}, this.state, { session: resp.data, sessionCreated: true,});
       this.setState(state1);
       // console.log("what is state1")
       // console.log(state1)
     },
     error: (resp) => {
       alert("login failed, please try again")
     }
   });
  }

  render() {
    return(<div className="container">
    <Header root={this}/>
      <Router>
        <div>
          <Route path="/" exact={true} render={() =>
            <div>
              <Main root={this}/>
            </div>
        } />
    </div>
    </Router>
  </div>);
  }
}
