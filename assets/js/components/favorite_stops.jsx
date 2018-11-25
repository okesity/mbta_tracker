import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Facebook from './facebook';
import { Form, FormGroup, Input, Button, Label, NavItem, NavLink, Table } from 'reactstrap';
import { BrowserRouter, Routes, Router} from 'react-router-dom';
import root from '../root';
import $ from 'jquery';
import Select from 'react-select';
import MapContainer from './map';
import Login from './login';
import schedule from './schedule';
import _ from 'lodash';

export default function FavoriteStops(props) {
  let {schedule, root, sessionCreated, session, favoritestops} = props;
  console.log("check fav in fav", props.root.state.favoritestops);

  let first = props.root.state.favoritestops[0].name;

  // let first = props.root.state.favoritestops
  //console.log(""favorite);
  //console.log("check favoritestop favorites", favoritestop);
  //let stops = _.map( favoritestops(favorite_stop) => <Favoritestop key={favorite_stop.id} root={root} /> );
//  let stops = _.map(favoritestops, (favoritestop) => <Favoritestop key={favoritestop.id} favoritestop={favoritestop} root={root} />);

  if(root.state.session == null) {
    return <div><Login root={props.root}/></div>;
  } else {
    return(
      <div className="container" style={{marginTop: '50px'}}>
        <h3>Your favorite Stops</h3>
        <Table>
          <thead>
            <tr>
              <th>Stop Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {first}
          </tbody>
        </Table>
      </div>
    )

  }
}

// return <div className="fluid-container">
//     <h3 style={{marginTop: '50px'}}>Your Favorite stops</h3>
//     {stops}
//   </div>

function Favoritestop(props) {
  let {favoritestop} = props;
      return
        <div className="container">
            <Table>
              <thead>
                <tr>
                  <th>Stop Name</th>
                  <th>Route</th>
                  <th>Direction</th>
                  <th>Arrival</th>
                  <th>Departure</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>favoritestop.stopname</td>
                  <td>favoritestop.route</td>
                  <td>favoritestop.direction</td>
                  <td>favoritestop.arrive</td>
                  <td>favoritestop.depart</td>
                </tr>
              </tbody>
            </Table>
        </div>
}
