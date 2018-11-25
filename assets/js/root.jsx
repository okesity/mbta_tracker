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
import { CookiesProvider, withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

function initSession() {
  let token = getCookie("token=");
  let user_id = getCookie("user_id=");
  let user_name = getCookie("user_name=");
  let user_email = getCookie("user_email=");

  if(token && user_id && user_name && user_email) {
      return {token, user_id, user_name, user_email};
  } else {
    return null;
  }
}


export default function root_init(node) {
  ReactDOM.render(<Root /> ,node);
}

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      favoritestops: [],
      session: initSession(),
      sessionCreated: false,
    }
    this.fetch_favstops();
    console.log("check favstop list", this.state.favoritestops);
  }

  fetch_path(path, on_success) {
    $.ajax(path, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: on_success,
    });
  }

  fetch_favstops() {
    this.fetch_path(
      "/api/v1/favoritestops",
      (resp) => {
        let state1 = _.assign({}, this.state, { favoritestops: resp.data });
        this.setState(state1);
      }
    );
  }


  createSession(email, password) {
    $.ajax("/api/v1/sessions", {
     method: "post",
     dataType: "json",
     contentType: "application/json; charset=UTF-8",
     data: JSON.stringify({email, password}),
     success: (resp) => {
       let state1 = _.assign({}, this.state, { session: resp.data, sessionCreated: true,});
       //let state2 = cookies.set({}. this.state, state1, { path: '/'});
       document.cookie = "token=" + state1.session.token;
       document.cookie = "user_id=" + state1.session.user_id;
       document.cookie = "user_email=" + state1.session.user_email;
       document.cookie = "user_name=" + state1.session.user_name;
       this.setState(state1);
       console.log("state1", state1)
     },
     error: (resp) => {
       alert("login failed, please try again")
     }
   });
  }

  createOauthSession(name, email) {
    $.ajax("/api/v1/oauthsessions", {
     method: "post",
     dataType: "json",
     contentType: "application/json; charset=UTF-8",
     data: JSON.stringify({name, email}),
     success: (resp) => {
       let state1 = _.assign({}, this.state, { session: resp.data, sessionCreated: true,});
       //document.cookie = "user_id" + this.state.session.state.user_id
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
     success: (resp) => {
       let state1 = _.assign({}, this.state, { session: resp.data, sessionCreated: false,});
       document.cookie = "token=";
       document.cookie = "user_id=";
       document.cookie = "user_email=";
       document.cookie = "user_name=";

       this.setState(state1);
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
     data: JSON.stringify({name, email, password}),
     success: (resp) => {
       console.log("check resp data", resp.data)
       alert("Your Registration is Successful!")
       history.push('/');
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
     data: JSON.stringify({name, email, password}),
     success: (resp) => {
       console.log("check resp data", resp.data)
       alert("Your Facebook Login is Successful!")
     },
     error: (resp) => {
       alert("login failed, please try again")
     }
   });
  }

  add_to_favorite(name) {
    $.ajax("/api/v1/favoritestops", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({name}),
      success: (resp) => {
        let newfavstops = {
          name: name,
        }
        let state1 = _.assign({}, this.state, {favoritestops: newfavstops});
        this.setState(state1);
        console.log("check state after fav stop is added", state1)
        alert("this stop is added")
      },
      error: (resp) => {
        console.log("what is fv data in root", name);
        alert("something is wrong, please try again")
      }
    });
  }

  // add_to_favorite = (name) => {
  //   $.ajax("/api/v1/favoritestops/", {
  //     method: "post",
  //     dataType: "json",
  //     contentType: "application/json; charset=UTF-8",
  //     data: JSON.stringify({name}),
  //     success: (resp) => {
  //       let newfavstops = {
  //         name: name,
  //         route: route,
  //         directon: direction,
  //         arrive: arrive,
  //         depart: depart,
  //       }
  //       let state1 = _.assign({}, this.state, {favoritestops: newfavstops});
  //       this.setState(state1);
  //       console.log()
  //       alert("this stop is added")
  //     },
  //     error: (resp) => {
  //       console.log("what is fv data in root", data);
  //       alert("something is wrong, please try again")
  //     }
  //   });
  // }

  tryout() {
    alert("calling from schedule works")
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


function getCookie(name) {
 //var cname = cname + "=";
 var decodedCookie = decodeURIComponent(document.cookie);
 var ca = decodedCookie.split(';');
 for(var i = 0; i <ca.length; i++) {
     var c = ca[i];
     while (c.charAt(0) === ' ') {
         c = c.substring(1);
     }
     if (c.indexOf(name) === 0) {
         return c.substring(name.length, c.length);
     }
 }
  return "";
}
