import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Header from './components/header';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './components/main';
import Login from './components/login';
import $ from 'jquery';
import Registration from './components/registration';
import Schedule from './components/schedule';
import FavoriteStops from './components/favorite_stops';



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
       let state1 = _.assign({}, this.state, { session: resp.data, sessionCreated: false,});
       this.setState(state1);
       console.log("check rep data", rep.data);
       // console.log("what is state1")
       // console.log(state1)
     },
     error: (resp) => {
       alert("login failed, please try again")
     }
   });
  }

  createUser(name, email, password, history) {
    $.ajax("/api/v1/newuser", {
     method: "post",
     dataType: "json",
     contentType: "application/json; charset=UTF-8",
     //data: null,
     data: JSON.stringify({name, email, password}),
     success: (resp) => {
       console.log("check resp data", resp.data)
       alert("Your Registration is Successful!")
      // let new_session = {
      //   user_email: resp.data.email
      // }
      //
      //  let state2 = _.assign({}, this.state, { session: new_session, sessionCreated: true});
       // let state1 = _.assign({}, this.state, { sessionCreated: true});
       //this.setState(state2);
       // console.log("what is state1")
       // console.log(state1)
       history.push('/')

     },
     error: (resp) => {
       alert("login failed, please try again")
     }
   });
  }


  createOauthUser(name, email, password) {
    $.ajax("/api/v1/newuser", {
     method: "post",
     dataType: "json",
     contentType: "application/json; charset=UTF-8",
     //data: null,
     data: JSON.stringify({name, email, password}),
     success: (resp) => {
       console.log("check resp data", resp.data)
       alert("Your Facebook Login is Successful!")
      // let new_session = {
      //   user_email: resp.data.email
      // }
      //
      //  let state2 = _.assign({}, this.state, { session: new_session, sessionCreated: true});
       // let state1 = _.assign({}, this.state, { sessionCreated: true});
       //this.setState(state2);
       // console.log("what is state1")
       // console.log(state1)
       //history.push('/')

     },
     error: (resp) => {
       alert("login failed, please try again")
     }
   });
  }



  render() {
    return(<div>
      <Router>
        <div>
        <Header root={this}/>
        <div className="row">
          <div className="col-12">
          <Route path="/" exact={true} render={() =>
            <Main root={this}/>
        } />

        <Route path="/registration" exact={true} render={() =>
            <Registration root={this} />
        } />

        <Route path="/schedule" exact={true} render={() =>
            <Schedule root={this} />
          } />

        <Route path="/favorite_stops" exact={true} render={() =>
              <FavoriteStops root={this} />
          } />
      </div>
      </div>
    </div>
    </Router>
  </div>);
  }
}
