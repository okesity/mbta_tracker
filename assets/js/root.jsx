import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
//import Facebook from './components/facebook';
import Header from './components/header';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './components/main';
import Login from './components/login';



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

    this.createSession("alice@example.com", "pass1");
  }

  createSession(email, password) {
    $.ajax("/api/v1/sessions", {
     method: "post",
     dataType: "json",
     contentType: "application/json; charset=UTF-8",
     data: JSON.stringify({email, password}),
     success: (resp) => {
       let state1 = _.assign({}, this.state, { session: resp.data });
       this.setState(state1);
     }
   });
  }

  render() {
    return(<div className="container">
    <Header />
      <Router>
        <div>
          <Route path="/" exact={true} render={() =>
            <div>
              <p>Hello Welcome to MBTA</p>
              <Main />
            </div>
        } />
    </div>
    </Router>
  </div>);
  }
}
