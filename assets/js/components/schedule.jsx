import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Facebook from './facebook';
import { Form, FormGroup, Input, Button, Label, NavItem, NavLink, Table } from 'reactstrap';
import { BrowserRouter, Routes, Router} from 'react-router-dom';
import root from '../root';
import $ from 'jquery';
import Select from 'react-select';
import Login from './login';

// var routes=()=>{
//   var routes_data={};
//   console.log("getting routes in schedule");
//   fetch("https://api-v3.mbta.com/routes")
//     .then(response => response.json())
//     .then(json => {
//        let routes = json.data.map(function(d){
//          return {attributes: d.attributes, id: d.id};
//        })
//        routes_data = routes.map(function(r) {return {value: r.attributes.long_name, label: r.id}});
//     })
//     .catch(error => console.error('Error:', error));
//   console.log('options:',routes);
//   return routes_data;
// };

//var options=[];
class Schedule extends Component {
  constructor(props){
    super(props);
    this.state = {
      root: props.root,
      stops: [],
      selectedStops: null,
      predictions: [],
    };   
 
    this.initStops();
  }

  initStops(){
    var stops_data=[];
    console.log("getting routes in schedule, initStops");
    fetch("https://api-v3.mbta.com/stops")
      .then(response => response.json())
      .then(json => {
         let stops = json.data.map(function(d){
           return {attributes: d.attributes, id: d.id};
         })
         stops_data = stops.map(function(r) {return {value: r.id, label: r.attributes.description || r.attributes.name}});
         this.setState({stops: stops_data});
      })
      .catch(error => console.error('Error:', error));
  }


  handleChange = (selected)=>{
    this.setState({selectedStop: selected.value});
    this.getPrediction(selected.value);
    console.log('changed stop', selected);
  }

  getPrediction(stopID){
    var prediction_data = [];
    console.log("getting prediction data", stopID);
    fetch("https://api-v3.mbta.com//predictions?filter[stop]="+stopID)
    .then(response => response.json())
    .then(json => {
      console.log("get data", json.data);
       let predictions = json.data.map(function(d){
         return {attributes: d.attributes, relationships: d.relationships};
       })
       prediction_data = predictions.map(function(p) {
         return {arrive: p.attributes.arrival_time, 
                 depart: p.attributes.departure_time,
                 direction: p.attributes.direction_id,
                 route: p.relationships.route.data.id}
       });
       console.log("get prediction", prediction_data);
       this.setState({predictions: prediction_data});
    })
    .catch(error => console.error('Error:', error));
  }

  render(){
    //let {root, sessionCreated, session} = props;
    // console.log("check", this.state.root.session);

    // if(root.state.session == null || root.state.sessionCreated == false) {
    //   return <div><Login root={props.root}/></div>;
    // } 
    // else {
      return(<div className="container">
        <h3 style={{marginTop: '50px'}}>Search station to see the schedule</h3>
        <Select id="selection-stops" isSearchable={true} 
                options={this.state.stops} onChange={this.handleChange} 
                style={{marginTop: '230px', marginBottom: '100px'}}/>
        <br />
        <Table>
          <thead>
            <tr>
              <th>Route</th>
              <th>Direction</th>
              <th>Arrival Time</th>
              <th>Departure Time</th>
            </tr>
          </thead>
          <tbody>
              {this.state.predictions.map(function(prediction){
                return <tr>
                  <td>{prediction.route}</td>
                  <td>{prediction.direction?'InBoard':'OutBoard'}</td>
                  <td>{prediction.arrive}</td>
                  <td>{prediction.depart}</td>
                </tr>
              })}
              <tr>{this.state.predictions.length==0?'No data':''}</tr>
          </tbody>
        </Table>

      </div>)
    // }
  }
}
export default Schedule;