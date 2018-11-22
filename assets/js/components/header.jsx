import React, { Component } from 'react';
import { NavLink, Router as BrowserRouter, Link} from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import FavoriteStops from './favorite_stops';
import Registration from './registration';
import Schedule from './schedule';


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },

  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};




export default function Header(props) {
  let {root, session, sessionCreated} = props;
  console.log("check session in header", root.state.session);

  let session_info;
  let ul_info;

  function logout(props) {
    root.deleteSession(props);
    console.log("logout clicked");
    console.log("check session after delete", root.state.session);
  }

  if(root.state.session == null || root.state.sessionCreated == false) {
    console.log("check root in header", root);
    session_info =  null;
    ul_info = (<ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="#" exact={true} activeClassName="active" className="nav-link">Schedule</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="#" href="#" className="nav-link">Favorite Stops</NavLink>
        </NavItem>
      </ul>);

  } else {
    session_info = <div className="navbar-text">
      <span>{root.state.session.user_email}</span>
      <span> | </span>
     <Button onClick={logout}>Log out</Button>
    </div>;
    ul_info =<ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/schedule" exact={true} activeClassName="active" className="nav-link">Schedule</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/favorite_stops" href="#" className="nav-link">Favorite Stops</NavLink>
        </NavItem>
      </ul>;
  }

  return(
    <nav className="navbar navbar-light navbar-expand" style={{backgroundColor: "#e3f2fd"}}>
        <span className="navbar-brand">
          Task Tracker
        </span>
        { ul_info }
        { session_info }
    </nav>
  );
}
