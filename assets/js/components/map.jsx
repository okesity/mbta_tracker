import React, { Component } from 'react';
//import GoogleMapReact from 'google-map-react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


//const AnyReactComponent = ({ text }) => <div>{text}</div>;

export class MapContainer extends Component {
  state = {
    showInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    currentLocation: {},
    // initialCenter: {
    //   lat: position.coords.latitude,
    //   lng: position.coords.longitude,
    // },
  };

  loadMap() {
    if(this.props && this.props.google) {
      const {lag, lng} = this.state.currentLocation;
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if(Prevprops.google != this.props.google) {
  //     this.loadMap();
  //   }
  //
  //   if(prevSate.currentLocation != this.state.currentLocation) {
  //     this.loadMap();
  //   }
  // }

  componentDidMount() {
    if(this.props.centerAroundCurrentLocation) {
      if(navigator.geolocation && navigator) {
        navigator.geolocation.getCurrentPosition(
          pos => {
            const coords = props.coords;
            this.setState({
                 lat: position.coords.latitude,
                 lng: position.coordes.longitude,
            });
          });
      }
    }
    this.loadMap();
  }

  // getGeoLocation = () => {
  //   if(navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       position => {
  //         console.log("position coords", position.coords);
  //         this.setState(
  //           selectedPlace = {
  //             lat: position.coords.latitude,
  //             lng: position.coordes.longitude,
  //           }
  //         )
  //       }
  //     )
  //   }
  //   this.loadMap();
  // }

  render() {
    return (
      <Map google={this.props.google} zoom={11} style={{width: '80%', height: '700px', marginLeft: '-170px'}}>

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
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
})(MapContainer)
