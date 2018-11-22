import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Facebook from './facebook';
import { Form, FormGroup, Input, Button, Label, NavItem, NavLink } from 'reactstrap';
import { BrowserRouter, Routes, Router} from 'react-router-dom';
import root from '../root';
import $ from 'jquery';
import Select from 'react-select';
import MapContainer from './map';
import { Link } from 'react-router-dom';

export default function Home(props) {
  let {root, sessionCreated, session} = props;

  return(
    <div className="container">
      <h3 style={{marginTop: '50px'}}>Search a station or a subway line</h3>
      <Select id="selection" style={{marginTop: '230px', marginBottom: '100px'}}/>
      <MapContainer style={{marginTop: '100px'}}/>
    </div>
  )

}
