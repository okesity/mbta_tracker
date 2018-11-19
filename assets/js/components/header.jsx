import React, { Component } from 'react';
import { NavLink, BrowserRouter} from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import FavoriteStops from './favorite_stops';


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

  function logout(props) {
    root.deleteSession(props);
    console.log("logout clicked");
    console.log("check session after delete", root.state.session);
  }

  if(root.state.session == null) {
    console.log("check root in header", root);
    session_info = null;
  } else {
    session_info = <div className="navbar-text">
      <span>{root.state.session.user_name}</span>
      <span> | </span>
     <Button onClick={logout}>Log out</Button>
    </div>;
  }

  return(
    <BrowserRouter>
    <nav className="navbar navbar-light navbar-expand" style={{backgroundColor: "#e3f2fd"}}>
        <span className="navbar-brand">
          Task Tracker
        </span>
        <ul className="navbar-nav mr-auto">
          <NavItem>
            <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/favorite_stops" href="#" className="nav-link">Favorite Stops</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/users" href="#" className="nav-link">Map</NavLink>
          </NavItem>
        </ul>
        { session_info }
    </nav>
    </BrowserRouter>
  );
}
