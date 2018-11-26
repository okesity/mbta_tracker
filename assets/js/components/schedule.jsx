import React, { Component } from 'react';
import Timeline from '../Timeline/src/Timeline'
import ReactDOM from 'react-dom';
import Facebook from './facebook';
import { Form, FormGroup, Input, Button, Label, NavItem, NavLink, Table } from 'reactstrap';
import { BrowserRouter, Routes, Router} from 'react-router-dom';
import root from '../root';
import * as $AB from 'jquery';
import Select from 'react-select';
import moment from 'moment';

const events = [
  {ts: "2017-09-17T12:22:46.587Z", text: 'Logged in'},
  {ts: "2017-09-17T12:21:46.587Z", text: 'Clicked Home Page'},
  {ts: "2017-09-17T12:20:46.587Z", text: 'Edited Profile'},
  {ts: "2017-09-16T12:22:46.587Z", text: 'Registred'},
  {ts: "2017-09-16T12:21:46.587Z", text: 'Clicked Cart'},
  {ts: "2017-09-16T12:20:46.587Z", text: 'Clicked Checkout'},
];

// const events = Schedule.state.predictions.map(function(prediction){
//   [{ts: prediction.arrive, text: prediction.route}]
// })

console.log("check ev", events);

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
      timeDiff: false,
    };
    this.displayTime = this.displayTime.bind(this);
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

  displayTime(string){
    if(!string)
    return 'null';
    var time = new Date(string);
    var m = moment(time);
    if(this.state.timeDiff){
      return m.fromNow()
    }
    else{
      return m.format('h:mm:ss a');
    }
  }

  tryout(props) {
    alert("try1");
  }

  render(){
    let events1 = this.state.predictions.map(function(prediction){
      [{ts: prediction.arrive, text: prediction.route}]
    })
    let plabel = this.state.predictions.map(function(prediction){prediction.arrive});
    var displayTime = this.displayTime;
    var here = this.state;
    let schedule_session_view;
    console.log("check session in schedule", here.root.state.session);
    if(here.root.state.session == null) {
      schedule_session_view = null;
    } else {
      schedule_session_view = <div><p style={{fontSize: '18px', color: '#2BBBAD'}}>Click to save this stop to your favoritestops &#10145;</p>
        <Button outline color="info"s style={{borderRadius: '20px', marginLeft: "375px", marginTop: '-80px'}}onClick={()=>{
          console.log("check here stop name", here.selectedStop);
          console.log("check here schedule session user id", here.root.state.session.user_id)
          here.root.add_to_favorite(here.selectedStop, here.root.state.session.user_id);}}>Save</Button></div>;
    }
      return(<div className="container">
        <div>
        <h3 style={{marginTop: '50px'}}>Search station to see the schedule</h3>
        <Select id="selection-routes" isSearchable={true}
                options={this.state.routes} onChange={this.handleChangeRoute}
                placeholder='Select Route'
                style={{marginTop: '230px', marginBottom: '100px'}}/>
        <br />

        <Select id="selection-stops" isSearchable={true}
                options={this.state.stops} onChange={this.handleChangeStop}
                placeholder='Select Stop'
                style={{marginTop: '230px', marginBottom: '100px'}}/>
        <br />
        {schedule_session_view}
        <br />
        <br />
        <h5 style={{marginLeft: '450px'}}>Schedule Info Table</h5>
        <Table hover>
          <thead className="thead-light" style={{fontSize: '18px'}}>
            <tr>
              <th>Route</th>
              <th>Direction</th>
              <th>Arrival Time</th>
              <th>Departure Time</th>
              <th><button className="btn btn-success btn-sm" style={{borderRadius: '15px'}}onClick={()=>this.setState({timeDiff: !this.state.timeDiff})}>Time Diff</button></th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.predictions.map(function(prediction){
                return <tr>
                  <td>{prediction.route}</td>
                  <td>{prediction.direction?'InBoard':'OutBoard'}</td>
                  <td>{displayTime(prediction.arrive)}</td>
                  <td>{displayTime(prediction.depart)}</td>
                  <td></td>
                </tr>
              })}
              <tr>{this.state.predictions.length==0?'No data':''}</tr>
          </tbody>
        </Table>
      </div>
    </div>)
    // }
  }
}
export default Schedule;
// <div>
//   <Timeline items={events} />
// </div>

//    <td>{this.state.predictions.map(function(prediction){prediction.depart})}</td>
//    <td><Button onClick={(props) => this.state.root.add_to_favorite(plabel)}>Save</Button></td>
//    </tr>

//<Timeline items={events} />
