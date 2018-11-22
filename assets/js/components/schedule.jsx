import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Facebook from './facebook';
import { Form, FormGroup, Input, Button, Label, NavItem, NavLink, Table } from 'reactstrap';
import { BrowserRouter, Routes, Router} from 'react-router-dom';
import root from '../root';
import $ from 'jquery';
import Select from 'react-select';
import Login from './login';


export default function Schedule(props) {
  let {root, sessionCreated, session} = props;
  console.log("check", root.session);

  if(root.state.session == null || root.state.sessionCreated == false) {
    return <div><Login root={props.root}/></div>;
  } else {
    return(<div className="container">
      <h3 style={{marginTop: '50px'}}>Search station to see the schedule</h3>
      <Select id="selection" style={{marginTop: '230px', marginBottom: '100px'}}/>
      <br />
      <Table>
        <thead>
          <tr>
            <th>Arrival Time</th>
            <th>Departure Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </Table>

    </div>)
  }
}
