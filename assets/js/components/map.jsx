import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react';
import { Jumbotron, Container, Button } from 'reactstrap';

var polyline = require('@mapbox/polyline');
var vehiclehandler;
class MapElement extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeMarker: {},
      selectedPlace: {},
      selectedRoute: props.selectedRoute,
      showingInfoWindow: false,
      showingStops: false,
      showingVehicles: true,
      showingContour: true,
      shape: null,
      vehicles: [{lat: 0, lng: 0}],
      stops: [{lat: 0, lng: 0}],
      bounds: null,
      center: null
    };

    this.get_location = this.get_location.bind(this);
    this.get_shape = this.get_shape.bind(this);
    this.VehicleMarker = this.VehicleMarker.bind(this);
    this.get_stops = this.get_stops.bind(this);
    this.setoption = this.setoption.bind(this);


    this.get_location();
    this.get_stops();
    this.get_shape();
    this.get_vehicles();
  }

  componentDidMount() {
    console.log("refreshing", this.state.selectedRoute);
    var flag = this.state.showingVehicles;
    setInterval(()=>{if(flag){this.get_vehicles()}},7000);
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps.selectedRoute);
    if(nextProps.selectedRoute && nextProps.selectedRoute!=this.state.route){
      let route = nextProps.selectedRoute;
      this.setState({selectedRoute: route});
      console.log("received",this.state.selectedRoute);
      this.get_shape(route);
      this.get_vehicles(route);
      this.get_stops(route);
      //clearInterval(vehiclehandler);
      //vehiclehandler = setInterval(this.get_vehicles(),5000);  //refresh vehicle data every 1 second
    }
  }

  get_location(){
    console.log("getting location");
    var here=this;        //closure
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position) {
        let centerpoint = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        here.setState({center: centerpoint});
      },function(){
          console.log("error getting location");
        });
      }
  }

  //get Green-E shape
  get_shape(route = this.state.selectedRoute){
    console.log("getting shape", route);
    fetch("https://api-v3.mbta.com/shapes?filter[route]="+route)
      .then(response => response.json())
      .then(json => {
          console.log("get shape data", json, route);
          this.set_bounds(json.data);
      })
      .catch(error => console.error('Error:', error));
  }

  //get Green-E stops
  get_stops(route = this.state.selectedRoute){
    fetch("https://api-v3.mbta.com/stops?filter[route]="+route)
    .then(response => response.json())
    .then(json => {
        let stops = json.data.map(d => d.attributes);
        let stops_data = stops.map(function(stop){ return {lat: stop.latitude, lng: stop.longitude, name: stop.name, address: stop.address}});
        this.setState({stops: stops_data});
    })
    .catch(error => console.error('Error:', error));
  }

  //turn polyline to boundary points
  set_bounds(data){
    console.log("invoked set bounds");
    if(data.length>0){
      let points = [];
      for(let i=0;i<data.length-1;i++)
        if(data[i].attributes.priority>=0)
          points = _.union(points, polyline.decode(data[i].attributes.polyline));
      points = points.map(function(point){ return {lat: point[0], lng: point[1]}; });
      this.setState({bounds: points});
    }
  }

  get_vehicles(route = this.state.selectedRoute){
    if(route){
      fetch("https://api-v3.mbta.com/vehicles?filter[route]="+route)
      .then(response => response.json())
      .then(json => {
          let v = json.data.map(d => d.attributes);
          let vehicles_data = v.map(function(vehicle){ return {lat: vehicle.latitude, lng: vehicle.longitude, direction: vehicle.direction_id}});
          this.setState({vehicles: vehicles_data});
      })
      .catch(error => console.error('Error:', error));
    }
  }

  setoption(option){
    console.log(option);
    switch(option){
      case 'location':
          if(this.state.center){
            this.get_location();
          }
          else{
            alert('GPS Disabled, Please Refresh');
          }
          break;
      case 'stops':
          this.setState({showingStops: !this.state.showingStops});
          break;
      case 'vehicles':
          this.setState({showingVehicles: !this.state.showingVehicles});
          break;
      case 'contour':
          this.setState({showingContour: !this.state.showingContour});
          break;
    }
  }


  onMarkerClick = function(props, marker){
    console.log(props);
    console.log(marker);
    if(marker.vehicle){ //if this marker is a vehicle
      this.setState({
        activeMarker: marker,
        selectedPlace: {name: 'vehicle', lat: marker.vehicle.lat,
                        lng: marker.vehicle.lng, direction: marker.vehicle.direction?'InBoard':'OutBoard'},
        showingInfoWindow: true
      });
    }
    else if (marker.stop){
      console.log("click on stop marker");
      this.setState({
        activeMarker: marker,
        selectedPlace: {name: 'stop', lat: marker.stop.lat,
                        lng: marker.stop.lng, address: marker.stop.address},
        showingInfoWindow: true
      });
    }
    else{
      this.setState({
        activeMarker: marker,
        selectedPlace: {name: 'Current Location', lat: this.state.center.lat,
                        lng: this.state.center.lng},
        showingInfoWindow: true
      });
    }

  }.bind(this);


  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };

  VehicleMarker(){
    console.log("start rendering");
    let vlist = [];
    if(this.state.vehicles != null){
      console.log("rendering vehicles", this.state.vehicles );
      for(let i=0;i<this.state.vehicles.length;i++){
        var v = this.state.vehicles[i];
        console.log("v is",v);
        vlist.push(<Marker position={{lat: v.lat, lng: v.lng}}/>)
      }

      return vlist;
    }
    else{
      console.log("getting vs");
      this.get_vehicles();

    }
  }

  render() {
    // const { FaIcon, FaStack } = require('react-fa-icon');
    if (!this.props.loaded) return <div>Loading...</div>;
    let here=this;
    return (<div>
      <Jumbotron fluid style={{width: '1120px', height: '1000px'}}>
      <Container>
      <h5 style={{color: "black", paddingLeft: '380px', font: 'Helvatica'}}>Now You can interact with the Map</h5>
      <hr style={{color: 'black'}}/>
        <Button id="map-btn" style={{marginRight: '100px', marginLeft: '100px'}} outline color="info" onClick={this.setoption.bind(this,'location')}>Reset Location</Button>
        <Button id="map-btn" style={{marginRight: '100px'}}outline color="success" onClick={this.setoption.bind(this,'vehicles')}>Display Vehicles</Button>
        <Button id="map-btn" style={{marginLeft: '10px'}}outline color="danger"  onClick={this.setoption.bind(this,'stops')}>Display Stops</Button>
        <Button id="map-btn" style={{marginLeft: '100px'}}outline color="primary" onClick={this.setoption.bind(this,'contour')}>Display Contour</Button>
      <Map
        className="map"
        google={this.props.google}
        onClick={this.onMapClicked}
        style={{ height: '780px', position: 'relative', width: '1090px', marginTop: '40px' }}
        zoom={14}
        center={this.state.center || {lat:42.33, lng: -71.09}}
        >
        {
          this.state.center && <Marker name="Current location" onClick={this.onMarkerClick} position={this.state.center} />
        }
        {
          this.state.showingVehicles && this.state.vehicles.map(v=>
            <Marker vehicle={v} position={{lat: v.lat, lng: v.lng}}
                     onClick={here.onMarkerClick} />)
        }

        {
          this.state.showingStops && this.state.stops.map(s =>
            <Marker stop={s} onClick={here.onMarkerClick}
                    position={{lat: s.lat, lng: s.lng}} />)
        }

        {this.state.showingContour && <Polyline path={this.state.bounds} strokeColor="#008000"/>}
        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}>
          <div>
            <h3>{this.state.selectedPlace.name}</h3>
            <p>{'Lat: '+this.state.selectedPlace.lat}</p>
            <p>{'Lng: '+this.state.selectedPlace.lng}</p>
            <p>{this.state.selectedPlace.direction}</p>
            <p>{this.state.selectedPlace.address}</p>
          </div>
        </InfoWindow>
      </Map>
    </Container>
      </Jumbotron>
      </div>
    );
  }
}




export default GoogleApiWrapper({
apiKey: ("AIzaSyBhLvg_Vwoau_QHkCZVz8XtVvzMW8NX86w")
})(MapElement)
