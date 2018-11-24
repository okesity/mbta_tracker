
import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react';

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
    
    // if(this.props.selectedRoute!=null)
    //   this.setState({selectedRoute: this.props.selectedRoute});
    this.get_location();
    this.get_stops();
    this.get_shape();
    this.get_vehicles();
  }

  componentDidMount() {
    console.log("refreshing", this.state.selectedRoute);
    setInterval(this.get_vehicles.bind(this),5000);
  }
  
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps.selectedRoute);
    if(nextProps.selectedRoute && nextProps.selectedRoute!=this.state.route){
      let route = nextProps.selectedRoute;
      this.setState({selectedRoute: route});
      console.log("received",this.state.selectedRoute);
      this.get_shape(route);
      this.get_vehicles(route);
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
  get_stops(){
    fetch("https://api-v3.mbta.com/stops?filter[route]="+this.state.selectedRoute)
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
      let points = polyline.decode(data[0].attributes.polyline);
      points = points.map(function(point){ return {lat: point[0], lng: point[1]}; });
      this.setState({bounds: points});
    }
  }

  get_vehicles(route = this.state.selectedRoute){
    console.log("getting vehicle", route);
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


  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    });

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
      // this.state.vehicles.map(v => {
      //   return <Marker position={{lat: v.lat, lng: v.lng}} />
      //   });
      // let v=this.state.vehicles[0];
      // let pos = {lat: v.lat, lng: v.lng};
      // return <Marker name="avv" onClick={this.onMarkerClick} position={pos} />
    }
    else{
      console.log("getting vs");
      this.get_vehicles();

    }
  }

  render() {
    if (!this.props.loaded) return <div>Loading...</div>;

    return (
      <Map
        className="map"
        google={this.props.google}
        onClick={this.onMapClicked}
<<<<<<< HEAD
        style={{ height: '700px', position: 'relative', width: '1100px', marginTop: '100px' }}
=======
        //style={{ height: '100%', position: 'relative', width: '100%' }}
>>>>>>> 71cc6d898446b5a3015f15f87c07d8854a4ac804
        zoom={14}
        center={this.state.center}
        >
        <Marker name="Current location" onClick={this.onMarkerClick} position={this.state.center} />

        { //mark vehicles on map
          this.state.vehicles.map(v =>
            <Marker position={{lat: v.lat, lng: v.lng}} />)
        }

        {
          this.state.showingStops && this.state.stops.map(v =>
            <Marker position={{lat: v.lat, lng: v.lng}} />)
        }

        <Polyline path={this.state.bounds} strokeColor="#008000"/>
        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
apiKey: ("AIzaSyBhLvg_Vwoau_QHkCZVz8XtVvzMW8NX86w")
})(MapElement)
