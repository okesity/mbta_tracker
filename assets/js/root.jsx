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
import swal from 'sweetalert';

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
      selectedRoute: {value: null},
      selectedStop: {value: null},
    }
    this.fetch_favstops();
    this.fetch_users();
    //console.log("check favstop list", this.state.favoritestops);
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
        console.log("fetch fav", resp.data);
        let state1 = _.assign({}, this.state, { favoritestops: resp.data });
        this.setState(state1);
      }
    );
  }

  fetch_users() {
    this.fetch_path(
      "/api/v1/users",
      (resp) => {
        console.log("fetch users", resp.data);
        let state1 = _.assign({}, this.state, { users: resp.data });
        this.setState(state1);
      }
    );
    console.log("users", this.state.users);
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
       alert("login failed, please try again", "error")
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
       let state1 = _.assign({}, this.state, { session: resp.data, sessionCreated: true});
       //document.cookie = "user_id" + this.state.session.state.user_id
       document.cookie = "token=" + state1.session.token;
       document.cookie = "user_id=" + state1.session.user_id;
       document.cookie = "user_email=" + state1.session.user_email;
       document.cookie = "user_name=" + state1.session.user_name;
       this.setState(state1);
     },
     error: (resp) => {
       //console.log("resp data", resp.data);
       swal("login failed, please try again", "error")
     }
   });

   console.log(this.state.session);
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
       swal("login failed, please try again", "error")
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
       swal({
         title: "Your Registration is Successful!",
         text: "success",
         icon: "success"})
       history.push('/favorite_stops');
     },
     error: (resp) => {
       swal("login failed, please try again", "error")
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
       swal({
         title: "Your Facebook Login is Successful!",
         text: "success",
         icon: "success",
       })
     },
     error: (resp) => {
       swal("login failed, please try again", "error")
     }
   });
  }

  add_to_favorite(name, user_id) {
    $.ajax("/api/v1/favoritestops", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({name, user_id}),
      success: (resp) => {
        let newfavstops = {
          id: resp.data.id,
          name: name,
          user_id: parseInt(user_id),
        }
        let state2 = this.state.favoritestops.concat(newfavstops);
        this.setState({favoritestops:state2});
        console.log("check state2 after fav stop is added", state2)
        swal({
          title: "this stop is added",
          text: "success",
          icon: "success",
        })
      },
      error: (resp) => {
        console.log("what is fv data in root", name);
        swal("something is wrong, please try again", "error")
      }
    });
  }

  delete_favoritestop(id) {
    $.ajax("/api/v1/favoritestops/" + id, {
     method: "delete",
     dataType: "json",
     contentType: "application/json; charset=UTF-8",
     data: JSON.stringify(id),
     success: (resp) => {
       // let state1 = _.assign({}, this.state, { session: resp.data, sessionCreated: true,});
       let stop1 = _.filter(this.state.favoritestops, (stop) => stop.id != id);
       console.log();
       let state1 = _.assign({}, this.state, { favoritestops: stop1, sessionCreated: true,});
       this.setState(state1);
       swal({
         title:"This stop is deleted",
         text: "success",
         icon: "success"});
     },
     error: (resp) => {
       swal("login failed, please try again", "error")
     }
   });
  }

  add_selectedRoute(selected){
    console.log("in root set route", selected);
    this.setState({selectedRoute: selected});
  }
  add_selectedStop(selected){
    console.log("in root set stop", selected);
    this.setState({selectedStop: selected});
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
              <FavoriteStops root={this} favoritestops={this.state.favoritestops} />
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
