import React, { Component } from 'react';
import { NavLink, Router as BrowserRouter, Link} from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import FavoriteStops from './favorite_stops';
import Registration from './registration';
import Schedule from './schedule';
//import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, Container, Mask, View } from 'mdbreact';


export default function Header(props) {
  let {root, session, sessionCreated} = props;

  let session_info;
  let ul_info;

  function logout(props) {
    root.deleteSession(props);
    console.log("logout clicked");
    console.log("check session after delete", root.state.session);
  }


  if(root.state.session == null) {
    console.log("check root in header", root);
    session_info =  null;
    ul_info = (<ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/schedule" exact={true} activeClassName="active" className="nav-link">Schedule</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="favorite_stops" href="#" className="nav-link">Favorite Stops</NavLink>
        </NavItem>
      </ul>);

      console.log("root session state", root.state.session)
      console.log("check session in header", root.state.session);
  } else {
    session_info = <div className="navbar-text">
      <span>{root.state.session.user_email}</span>
      <span> | </span>
     <Button onClick={logout}>Log out</Button>
    </div>;
    ul_info =<ul className="navbar-nav mr-auto">
        <NavItem classNmae="nav-item">
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link" style={{color: 'rgb(0,0,0)'}}>Home</NavLink>
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
    <nav className="navbar navbar-light navbar-expand" id="header" style={{backgroundColor: "#e3f2fd"}}>
        <span className="navbar-brand">
          MBTA Tracker
        </span>
        { ul_info }
        { session_info }
    </nav>

  );
}

// style={{backgroundColor: "#e3f2fd"}
// <Navbar id="header" expand="md" fixed="top" scrolling>
//   <NavbarBrand href="/">
//         <strong>MBTA Tracker</strong>
//   </NavbarBrand>
//     <NavItem active>
//       { ul_info }
//       { session_info }
//     </NavItem>
// </Navbar>
