import React, { Component } from 'react';
//import GoogleMapReact from 'google-map-react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


//const AnyReactComponent = ({ text }) => <div>{text}</div>;

export class MapContainer extends Component {
  state = {
    showInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  render() {
    return (
      <Map google={this.props.google} zoom={11} style={{width: '80%', height: '700px;', marginLeft: '-170px'}}>

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
