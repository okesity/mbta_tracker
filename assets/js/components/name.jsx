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
import ScheduleTable from './scheduletable';

class Name extends Component {
    constructor(props){
      super(props);
      this.state = {
          stop: props.stop,
          name: '',
          address: ''
      };
      this.getName(this.state.stop);
    }

    getName(stopID){
        fetch("https://api-v3.mbta.com/stops/"+stopID)
        .then(response => response.json())
        .then(json => {
           if(json.data){
                this.setState({name: json.data.attributes.name, 
                               address: json.data.attributes.address});
           }
       
        })
        .catch(error => console.error('Error:', error));
      }
      
    render(){
        return <div style={{fontSize: '18px'}}>{this.state.name}, {this.state.address}</div>
    }
}
export default Name;