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

  // let listofstops = props.root.state.favoritestops;
  //
  //
  // console.log("userfav", userfav);

  //let first = props.root.state.favoritestops[0].name;

  // let first = props.root.state.favoritestops
  //console.log(""favorite);
  //console.log("check favoritestop favorites", favoritestop);
  //let stops = _.map( favoritestops(favorite_stop) => <Favoritestop key={favorite_stop.id} root={root} /> );
//  let stops = _.map(favoritestops, (favoritestop) => <Favoritestop key={favoritestop.id} favoritestop={favoritestop} root={root} />);

  if(root.state.session == null) {
    return <div><Login root={props.root}/></div>;
  } else {
    var here = props.root;
    let listofstops = props.root.state.favoritestops;
    const userfav = listofstops.filter((stop) => {
      return stop.user_id == props.root.state.session.user_id
    })
    console.log("userfav", userfav);
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
          <tbody>{
            userfav.map(function(fav){
              return <tr>
                <td>{fav.name}</td>
                <td><Button onClick={()=>{here.delete_favoritestop(fav.id)}}>Delete</Button></td>
              </tr>
          })}
          </tbody>
        </Table>
      </div>
    )

  }
}
