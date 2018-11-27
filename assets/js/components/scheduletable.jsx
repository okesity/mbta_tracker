import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Facebook from './facebook';
import { Form, FormGroup, Input, Button, Label, NavItem, NavLink, Table } from 'reactstrap';
import { BrowserRouter, Routes, Router} from 'react-router-dom';
import moment from 'moment';

class ScheduleTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedStop: props.stop,
      predictions: [],
      timeDiff: false,
    };
    this.displayTime = this.displayTime.bind(this);
    if(props.stop){
      this.getPrediction(props.stop);
    }
  }


  getPrediction(stop){
    var stopID=stop;
    var routeName='';
    if(this.state.selectedRoute)      //check if preset value exsist
      routeName=this.state.selectedRoute;
    var prediction_data = [];
    fetch("https://api-v3.mbta.com/predictions?filter[stop]="+stopID)
    .then(response => response.json())
    .then(json => {
       let predictions = json.data.map(function(d){
           return {attributes: d.attributes, relationships: d.relationships};
       })
       let route_data = predictions;
       if(route_data.length>4)
          route_data=predictions.slice(0,4);
       prediction_data = route_data.map(function(p) {
          return {arrive: p.attributes.arrival_time,
                 depart: p.attributes.departure_time,
                 direction: p.attributes.direction_id,
                 route: p.relationships.route.data.id}
       });
       this.setState({predictions: prediction_data});
    })
    .catch(error => console.error('Error:', error));
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


  render(){
    var displayTime = this.displayTime;

      return(<div className="container">
        <div>
        <br />
        <Table hover>
          <thead className="thead-light" style={{fontSize: '10px'}}>
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
  }
}
export default ScheduleTable;
