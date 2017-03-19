import React, { Component } from 'react';
import loadJS from 'loadjs';

export default class TripDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAYVAslO99OwvCeZmCZG37ZOaUZ0p9DIUg&libraries=places', {
      success: () => {
        this.map = new window.google.maps.Map(document.getElementById('map'), {
          center: { lat: 37.769, lng: -122.446 },
          zoom: 12,
        });
        console.log(this.map)
        this.poly = new window.google.maps.Polyline({
          strokeColor: '#000000',
          icons: [{
            icon: { path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW },
            offset: '100%'
          }],
          strokeOpacity: 1.0,
          strokeWeight: 3
        });
        this.poly.setMap(this.map);
      },
    });
  }



  render() {
    return (
      <div className="createMap">
      <div style={{ height: '600px', width: '600px' }} className="col-md-6" id="map" />
      <div> The rest goes here </div>
      </div>
      )

  }
}