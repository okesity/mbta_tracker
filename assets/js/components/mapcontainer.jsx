import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Facebook from './facebook';
import { Form, FormGroup, Input, Button, Label, NavItem, NavLink } from 'reactstrap';
import { BrowserRouter, Routes, Router} from 'react-router-dom';
import root from '../root';
import $ from 'jquery';
import Select from 'react-select';
import MapElement from './map';
import { Link } from 'react-router-dom';

export default class MapContainer extends Component {
  constructor(props){
    super(props);
    this.state= {
      selectedRoute: 'Green-E',
      routes: [],
    }
    this.init_routes();
  }

  init_routes(){
    var routes_data={};
    fetch("https://api-v3.mbta.com/routes")
      .then(response => response.json())
      .then(json => {
         let routes = json.data.map(function(d){
           return {attributes: d.attributes, id: d.id};
         })
         routes_data = routes.map(function(r) {return {value: r.id, label: r.attributes.long_name}});
         this.setState({routes: routes_data});
      })
      .catch(error => console.error('Error:', error));
  }

  handleChange = (selected)=>{
    this.setState({selectedRoute: selected.value});
    console.log('changed state', this.state.selectedRoute);
  }
  render() {
    return(
      <div className="container">
        <h3 style={{marginTop: '50px'}}>Search a station or a subway line</h3>
        <Select isSearchable={true} placeholder='Green Line E' options={this.state.routes} onChange={this.handleChange}
          style={{marginTop: '230px', marginLeft: '100px', width: '100%'}}/>
        <br />
        <MapElement style={{paddingTop: '500px'}} selectedRoute={this.state.selectedRoute}/>
      </div>
    )
  }
}
