import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Facebook from './facebook';
import { Form, FormGroup, Input, Button, Label, NavItem, NavLink, Table } from 'reactstrap';
import { BrowserRouter, Routes, Router} from 'react-router-dom';
import root from '../root';
import * as $AB from 'jquery';
import Select from 'react-select';
import Login from './login';
//import * as Ons from 'react-onsenui.js';

class Schedule extends Component {
  constructor(props){
    //let {root} = props;
    super(props);
    this.state = {
      root: props.root,
      routes:[],
      selectedRoute: null,
      stops: [],
      selectedStop: null,
      predictions: [],
    };
    //this.addstop = this.addstop.bind(this);
    console.log("check root state in schedule", this.state.root);
    this.initRoutes();
    //this.add_stop();
  }

  initRoutes(){
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

  getStops(routeID){
    var stops_data=[];
    console.log("getting stops in schedule, initStops");
    fetch("https://api-v3.mbta.com/stops?filter[route]=" + routeID)
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

  handleChangeRoute = (selected)=>{
    this.setState({selectedRoute: selected.value});
    this.getStops(selected.value);
    console.log('changed route', selected);
  }

  handleChangeStop = (selected)=>{
    this.setState({selectedStop: selected.value});
    this.getPrediction(selected);
    console.log('changed stop', selected);
  }

  getPrediction(stop){
    var stopID=stop.value;
    var routeName=this.state.selectedRoute;
    var prediction_data = [];
    console.log("getting prediction data", stop, this.state.selectedRoute);
    fetch("https://api-v3.mbta.com/predictions?filter[stop]="+stopID)
    .then(response => response.json())
    .then(json => {
      console.log("get data", json.data);
       let predictions = json.data.map(function(d){
           return {attributes: d.attributes, relationships: d.relationships};
       })
       let route_data=predictions.filter(function(p){
         return p.relationships.route.data.id==routeName;
       });
       prediction_data = route_data.map(function(p) {
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

  addstop(props) {
    console.log("button clicked")
    let stop = this.state.stops.map(function(prediction){stop.lable});
    this.state.root.add_to_favorite(stop);
  }

  tryout(props) {
    alert("try1");
  }

  render(){
    let plabel = this.state.predictions.map(function(prediction){prediction.lable});
    console.log("check what is plabel", plabel);
    var here = this.state;
      return(<div className="container">
        <h3 style={{marginTop: '50px'}}>Search station to see the schedule</h3>
        <Select id="selection-routes" isSearchable={true}
                options={this.state.routes} onChange={this.handleChangeRoute}
                placeholder='Select Route'
                style={{marginTop: '230px', marginBottom: '100px'}}/>

        <Select id="selection-stops" isSearchable={true}
                options={this.state.stops} onChange={this.handleChangeStop}
                placeholder='Select Stop'
                style={{marginTop: '230px', marginBottom: '100px'}}/>
        <br />
        <Table>
          <thead>
            <tr>
              <th>Route</th>
              <th>Direction</th>
              <th>Arrival Time</th>
              <th>Departure Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.predictions.map(function(prediction){
                return <tr>
                  <td>{prediction.route}</td>
                  <td>{prediction.direction?'InBoard':'OutBoard'}</td>
                  <td>{prediction.arrive}</td>
                  <td>{prediction.depart}</td>
                  <td><Button onClick={()=>{
                      console.log("check here stop name", here.selectedStop);
                      here.root.add_to_favorite(here.selectedStop);}}>Save</Button></td>
                </tr>
              })}
              <tr>{this.state.predictions.length==0?'No data':''}</tr>
          </tbody>
        </Table>
        <Button onClick={() => this.props.root.tryout()}>test button</Button>
      </div>)
    // }
  }
}
export default Schedule;

  // <td><Button onClick={this.props.root.add_to_favorite()}>Save</Button></td>

//add_to_favorite = () => (async () => {this.state.root.add_to_favorite(plabel)})()

// <td><Button onClick={() => this.props.root.add_to_favorite(this.handleChangeStop, prediction.route,
//     prediction.direction, prediction.arrive, prediction.depart)} onChange=props.add()>Save</Button></td>
// return <tr>
//   <td>{prediction.route}</td>
//   <td>{prediction.direction?'InBoard':'OutBoard'}</td>
//   <td>{prediction.arrive}</td>
//   <td>{prediction.depart}</td>
//   <td><Button onClick={this.addstop}>Save</Button></td>
// </tr>


// <tr>
//    <td>{this.state.predictions.map(function(prediction){prediction.rout})}</td>
//    <td>{this.state.predictions.map(function(prediction){prediction.direction?'InBoard':'OutBoard'})}</td>
//    <td>{this.state.predictions.map(function(prediction){prediction.arrive})}</td>
//    <td>{this.state.predictions.map(function(prediction){prediction.depart})}</td>
//    <td><Button onClick={(props) => this.state.root.add_to_favorite(plabel)}>Save</Button></td>
//    </tr>
