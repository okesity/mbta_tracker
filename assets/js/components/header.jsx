import React, { Component } from 'react';
import { NavLink, BrowserRouter} from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';

export default function Header(props) {
  let {root, session, sessionCreated} = props;

  let session_info;
  let session_view = <div><p>Hi, Welcome</p>
  <Button>Log out</Button>
  </div>

  if(sessionCreated) {
    session_info = session_view;
  } else {
    session_info = null;
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
            <NavLink to="/users" href="#" className="nav-link">Favorite Stops</NavLink>
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
